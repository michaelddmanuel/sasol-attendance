import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Card,
  CardBody,
  Icon,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  Skeleton,
  useToast,
  Alert,
  AlertIcon,
  VStack,
  HStack
} from '@chakra-ui/react';
import { 
  FiDownload, 
  FiCalendar, 
  FiUsers, 
  FiCheckCircle,
  FiClock,
  FiBarChart,
  FiBarChart2,
  FiPieChart,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiActivity,
  FiFileText
} from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

import { DataCard, PrimaryButton, SecondaryButton, UntitledPageHeader, StatsCard } from '../../components/common';

const ReportsAnalyticsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [reportType, setReportType] = useState('attendance');
  const [dateRange, setDateRange] = useState('month');
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const toast = useToast();
  
  // Colors
  const cardBg = 'white';
  const borderColor = 'gray.200';
  
  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock dashboard data
          const mockData = {
            attendanceStats: {
              totalAttendance: 1248,
              lastMonthAttendance: 156,
              changePercent: 12.5,
              attendanceRate: 87.3,
              trainingHours: 4762,
              completionRate: 92.8,
            },
            complianceStats: {
              mandatoryCompletionRate: 94.6,
              overdueTrainings: 17,
              upcomingMandatory: 43,
              complianceTrend: [86, 88, 90, 92, 93, 94.6]
            },
            departmentBreakdown: [
              { name: 'Operations', attendanceRate: 91.2, completionRate: 96.4 },
              { name: 'Maintenance', attendanceRate: 88.5, completionRate: 92.1 },
              { name: 'Safety', attendanceRate: 95.8, completionRate: 98.7 },
              { name: 'HR', attendanceRate: 89.3, completionRate: 91.8 },
              { name: 'Admin', attendanceRate: 82.6, completionRate: 89.5 },
            ],
            recentTrainings: [
              { id: 101, title: 'Safety Procedures', attendees: 28, date: '2025-02-22', completionRate: 96.4 },
              { id: 102, title: 'Emergency Response', attendees: 35, date: '2025-02-18', completionRate: 91.4 },
              { id: 103, title: 'Hazardous Materials', attendees: 19, date: '2025-02-15', completionRate: 94.7 },
              { id: 104, title: 'Environmental Compliance', attendees: 42, date: '2025-02-10', completionRate: 88.1 },
            ],
            upcomingTrainings: [
              { id: 201, title: 'Workplace Safety', date: '2025-03-05', status: 'scheduled' },
              { id: 202, title: 'Fire Safety', date: '2025-03-10', status: 'scheduled' },
              { id: 203, title: 'First Aid Training', date: '2025-03-15', status: 'scheduled' },
              { id: 204, title: 'Environmental Awareness', date: '2025-03-20', status: 'scheduled' },
            ],
            pendingDeclarations: [
              { id: 301, title: 'Safety Protocol Adherence', deadline: '2025-03-01', status: 'pending' },
              { id: 302, title: 'Compliance Statement', deadline: '2025-03-05', status: 'pending' },
              { id: 303, title: 'Quarterly Safety Review', deadline: '2025-03-10', status: 'pending' },
            ]
          };
          
          setDashboardData(mockData);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load analytics data. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Handle report download
  const handleDownloadReport = (reportType) => {
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      
      // Show success toast
      toast({
        title: 'Report Downloaded',
        description: `Your ${reportType} report has been downloaded successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }, 2000);
  };

  // Table columns for department breakdown
  const departmentColumns = [
    { key: 'name', header: 'Department' },
    { 
      key: 'attendanceRate', 
      header: 'Attendance Rate',
      render: (dept) => (
        <Badge 
          px={2} 
          py={1} 
          borderRadius="full" 
          bg={dept.attendanceRate > 90 ? "#DCFCE7" : dept.attendanceRate > 80 ? "#FEF9C3" : "#FEE2E2"}
          color={dept.attendanceRate > 90 ? "#166534" : dept.attendanceRate > 80 ? "#854D0E" : "#991B1B"}
          fontWeight="medium"
          fontSize="xs"
        >
          {dept.attendanceRate}%
        </Badge>
      ),
    },
    { 
      key: 'completionRate', 
      header: 'Completion Rate',
      render: (dept) => (
        <Badge 
          px={2} 
          py={1} 
          borderRadius="full" 
          bg={dept.completionRate > 95 ? "#DCFCE7" : dept.completionRate > 90 ? "#FEF9C3" : "#FEE2E2"}
          color={dept.completionRate > 95 ? "#166534" : dept.completionRate > 90 ? "#854D0E" : "#991B1B"}
          fontWeight="medium"
          fontSize="xs"
        >
          {dept.completionRate}%
        </Badge>
      ),
    },
  ];

  // Table columns for recent trainings
  const trainingColumns = [
    { key: 'title', header: 'Training Name' },
    { key: 'date', header: 'Date', type: 'date' },
    { key: 'attendees', header: 'Attendees' },
    { 
      key: 'completionRate', 
      header: 'Completion Rate',
      render: (training) => (
        <Badge 
          px={2} 
          py={1} 
          borderRadius="full" 
          bg={training.completionRate > 95 ? "#DCFCE7" : training.completionRate > 90 ? "#FEF9C3" : "#FEE2E2"}
          color={training.completionRate > 95 ? "#166534" : training.completionRate > 90 ? "#854D0E" : "#991B1B"}
          fontWeight="medium"
          fontSize="xs"
        >
          {training.completionRate}%
        </Badge>
      ),
    },
  ];

  // Table columns for upcoming trainings
  const upcomingColumns = [
    { key: 'title', header: 'Training Name' },
    { key: 'date', header: 'Date', type: 'date' },
    { key: 'status', header: 'Status', type: 'status' },
  ];

  // Table columns for pending declarations
  const declarationColumns = [
    { key: 'title', header: 'Declaration Name' },
    { key: 'deadline', header: 'Deadline', type: 'date' },
    { key: 'status', header: 'Status', type: 'status' },
  ];

  // Actions for upcoming trainings
  const trainingActions = [
    { label: 'View Details', action: 'view' },
    { label: 'Reschedule', action: 'reschedule' },
    { label: 'Cancel Training', action: 'cancel' },
  ];

  // Actions for pending declarations
  const declarationActions = [
    { label: 'Submit Declaration', action: 'submit' },
    { label: 'Request Extension', action: 'extend' },
    { label: 'View Details', action: 'view' },
  ];

  // Handle row actions
  const handleRowAction = (action, item) => {
    toast({
      title: `Action: ${action}`,
      description: `Performed ${action} on "${item.title}"`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };
  
  return (
    <Box>
      <UntitledPageHeader
        title="Reports & Analytics"
        description="Track attendance metrics, compliance rates, and generate comprehensive reports"
        actions={[
          { 
            label: 'Export Reports', 
            icon: FiDownload, 
            onClick: () => handleDownloadReport('analytics-summary')
          }
        ]}
      />
      
      {error && (
        <Alert status="error" mb={6} borderRadius="md">
          <AlertIcon />
          <Text color="red.500">Error loading dashboard data: {error}</Text>
        </Alert>
      )}
      
      {/* Dashboard Overview Section */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        <StatsCard
          title="Total Attendance"
          value={isLoading ? "..." : dashboardData?.attendanceStats.totalAttendance}
          change={isLoading ? null : dashboardData?.attendanceStats.changePercent}
          icon={FiUsers}
          colorScheme="blue"
          helpText="Year to date"
        />
        
        <StatsCard
          title="Attendance Rate"
          value={isLoading ? "..." : `${dashboardData?.attendanceStats.attendanceRate}%`}
          icon={FiCheckCircle}
          colorScheme="green"
          helpText="Overall completion"
        />
        
        <StatsCard
          title="Mandatory Compliance"
          value={isLoading ? "..." : `${dashboardData?.complianceStats.mandatoryCompletionRate}%`}
          icon={FiActivity}
          colorScheme="purple"
          helpText="Required trainings"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={6}>
        {/* Department Breakdown Table */}
        <DataCard title="Department Breakdown">
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="#F7FAFC">
                <Tr>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Department</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Attendance Rate</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Completion Rate</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <Tr key={i}>
                      <Td><Skeleton height="20px" width="120px" /></Td>
                      <Td><Skeleton height="20px" width="80px" /></Td>
                      <Td><Skeleton height="20px" width="80px" /></Td>
                    </Tr>
                  ))
                ) : (
                  dashboardData?.departmentBreakdown.map((dept, index) => (
                    <Tr key={index} _hover={{ bg: "#F7FAFC" }}>
                      <Td>
                        <Text fontWeight="medium">{dept.name}</Text>
                      </Td>
                      <Td>
                        <Badge 
                          px={2} 
                          py={1} 
                          borderRadius="full" 
                          bg={dept.attendanceRate > 90 ? "#DCFCE7" : dept.attendanceRate > 80 ? "#FEF9C3" : "#FEE2E2"}
                          color={dept.attendanceRate > 90 ? "#166534" : dept.attendanceRate > 80 ? "#854D0E" : "#991B1B"}
                          fontWeight="medium"
                          fontSize="xs"
                        >
                          {dept.attendanceRate}%
                        </Badge>
                      </Td>
                      <Td>
                        <Badge 
                          px={2} 
                          py={1} 
                          borderRadius="full" 
                          bg={dept.completionRate > 95 ? "#DCFCE7" : dept.completionRate > 90 ? "#FEF9C3" : "#FEE2E2"}
                          color={dept.completionRate > 95 ? "#166534" : dept.completionRate > 90 ? "#854D0E" : "#991B1B"}
                          fontWeight="medium"
                          fontSize="xs"
                        >
                          {dept.completionRate}%
                        </Badge>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>
        </DataCard>

        {/* Recent Training Sessions */}
        <DataCard title="Recent Training Sessions">
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="#F7FAFC">
                <Tr>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Training Name</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Date</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Attendees</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Completion Rate</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <Tr key={i}>
                      <Td><Skeleton height="20px" width="150px" /></Td>
                      <Td><Skeleton height="20px" width="100px" /></Td>
                      <Td><Skeleton height="20px" width="70px" /></Td>
                      <Td><Skeleton height="20px" width="80px" /></Td>
                    </Tr>
                  ))
                ) : (
                  dashboardData?.recentTrainings.map((training, index) => (
                    <Tr key={index} _hover={{ bg: "#F7FAFC" }}>
                      <Td>
                        <Text fontWeight="medium">{training.title}</Text>
                      </Td>
                      <Td>{training.date}</Td>
                      <Td>{training.attendees}</Td>
                      <Td>
                        <Badge 
                          px={2} 
                          py={1} 
                          borderRadius="full" 
                          bg={training.completionRate > 95 ? "#DCFCE7" : training.completionRate > 90 ? "#FEF9C3" : "#FEE2E2"}
                          color={training.completionRate > 95 ? "#166534" : training.completionRate > 90 ? "#854D0E" : "#991B1B"}
                          fontWeight="medium"
                          fontSize="xs"
                        >
                          {training.completionRate}%
                        </Badge>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>
        </DataCard>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={6}>
        {/* Upcoming Trainings */}
        <DataCard title="Upcoming Trainings">
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="#F7FAFC">
                <Tr>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Training Name</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Date</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Status</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <Tr key={i}>
                      <Td><Skeleton height="20px" width="150px" /></Td>
                      <Td><Skeleton height="20px" width="100px" /></Td>
                      <Td><Skeleton height="20px" width="70px" /></Td>
                      <Td><Skeleton height="20px" width="80px" /></Td>
                    </Tr>
                  ))
                ) : (
                  dashboardData?.upcomingTrainings.map((training, index) => (
                    <Tr key={index} _hover={{ bg: "#F7FAFC" }}>
                      <Td>
                        <Text fontWeight="medium">{training.title}</Text>
                      </Td>
                      <Td>{training.date}</Td>
                      <Td>
                        <Badge 
                          px={2} 
                          py={1} 
                          borderRadius="full" 
                          bg={training.status === 'scheduled' ? "#DBEAFE" : "#FEE2E2"} 
                          color={training.status === 'scheduled' ? "#1E40AF" : "#991B1B"} 
                          fontWeight="medium"
                          fontSize="xs"
                        >
                          {training.status}
                        </Badge>
                      </Td>
                      <Td>
                        <PrimaryButton
                          onClick={() => handleRowAction('view', training, index)}
                          size="sm"
                        >
                          View Details
                        </PrimaryButton>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>
        </DataCard>

        {/* Pending Declarations */}
        <DataCard title="Pending Declarations">
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="#F7FAFC">
                <Tr>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Declaration Name</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Deadline</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Status</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <Tr key={i}>
                      <Td><Skeleton height="20px" width="150px" /></Td>
                      <Td><Skeleton height="20px" width="100px" /></Td>
                      <Td><Skeleton height="20px" width="70px" /></Td>
                      <Td><Skeleton height="20px" width="80px" /></Td>
                    </Tr>
                  ))
                ) : (
                  dashboardData?.pendingDeclarations.map((declaration, index) => (
                    <Tr key={index} _hover={{ bg: "#F7FAFC" }}>
                      <Td>
                        <Text fontWeight="medium">{declaration.title}</Text>
                      </Td>
                      <Td>{declaration.deadline}</Td>
                      <Td>
                        <Badge 
                          px={2} 
                          py={1} 
                          borderRadius="full" 
                          bg="#FEE2E2"
                          color="#991B1B"
                          fontWeight="medium"
                          fontSize="xs"
                        >
                          {declaration.status}
                        </Badge>
                      </Td>
                      <Td>
                        <PrimaryButton
                          onClick={() => handleRowAction('view', declaration, index)}
                          size="sm"
                        >
                          View Details
                        </PrimaryButton>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>
        </DataCard>
      </SimpleGrid>
      
      {/* Reports Section */}
      <DataCard 
        title="Generate Reports" 
        headerRight={
          <Text color="gray.500" fontSize="sm">
            Download comprehensive reports
          </Text>
        }
      >
        <VStack spacing={6} align="stretch">
          <Text color="gray.600">
            Download comprehensive reports to analyze training attendance, compliance, and certification status.
          </Text>
          
          <HStack spacing={4} wrap="wrap">
            <Select 
              value={reportType} 
              onChange={(e) => setReportType(e.target.value)}
              width={{ base: 'full', md: '200px' }}
              bg="white"
              borderRadius="md"
            >
              <option value="attendance">Attendance Report</option>
              <option value="compliance">Compliance Report</option>
              <option value="certification">Certification Status</option>
              <option value="department">Department Analysis</option>
            </Select>
            
            <Select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              width={{ base: 'full', md: '200px' }}
              bg="white"
              borderRadius="md"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </Select>
          </HStack>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Button 
              leftIcon={<FiFileText />} 
              variant="outline"
              colorScheme="brand"
              isLoading={isDownloading} 
              onClick={() => handleDownloadReport(`${reportType} (PDF)`)}
            >
              Download PDF
            </Button>
            <Button 
              leftIcon={<FiFileText />} 
              variant="outline"
              colorScheme="brand"
              isLoading={isDownloading}
              onClick={() => handleDownloadReport(`${reportType} (Excel)`)}
            >
              Download Excel
            </Button>
            <Button 
              leftIcon={<FiFileText />} 
              variant="outline"
              colorScheme="brand"
              isLoading={isDownloading}
              onClick={() => handleDownloadReport(`${reportType} (CSV)`)}
            >
              Download CSV
            </Button>
          </SimpleGrid>
        </VStack>
      </DataCard>
    </Box>
  );
};

export default ReportsAnalyticsPage;
