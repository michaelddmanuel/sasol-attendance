import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Heading,
  Flex,
  Text,
  SimpleGrid,
  Grid,
  GridItem,
  Button,
  Icon,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  HStack,
  Avatar,
  StackDivider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  CircularProgress,
  CircularProgressLabel,
  Spinner,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  List,
  ListItem,
  UnorderedList,
  Divider,
  Skeleton,
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiCheckSquare,
  FiAlertCircle,
  FiAward,
  FiTrendingUp,
  FiBarChart2,
  FiArrowRight,
  FiChevronRight,
  FiInfo,
  FiAlertTriangle,
  FiEdit,
  FiCheckCircle,
  FiX,
  FiMoreVertical,
} from 'react-icons/fi';

import { PrimaryButton, SecondaryButton } from '../../components/common/UntitledUI';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import useToast from '../../hooks/useToast';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [upcomingTrainings, setUpcomingTrainings] = useState([]);
  const [mandatoryTrainings, setMandatoryTrainings] = useState([]);
  const [stats, setStats] = useState({
    totalAttended: 0,
    pendingDeclarations: 0,
    upcomingMandatory: 0,
    completedTrainings: 0,
    upcomingTrainings: 0,
    pendingTrainings: 0,
    complianceScore: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTraining, setSelectedTraining] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleViewDetails = (training) => {
    setSelectedTraining(training);
    onOpen();
  };

  const handleRegister = (trainingId, trainingTitle) => {
    // In a real application, you would make an API call here to register for the training
    // For now, we'll just show a success toast
    toast.success(
      "Registration Successful", 
      `You have successfully registered for "${trainingTitle}"`,
      {
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      }
    );
    
    // Close the modal if it's open
    if (isOpen) {
      onClose();
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // In a real application, these would be actual API calls
        // const statsResponse = await api.get('/dashboard/stats');
        // const upcomingResponse = await api.get('/trainings/upcoming');
        // const mandatoryResponse = await api.get('/trainings/mandatory');
        
        // Simulate API delays
        setTimeout(() => {
          // Mock data
          const mockUpcomingTrainings = [
            {
              id: 101,
              title: 'Safety Procedures and Protocols',
              startDate: '2025-03-15T09:00:00',
              endDate: '2025-03-15T16:00:00',
              location: 'Training Center A',
              mandatory: true,
              registrationDeadline: '2025-03-10',
              availableSeats: 15,
              totalSeats: 30,
              category: 'Safety',
              level: 'Intermediate',
              isMandatory: true,
              isVirtual: false
            },
            {
              id: 102,
              title: 'Emergency Response Training',
              startDate: '2025-03-22T10:00:00',
              endDate: '2025-03-22T17:00:00',
              location: 'Conference Hall B',
              mandatory: false,
              registrationDeadline: '2025-03-18',
              availableSeats: 8,
              totalSeats: 25,
              category: 'Emergency',
              level: 'All Levels',
              isMandatory: false,
              isVirtual: false
            },
            {
              id: 103,
              title: 'Environmental Compliance',
              startDate: '2025-04-05T09:30:00',
              endDate: '2025-04-05T15:30:00',
              location: 'Meeting Room 103',
              mandatory: true,
              registrationDeadline: '2025-03-29',
              availableSeats: 20,
              totalSeats: 40,
              category: 'Compliance',
              level: 'Basic',
              isMandatory: true,
              isVirtual: false
            }
          ];
          
          const mockMandatoryTrainings = [
            {
              id: 201,
              title: 'Annual Safety Certification',
              dueDate: '2025-06-30',
              status: 'pending',
              completionRequired: true,
              category: 'Certification',
              priority: 'High'
            },
            {
              id: 202,
              title: 'Hazardous Materials Handling',
              dueDate: '2025-04-15',
              status: 'pending',
              completionRequired: true,
              category: 'Safety',
              priority: 'Critical'
            }
          ];
          
          const mockStats = {
            totalAttended: 14,
            pendingDeclarations: 2,
            upcomingMandatory: 3,
            completedTrainings: 10,
            upcomingTrainings: 5,
            pendingTrainings: 2,
            complianceScore: 92,
          };
          
          setUpcomingTrainings(mockUpcomingTrainings);
          setMandatoryTrainings(mockMandatoryTrainings);
          setStats(mockStats);
          setIsLoading(false);
        }, 1000);
        
      } catch (err) {
        setError('Failed to load dashboard data');
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

  return (
    <Box>
      {/* Welcome Section */}
      <Box mb={8}>
        <Heading as="h1" size="xl" mb={2} color="#0F3151">
          Welcome back, {currentUser?.firstName || 'User'}
        </Heading>
        <Text color="gray.600">
          View your upcoming trainings and manage your compliance requirements
        </Text>
      </Box>

      {/* Statistics */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6} mb={10}>
        <Card
          direction="row"
          alignItems="center"
          p={4}
          borderRadius="xl"
          boxShadow="sm"
          border="1px solid"
          borderColor="#EDF2F7"
          _hover={{ 
            boxShadow: 'md',
            transform: 'translateY(-2px)'
          }}
          transition="all 0.2s"
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            bg="#E1EBF0"
            p={3}
            mr={4}
          >
            <Icon as={FiCheckCircle} boxSize={5} color="#0F3151" />
          </Flex>
          <Stack spacing={0}>
            <Text fontSize="sm" color="gray.600">Completed Trainings</Text>
            <Text fontSize="2xl" fontWeight="bold" color="#0F3151">
              {stats.completedTrainings}
            </Text>
          </Stack>
        </Card>

        <Card
          direction="row"
          alignItems="center"
          p={4}
          borderRadius="xl"
          boxShadow="sm"
          border="1px solid"
          borderColor="#EDF2F7"
          _hover={{ 
            boxShadow: 'md',
            transform: 'translateY(-2px)'
          }}
          transition="all 0.2s"
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            bg="#E1EBF0"
            p={3}
            mr={4}
          >
            <Icon as={FiCalendar} boxSize={5} color="#0F3151" />
          </Flex>
          <Stack spacing={0}>
            <Text fontSize="sm" color="gray.600">Upcoming Trainings</Text>
            <Text fontSize="2xl" fontWeight="bold" color="#0F3151">
              {stats.upcomingTrainings}
            </Text>
          </Stack>
        </Card>

        <Card
          direction="row"
          alignItems="center"
          p={4}
          borderRadius="xl"
          boxShadow="sm"
          border="1px solid"
          borderColor="#EDF2F7"
          _hover={{ 
            boxShadow: 'md',
            transform: 'translateY(-2px)'
          }}
          transition="all 0.2s"
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            bg="#E1EBF0"
            p={3}
            mr={4}
          >
            <Icon as={FiAlertCircle} boxSize={5} color="#0F3151" />
          </Flex>
          <Stack spacing={0}>
            <Text fontSize="sm" color="gray.600">Pending Trainings</Text>
            <Text fontSize="2xl" fontWeight="bold" color="#0F3151">
              {stats.pendingTrainings}
            </Text>
          </Stack>
        </Card>

        <Card
          direction="row"
          alignItems="center"
          p={4}
          borderRadius="xl"
          boxShadow="sm"
          border="1px solid"
          borderColor="#EDF2F7"
          _hover={{ 
            boxShadow: 'md',
            transform: 'translateY(-2px)'
          }}
          transition="all 0.2s"
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            bg="#E1EBF0"
            p={3}
            mr={4}
          >
            <Icon as={FiAward} boxSize={5} color="#0F3151" />
          </Flex>
          <Stack spacing={0}>
            <Text fontSize="sm" color="gray.600">Compliance Score</Text>
            <Text fontSize="2xl" fontWeight="bold" color="#0F3151">
              {stats.complianceScore}%
            </Text>
          </Stack>
        </Card>
      </SimpleGrid>

      {/* Upcoming Trainings */}
      <Box mb={8}>
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading as="h2" size="lg" color="#0F3151">
            Upcoming Trainings
          </Heading>
          <SecondaryButton 
            as={RouterLink} 
            to="/trainings" 
            rightIcon={<Icon as={FiArrowRight} />}
            size="sm"
          >
            View All
          </SecondaryButton>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Box key={i} height="200px" />
            ))
          ) : upcomingTrainings.length > 0 ? (
            upcomingTrainings.map(training => (
              <Card 
                key={training.id} 
                overflow="hidden" 
                variant="outline" 
                borderRadius="xl" 
                boxShadow="sm" 
                border="1px solid" 
                borderColor="#EDF2F7"
                _hover={{ 
                  transform: 'translateY(-4px)', 
                  boxShadow: 'md',
                  borderColor: '#CBD5E0'
                }}
                transition="all 0.2s"
              >
                <CardHeader pb={0} pt={4}>
                  <Flex justifyContent="space-between" alignItems="flex-start">
                    <Heading size="md" fontWeight="medium" color="#0F3151">
                      {training.title}
                    </Heading>
                    <Badge 
                      px={2} 
                      py={1} 
                      borderRadius="full" 
                      bg={training.isMandatory ? "#FEE2E2" : "#E1EBF0"} 
                      color={training.isMandatory ? "#B91C1C" : "#0F3151"} 
                      fontWeight="medium"
                      fontSize="xs"
                    >
                      {training.isMandatory ? 'Mandatory' : 'Optional'}
                    </Badge>
                  </Flex>
                </CardHeader>
                <CardBody py={3}>
                  <Stack spacing={3}>
                    <Flex align="center">
                      <Icon as={FiCalendar} color="gray.500" mr={2} fontSize="14px" />
                      <Text fontSize="sm" color="gray.700">
                        {new Date(training.startDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </Text>
                    </Flex>
                    <Flex align="center">
                      <Icon as={FiClock} color="gray.500" mr={2} fontSize="14px" />
                      <Text fontSize="sm" color="gray.700">
                        {new Date(training.startDate).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit'
                        })} - {new Date(training.endDate).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Text>
                    </Flex>
                    <Flex align="center">
                      <Icon as={FiMapPin} color="gray.500" mr={2} fontSize="14px" />
                      <Text fontSize="sm" color="gray.700">
                        {training.isVirtual ? 'Virtual (Online)' : training.location}
                      </Text>
                    </Flex>
                  </Stack>
                </CardBody>
                <CardFooter pt={2}>
                  <PrimaryButton 
                    onClick={() => handleViewDetails(training)}
                    size="sm" 
                    width="full"
                  >
                    View Details
                  </PrimaryButton>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Box p={4} bg="gray.50" borderRadius="md" width="100%">
              <Text>No upcoming training sessions found.</Text>
            </Box>
          )}
        </SimpleGrid>
      </Box>

      {/* Available Trainings */}
      <Box mt={10}>
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading as="h2" size="lg" color="#0F3151">
            Available Trainings
          </Heading>
          <SecondaryButton
            as={RouterLink}
            to="/trainings"
            rightIcon={<Icon as={FiArrowRight} />}
            size="sm"
          >
            View All
          </SecondaryButton>
        </Flex>
        
        <Card borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="#EDF2F7">
          <Box overflowX="auto" p={0}>
            <Table variant="simple" width="100%" style={{ borderCollapse: 'separate', borderSpacing: '0' }}>
              <Thead bg="#F7FAFC">
                <Tr>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Training</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Date</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Time</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Location</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Capacity</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {upcomingTrainings.map(training => (
                  <Tr key={training.id} _hover={{ bg: "#F7FAFC" }}>
                    <Td>
                      <Box>
                        <HStack spacing={2} mb={1}>
                          <Text fontWeight="medium">{training.title}</Text>
                          {training.isMandatory && (
                            <Badge 
                              px={2} 
                              py={1} 
                              borderRadius="full" 
                              bg="#FEE2E2" 
                              color="#B91C1C" 
                              fontWeight="medium"
                              fontSize="xs"
                            >
                              Mandatory
                            </Badge>
                          )}
                        </HStack>
                        <HStack fontSize="xs" color="gray.500" mt={1}>
                          <Text>{training.category}</Text>
                          <Text>•</Text>
                          <Text>{training.level}</Text>
                        </HStack>
                      </Box>
                    </Td>
                    <Td>
                      {new Date(training.startDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Td>
                    <Td>
                      {new Date(training.startDate).toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Td>
                    <Td>
                      <Text noOfLines={1}>{training.location}</Text>
                    </Td>
                    <Td>
                      <HStack>
                        <Text>{training.availableSeats}/{training.totalSeats}</Text>
                        <Badge 
                          px={2} 
                          py={1} 
                          borderRadius="full" 
                          bg={training.availableSeats > 0 ? "#C6F6D5" : "#FEE2E2"} 
                          color={training.availableSeats > 0 ? "#287D3C" : "#B91C1C"} 
                          fontWeight="medium"
                          fontSize="xs"
                        >
                          {training.availableSeats > 0 ? "Available" : "Full"}
                        </Badge>
                      </HStack>
                    </Td>
                    <Td>
                      <PrimaryButton
                        onClick={() => handleRegister(training.id, training.title)}
                        size="sm"
                      >
                        Register
                      </PrimaryButton>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Card>
      </Box>

      {/* Mandatory Trainings */}
      <Box mt={10}>
        <Heading as="h2" size="lg" mb={6} color="#0F3151">
          Mandatory Requirements
        </Heading>
        
        {isLoading ? (
          <Box height="100px" />
        ) : mandatoryTrainings.length > 0 ? (
          <Card borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="#EDF2F7">
            <CardBody>
              <UnorderedList spacing={4} styleType="none" ml={0}>
                {mandatoryTrainings.map(training => (
                  <ListItem 
                    key={training.id} 
                    p={4} 
                    borderRadius="lg" 
                    bg="white" 
                    borderWidth="1px" 
                    borderColor="#EDF2F7"
                    _hover={{ bg: '#F7FAFC', borderColor: '#CBD5E0' }}
                    transition="all 0.2s"
                  >
                    <Flex justifyContent="space-between" alignItems="center">
                      <Box>
                        <HStack mb={1}>
                          <Text fontWeight="medium">{training.title}</Text>
                          <Badge 
                            px={2} 
                            py={1} 
                            borderRadius="full" 
                            bg="#FEE2E2" 
                            color="#B91C1C" 
                            fontWeight="medium"
                            fontSize="xs"
                          >
                            Required
                          </Badge>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          Due by: {new Date(training.dueDate).toLocaleDateString()}
                        </Text>
                      </Box>
                      <PrimaryButton 
                        as={RouterLink} 
                        to={`/trainings/${training.id}`}
                        size="sm" 
                      >
                        Start Now
                      </PrimaryButton>
                    </Flex>
                  </ListItem>
                ))}
              </UnorderedList>
            </CardBody>
          </Card>
        ) : (
          <Card borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="#EDF2F7">
            <CardBody textAlign="center" py={8}>
              <Icon as={FiCheckCircle} boxSize="12" color="#0F3151" mb={4} />
              <Heading as="h3" size="md" mb={2} color="#0F3151">
                All caught up!
              </Heading>
              <Text color="gray.600">
                You have no pending mandatory trainings at this time.
              </Text>
            </CardBody>
          </Card>
        )}
      </Box>
      
      {/* View Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <ModalHeader
            bg="#0F3151"
            color="white"
            borderTopRadius="xl"
            py={4}
            px={6}
          >
            {selectedTraining?.title}
            {selectedTraining?.isMandatory && (
              <Badge
                ml={2}
                px={2}
                py={1}
                borderRadius="full"
                bg="#FEE2E2"
                color="#B91C1C"
                fontWeight="medium"
                fontSize="xs"
              >
                Mandatory
              </Badge>
            )}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={6}>
            {selectedTraining && (
              <Stack spacing={4}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <Text fontWeight="bold" mb={1}>Date</Text>
                    <Flex align="center">
                      <Icon as={FiCalendar} color="gray.500" mr={2} />
                      <Text>
                        {new Date(selectedTraining.startDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Text>
                    </Flex>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" mb={1}>Time</Text>
                    <Flex align="center">
                      <Icon as={FiClock} color="gray.500" mr={2} />
                      <Text>
                        {new Date(selectedTraining.startDate).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit'
                        })} - {new Date(selectedTraining.endDate).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Text>
                    </Flex>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" mb={1}>Location</Text>
                    <Flex align="center">
                      <Icon as={FiMapPin} color="gray.500" mr={2} />
                      <Text>
                        {selectedTraining.isVirtual ? 'Virtual (Online)' : selectedTraining.location}
                      </Text>
                    </Flex>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" mb={1}>Availability</Text>
                    <Flex align="center">
                      <Icon as={FiUsers} color="gray.500" mr={2} />
                      <Text>{selectedTraining.availableSeats}/{selectedTraining.totalSeats} seats available</Text>
                    </Flex>
                  </Box>
                </SimpleGrid>
                
                <Divider my={2} />
                
                <Box>
                  <Text fontWeight="bold" mb={2}>Category</Text>
                  <Badge px={2} py={1} borderRadius="full" colorScheme="blue">{selectedTraining.category}</Badge>
                  <Badge px={2} py={1} borderRadius="full" colorScheme="purple" ml={2}>{selectedTraining.level}</Badge>
                </Box>
                
                <Divider my={2} />
                
                <Box>
                  <Text fontWeight="bold" mb={2}>Registration Deadline</Text>
                  <Text>
                    {new Date(selectedTraining.registrationDeadline).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </Box>
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            <SecondaryButton mr={3} onClick={onClose}>
              Cancel
            </SecondaryButton>
            <PrimaryButton 
              onClick={() => handleRegister(selectedTraining.id, selectedTraining.title)}
            >
              Register
            </PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DashboardPage;
