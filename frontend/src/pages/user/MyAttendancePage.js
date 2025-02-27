import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
  Stack,
  Alert,
  AlertIcon,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Skeleton,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spacer,
  SimpleGrid,
} from '@chakra-ui/react';
import { FiCalendar, FiCheckCircle, FiClock, FiSearch, FiFilter, FiMapPin, FiUser, FiChevronRight, FiInfo } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const MyAttendancePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [tabIndex, setTabIndex] = useState(0);
  const [error, setError] = useState('');
  
  const cardBg = 'white';
  const borderColor = 'gray.200';
  
  // Mock data for now - in a real app, this would come from API
  useEffect(() => {
    const fetchAttendanceData = async () => {
      // Simulate API request
      try {
        // In a real app, use this:
        // const response = await api.get('/attendance/my-records');
        // setAttendanceRecords(response.data);
        
        // For now, use mock data
        setTimeout(() => {
          const mockData = [
            {
              id: 1,
              trainingId: 101,
              trainingTitle: 'Safety Procedures Training',
              date: '2025-02-15',
              status: 'completed',
              duration: '4 hours',
              location: 'Training Center A',
              certified: true,
              score: 92,
              training: {
                category: 'Safety',
                title: 'Safety Procedures Training',
                location: 'Training Center A',
                instructor: 'John Doe',
                isRequired: true,
              },
            },
            {
              id: 2,
              trainingId: 102,
              trainingTitle: 'Hazardous Materials Handling',
              date: '2025-01-28',
              status: 'completed',
              duration: '6 hours',
              location: 'Lab 3',
              certified: true,
              score: 88,
              training: {
                category: 'Compliance',
                title: 'Hazardous Materials Handling',
                location: 'Lab 3',
                instructor: 'Jane Doe',
                isRequired: false,
              },
            },
            {
              id: 3,
              trainingId: 103,
              trainingTitle: 'Environmental Compliance',
              date: '2025-03-10',
              status: 'upcoming',
              duration: '2 hours',
              location: 'Conference Room B',
              certified: false,
              score: null,
              training: {
                category: 'Compliance',
                title: 'Environmental Compliance',
                location: 'Conference Room B',
                instructor: 'Bob Smith',
                isRequired: true,
              },
            },
            {
              id: 4,
              trainingId: 104,
              trainingTitle: 'First Aid and CPR',
              date: '2024-12-05',
              status: 'completed',
              duration: '8 hours',
              location: 'Medical Wing',
              certified: true,
              score: 95,
              training: {
                category: 'Safety',
                title: 'First Aid and CPR',
                location: 'Medical Wing',
                instructor: 'Alice Johnson',
                isRequired: true,
              },
            },
            {
              id: 5,
              trainingId: 105,
              trainingTitle: 'Fire Safety and Prevention',
              date: '2025-03-05',
              status: 'missed',
              duration: '3 hours',
              location: 'Training Center B',
              certified: false,
              score: null,
              training: {
                category: 'Safety',
                title: 'Fire Safety and Prevention',
                location: 'Training Center B',
                instructor: 'Mike Brown',
                isRequired: false,
              },
            },
          ];
          setAttendanceRecords(mockData);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load attendance records. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  // Filter and search records
  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.trainingTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || record.status === filterStatus;
    
    // For tabs: 0 = All, 1 = Completed, 2 = Upcoming, 3 = Missed
    if (tabIndex === 0) return matchesSearch && matchesFilter;
    if (tabIndex === 1) return matchesSearch && record.status === 'completed';
    if (tabIndex === 2) return matchesSearch && record.status === 'upcoming';
    if (tabIndex === 3) return matchesSearch && record.status === 'missed';
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <Badge colorScheme="green">Completed</Badge>;
      case 'upcoming':
        return <Badge colorScheme="blue">Upcoming</Badge>;
      case 'missed':
        return <Badge colorScheme="red">Missed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusVariant = (status) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return 'completed';
      case 'pending':
        return 'pending';
      case 'upcoming':
        return 'upcoming';
      case 'cancelled':
        return 'cancelled';
      case 'active':
        return 'active';
      case 'inactive':
        return 'inactive';
      case 'expired':
        return 'expired';
      default:
        return 'inactive';
    }
  };

  const handleViewDetails = (trainingId) => {
    navigate(`/attendance/${trainingId}`);
  };

  return (
    <Box>
      <Heading size="lg" mb={4} color="gray.800">My Attendance Records</Heading>
      <Text mb={6} color="gray.600">
        View your past and upcoming training attendance records
      </Text>

      {error && (
        <Alert status="error" mb={6} borderRadius="md">
        <AlertIcon />
        <Text color="red.500">{error}</Text>
      </Alert>
      )}

      <Box mb={8}>
        <Heading size="md" mb={4} color="gray.800">Training Summary</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Card bg={cardBg} boxShadow="sm" borderWidth="1px" borderColor={borderColor} shadow="sm">
            <CardHeader pb={3}>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size="md" fontWeight="semibold" color="gray.800">
                  Completed Trainings
                </Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex align="center">
                <Icon as={FiCheckCircle} color="green.500" boxSize={8} mr={3} />
                <Box>
                  <Text fontSize="2xl" fontWeight="bold">
                    {attendanceRecords.filter(rec => rec.status === 'completed').length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">Trainings successfully completed</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} boxShadow="sm" borderWidth="1px" borderColor={borderColor} shadow="sm">
            <CardHeader pb={3}>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size="md" fontWeight="semibold" color="gray.800">
                  Upcoming Trainings
                </Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex align="center">
                <Icon as={FiCalendar} color="blue.500" boxSize={8} mr={3} />
                <Box>
                  <Text fontSize="2xl" fontWeight="bold">
                    {attendanceRecords.filter(rec => rec.status === 'upcoming').length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">Trainings scheduled</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} boxShadow="sm" borderWidth="1px" borderColor={borderColor} shadow="sm">
            <CardHeader pb={3}>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size="md" fontWeight="semibold" color="gray.800">
                  Average Score
                </Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex align="center">
                <Icon as={FiCheckCircle} color="purple.500" boxSize={8} mr={3} />
                <Box>
                  <Text fontSize="2xl" fontWeight="bold">
                    {Math.round(
                      attendanceRecords
                        .filter(rec => rec.score !== null)
                        .reduce((sum, rec) => sum + rec.score, 0) / 
                      (attendanceRecords.filter(rec => rec.score !== null).length || 1)
                    )}%
                  </Text>
                  <Text fontSize="sm" color="gray.600">Average training score</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Box>

      <Card bg={cardBg} boxShadow="sm" borderWidth="1px" borderColor={borderColor} shadow="sm" mb={6}>
        <CardBody>
          <Flex direction={{ base: 'column', md: 'row' }} mb={6} gap={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search by training title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                borderRadius="lg"
                borderColor="#E2E8F0"
                _hover={{ borderColor: '#CBD5E0' }}
                _focus={{ borderColor: '#0F3151', boxShadow: '0 0 0 1px #0F3151' }}
                color="gray.700"
                _placeholder={{ color: "gray.500" }}
              />
            </InputGroup>
            <Select
              placeholder="All Statuses"
              icon={<Icon as={FiFilter} />}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              borderRadius="lg"
              borderColor="#E2E8F0"
              _hover={{ borderColor: '#CBD5E0' }}
              _focus={{ borderColor: '#0F3151', boxShadow: '0 0 0 1px #0F3151' }}
              bg="white"
              color="gray.700"
              _placeholder={{ color: "gray.500" }}
              width={{ base: 'full', md: '200px' }}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
              <option value="missed">Missed</option>
            </Select>
          </Flex>

          <Tabs colorScheme="green" onChange={index => setTabIndex(index)}>
            <TabList>
              <Tab>All</Tab>
              <Tab>Completed</Tab>
              <Tab>Upcoming</Tab>
              <Tab>Missed</Tab>
            </TabList>

            <TabPanels>
              {[0, 1, 2, 3].map((index) => (
                <TabPanel key={index} p={0} pt={4}>
                  {isLoading ? (
                    <Stack spacing={4}>
                      {[1, 2, 3].map((idx) => (
                        <Skeleton key={idx} height="60px" />
                      ))}
                    </Stack>
                  ) : filteredRecords.length > 0 ? (
                    <Box mt={6}>
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        {filteredRecords.map((record) => (
                          <Card 
                            key={record.id} 
                            variant="elevated"
                            _hover={{ 
                              transform: 'translateY(-5px)', 
                              transition: '0.3s', 
                              boxShadow: 'lg' 
                            }}
                          >
                            <CardHeader pb="2">
                              <HStack justify="space-between" align="flex-start">
                                <Badge variant={record.training.category.toLowerCase()}>
                                  {record.training.category}
                                </Badge>
                                <Badge variant={getStatusVariant(record.status)}>
                                  {record.status}
                                </Badge>
                              </HStack>
                            </CardHeader>
                            
                            <CardBody pt="0">
                              <Heading size="md" mb="2" color="sasol.primary">
                                {record.trainingTitle}
                              </Heading>
                              
                              <Stack spacing="3" mb="4">
                                <HStack>
                                  <Icon as={FiCalendar} color="sasol.gray.500" />
                                  <Text fontSize="sm" color="sasol.gray.700">
                                    {new Date(record.date).toLocaleDateString()}
                                  </Text>
                                </HStack>
                                
                                <HStack>
                                  <Icon as={FiMapPin} color="sasol.gray.500" />
                                  <Text fontSize="sm" color="sasol.gray.700">
                                    {record.training.location || "Online"}
                                  </Text>
                                </HStack>
                                
                                <HStack>
                                  <Icon as={FiUser} color="sasol.gray.500" />
                                  <Text fontSize="sm" color="sasol.gray.700">
                                    {record.training.instructor}
                                  </Text>
                                </HStack>
                              </Stack>
                            </CardBody>
                            
                            <CardFooter 
                              borderTop="1px" 
                              borderColor="sasol.gray.200"
                              pt="3"
                            >
                              <HStack w="100%" justifyContent="space-between">
                                <Badge 
                                  variant={record.training.isRequired ? "required" : "optional"}
                                >
                                  {record.training.isRequired ? "Required" : "Optional"}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  rightIcon={<FiChevronRight />}
                                  onClick={() => handleViewDetails(record.trainingId)}
                                >
                                  View Details
                                </Button>
                              </HStack>
                            </CardFooter>
                          </Card>
                        ))}
                      </SimpleGrid>
                      
                      {filteredRecords.length === 0 && (
                        <Card variant="outline" p={6} textAlign="center">
                          <Icon as={FiInfo} fontSize="3xl" color="sasol.gray.400" mb={3} />
                          <Text color="sasol.gray.600">
                            No attendance records found with the current filters.
                          </Text>
                        </Card>
                      )}
                    </Box>
                  ) : (
                    <Box textAlign="center" py={10}>
                      <Text color="gray.500">No attendance records found</Text>
                    </Box>
                  )}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>

    </Box>
  );
};

export default MyAttendancePage;
