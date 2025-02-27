import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Grid,
  SimpleGrid,
  Heading,
  Text,
  Icon,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useDisclosure,
  Skeleton,
  Button,
  Link,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  List,
  ListItem,
  HStack,
  Progress,
} from '@chakra-ui/react';
import {
  FiUsers,
  FiCalendar,
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiBarChart2,
  FiArrowRight,
  FiExternalLink,
} from 'react-icons/fi';
import api from '../../services/api';
import { PrimaryButton } from '../../components/common';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalTrainings: 0,
    upcomingTrainings: 0,
    activeUsers: 0,
    complianceRate: 0,
  });
  const [recentTrainings, setRecentTrainings] = useState([]);
  const [pendingDeclarations, setPendingDeclarations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, these would be separate API endpoints
        // For now, we'll mock the data
        
        // Fetch dashboard stats
        const statsData = {
          totalTrainings: 48,
          upcomingTrainings: 12,
          activeUsers: 156,
          complianceRate: 87.5,
        };
        setStats(statsData);
        
        // Fetch recent trainings
        const recentTrainingsData = [
          {
            id: 1,
            title: 'ESD Compliance Workshop',
            date: '2025-03-02T09:00:00',
            status: 'scheduled',
            attendees: 24,
            capacity: 30,
          },
          {
            id: 2,
            title: 'Safety Protocols Training',
            date: '2025-03-05T10:00:00',
            status: 'scheduled',
            attendees: 18,
            capacity: 25,
          },
          {
            id: 3,
            title: 'Vendor Onboarding Session',
            date: '2025-03-10T14:00:00',
            status: 'scheduled',
            attendees: 12,
            capacity: 20,
          },
        ];
        setRecentTrainings(recentTrainingsData);
        
        // Fetch pending declarations
        const pendingDeclarationsData = [
          {
            id: 1,
            trainingTitle: 'ESD Compliance Workshop',
            count: 10,
            lastUpdated: '2025-02-25T15:30:00',
          },
          {
            id: 2,
            trainingTitle: 'Safety Protocols Training',
            count: 5,
            lastUpdated: '2025-02-26T12:45:00',
          },
        ];
        setPendingDeclarations(pendingDeclarationsData);
        
      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time for display
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Format date and time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6} color="#0F3151">
        Admin Dashboard
      </Heading>
      
      {error && (
        <Box mb={6} p={4} bg="red.50" color="red.500" borderRadius="md">
          {error}
        </Box>
      )}

      {/* Stats Overview */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Skeleton isLoaded={!isLoading}>
          <Card>
            <CardBody>
              <Flex direction="column">
                <Flex align="center" mb={2}>
                  <Icon as={FiCalendar} mr={2} color="blue.500" fontSize="xl" />
                  <Text fontWeight="medium">Total Trainings</Text>
                </Flex>
                <Stat>
                  <StatNumber fontSize="3xl" fontWeight="bold" color="#0F3151">
                    {stats.totalTrainings}
                  </StatNumber>
                  <StatHelpText>
                    {stats.upcomingTrainings} upcoming
                  </StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          <Card>
            <CardBody>
              <Flex direction="column">
                <Flex align="center" mb={2}>
                  <Icon as={FiUsers} mr={2} color="green.500" fontSize="xl" />
                  <Text fontWeight="medium">Active Users</Text>
                </Flex>
                <Stat>
                  <StatNumber fontSize="3xl" fontWeight="bold" color="#0F3151">
                    {stats.activeUsers}
                  </StatNumber>
                  <StatHelpText>
                    Across all roles
                  </StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          <Card>
            <CardBody>
              <Flex direction="column">
                <Flex align="center" mb={2}>
                  <Icon as={FiCheckCircle} mr={2} color="teal.500" fontSize="xl" />
                  <Text fontWeight="medium">Compliance Rate</Text>
                </Flex>
                <Stat>
                  <StatNumber fontSize="3xl" fontWeight="bold" color="#0F3151">
                    {stats.complianceRate}%
                  </StatNumber>
                  <Box mt={2}>
                    <Progress
                      value={stats.complianceRate}
                      size="sm"
                      colorScheme={
                        stats.complianceRate >= 90 ? "green" :
                        stats.complianceRate >= 75 ? "blue" :
                        stats.complianceRate >= 60 ? "yellow" : "red"
                      }
                      borderRadius="full"
                    />
                  </Box>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          <Card>
            <CardBody>
              <Flex direction="column">
                <Flex align="center" mb={2}>
                  <Icon as={FiAlertTriangle} mr={2} color="orange.500" fontSize="xl" />
                  <Text fontWeight="medium">Pending Declarations</Text>
                </Flex>
                <Stat>
                  <StatNumber fontSize="3xl" fontWeight="bold" color="#0F3151">
                    {pendingDeclarations.reduce((sum, item) => sum + item.count, 0)}
                  </StatNumber>
                  <StatHelpText>
                    Requires follow-up
                  </StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        </Skeleton>
      </SimpleGrid>

      {/* Upcoming Trainings */}
      <Box mb={8}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h2" size="lg" color="#0F3151">
            Upcoming Trainings
          </Heading>
          <Button 
            as={RouterLink}
            to="/admin/trainings"
            size="sm"
            rightIcon={<Icon as={FiArrowRight} />}
            variant="outline"
            color="#0F3151"
            borderColor="#0F3151"
            _hover={{
              bg: "#E1EBF0",
            }}
            borderRadius="lg"
          >
            Manage Trainings
          </Button>
        </Flex>
        
        <Card borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="#EDF2F7">
          <CardBody p={0}>
            <Table variant="simple">
              <Thead bg="#F7FAFC">
                <Tr>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Training</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Date & Time</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Status</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Attendance</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <Tr key={i}>
                      <Td><Skeleton height="20px" width="150px" /></Td>
                      <Td><Skeleton height="20px" width="120px" /></Td>
                      <Td><Skeleton height="20px" width="80px" /></Td>
                      <Td><Skeleton height="20px" width="100px" /></Td>
                      <Td><Skeleton height="20px" width="80px" /></Td>
                    </Tr>
                  ))
                ) : recentTrainings.length > 0 ? (
                  recentTrainings.map(training => (
                    <Tr key={training.id} _hover={{ bg: "#F7FAFC" }}>
                      <Td>
                        <Box>
                          <Text fontWeight="medium">{training.title}</Text>
                          <Text fontSize="xs" color="gray.500" mt={1}>
                            {training.type || 'Regular Training'}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        {formatDate(training.date)}<br />
                        <Text fontSize="sm" color="gray.500">
                          {formatTime(training.date)}
                        </Text>
                      </Td>
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
                        <HStack spacing={2}>
                          <Text>{training.attendees}/{training.capacity}</Text>
                          <Progress 
                            value={(training.attendees / training.capacity) * 100} 
                            size="xs" 
                            width="60px" 
                            colorScheme="blue" 
                            borderRadius="full"
                          />
                        </HStack>
                      </Td>
                      <Td>
                        <PrimaryButton 
                          as={RouterLink}
                          to={`/admin/trainings/${training.id}`}
                          size="sm"
                        >
                          View
                        </PrimaryButton>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={5} textAlign="center" py={4}>
                      No upcoming training sessions found.
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Box>

      {/* Pending Declarations */}
      <Box mb={8}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h2" size="lg" color="#0F3151">
            Pending Declarations
          </Heading>
          <Button 
            as={RouterLink}
            to="/admin/declarations"
            size="sm"
            rightIcon={<Icon as={FiArrowRight} />}
            variant="outline"
            color="#0F3151"
            borderColor="#0F3151"
            _hover={{
              bg: "#E1EBF0",
            }}
            borderRadius="lg"
          >
            View All
          </Button>
        </Flex>
        
        <Card borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="#EDF2F7">
          <CardBody p={0}>
            <Table variant="simple">
              <Thead bg="#F7FAFC">
                <Tr>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Training</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Pending Count</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Last Updated</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  Array(2).fill(0).map((_, i) => (
                    <Tr key={i}>
                      <Td><Skeleton height="20px" width="150px" /></Td>
                      <Td><Skeleton height="20px" width="80px" /></Td>
                      <Td><Skeleton height="20px" width="120px" /></Td>
                      <Td><Skeleton height="20px" width="80px" /></Td>
                    </Tr>
                  ))
                ) : pendingDeclarations.length > 0 ? (
                  pendingDeclarations.map(item => (
                    <Tr key={item.id} _hover={{ bg: "#F7FAFC" }}>
                      <Td>
                        <Box>
                          <Text fontWeight="medium">{item.trainingTitle}</Text>
                          <Text fontSize="xs" color="gray.500" mt={1}>
                            {item.category || 'Standard Declaration'}
                          </Text>
                        </Box>
                      </Td>
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
                          {item.count} pending
                        </Badge>
                      </Td>
                      <Td>
                        {formatTimeAgo(item.lastUpdated)}
                      </Td>
                      <Td>
                        <PrimaryButton 
                          as={RouterLink}
                          to={`/admin/declarations/${item.id}`}
                          size="sm"
                        >
                          Review
                        </PrimaryButton>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={4} textAlign="center" py={4}>
                      No pending declarations found.
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Box>

      {/* Quick Links */}
      <Box>
        <Heading as="h2" size="md" mb={6} color="#0F3151">
          Quick Actions
        </Heading>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Button 
            as={RouterLink} 
            to="/admin/trainings/new" 
            leftIcon={<Icon as={FiCalendar} boxSize={5} />} 
            variant="solid" 
            bg="#0F3151"
            color="white"
            _hover={{ bg: '#1A4B76', transform: 'translateY(-2px)', color: "white" }}
            _active={{ bg: '#0A2A40', color: "white" }}
            size="lg" 
            height="auto" 
            py={6}
            px={5}
            borderRadius="xl"
            boxShadow="md"
            transition="all 0.2s"
          >
            <Flex direction="column" align="start">
              <Text fontWeight="bold" fontSize="lg" color="white">Create Training</Text>
              <Text fontSize="sm" fontWeight="normal" opacity={0.9} mt={1} color="white">
                Schedule a new training session
              </Text>
            </Flex>
          </Button>
          
          <Button 
            as={RouterLink} 
            to="/admin/users" 
            leftIcon={<Icon as={FiUsers} boxSize={5} />} 
            variant="solid" 
            bg="#0F3151"
            color="white"
            _hover={{ bg: '#1A4B76', transform: 'translateY(-2px)', color: "white" }}
            _active={{ bg: '#0A2A40', color: "white" }}
            size="lg" 
            height="auto" 
            py={6}
            px={5}
            borderRadius="xl"
            boxShadow="md"
            transition="all 0.2s"
          >
            <Flex direction="column" align="start">
              <Text fontWeight="bold" fontSize="lg" color="white">Manage Users</Text>
              <Text fontSize="sm" fontWeight="normal" opacity={0.9} mt={1} color="white">
                View and edit user accounts
              </Text>
            </Flex>
          </Button>
          
          <Button 
            as={RouterLink} 
            to="/admin/reports" 
            leftIcon={<Icon as={FiBarChart2} boxSize={5} />} 
            variant="solid" 
            bg="#0F3151"
            color="white"
            _hover={{ bg: '#1A4B76', transform: 'translateY(-2px)', color: "white" }}
            _active={{ bg: '#0A2A40', color: "white" }}
            size="lg" 
            height="auto" 
            py={6}
            px={5}
            borderRadius="xl"
            boxShadow="md"
            transition="all 0.2s"
          >
            <Flex direction="column" align="start">
              <Text fontWeight="bold" fontSize="lg" color="white">View Reports</Text>
              <Text fontSize="sm" fontWeight="normal" opacity={0.9} mt={1} color="white">
                Access compliance and attendance reports
              </Text>
            </Flex>
          </Button>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default AdminDashboardPage;
