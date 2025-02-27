import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Badge,
  Flex,
  Icon,
  Divider,
  SimpleGrid,
  Card,
  CardBody,
  List,
  ListItem,
  ListIcon,
  Skeleton,
  HStack,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { 
  FiCalendar, 
  FiClock, 
  FiMapPin, 
  FiUsers, 
  FiCheckSquare, 
  FiBookOpen, 
  FiUser, 
  FiPhone, 
  FiCheckCircle, 
  FiInfo,
  FiChevronRight,
  FiAlertTriangle,
  FiVideo,
  FiLink,
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import useToast from '../../hooks/useToast';

const TrainingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [training, setTraining] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [isAttendeesLoading, setIsAttendeesLoading] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'esd_admin');
  const cardBg = 'white';
  const bgColor = 'gray.50';

  // Fetch training details
  useEffect(() => {
    const fetchTrainingDetails = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/api/training/${id}`);
        setTraining(response.data.data);
        
        // Check if user is registered for this training
        try {
          const attendanceResponse = await api.get('/api/attendance/user');
          const userAttendances = attendanceResponse.data.data;
          const trainingAttendance = userAttendances.find(
            attendance => attendance.TrainingId === id
          );
          
          if (trainingAttendance) {
            setAttendanceStatus(trainingAttendance.status);
          }
        } catch (attendanceError) {
          console.error('Error fetching attendance status:', attendanceError);
        }
        
      } catch (error) {
        console.error('Error fetching training details:', error);
        setError('Failed to load training details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainingDetails();
  }, [id]);

  // Fetch attendees list (admin only)
  const fetchAttendees = async () => {
    if (!isAdmin) return;
    
    setIsAttendeesLoading(true);
    try {
      const response = await api.get(`/api/attendance/training/${id}`);
      setAttendees(response.data.data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
      toast.error(
        'Error',
        'Failed to load attendees list.'
      );
    } finally {
      setIsAttendeesLoading(false);
    }
  };

  // Register for training
  const handleRegister = async () => {
    try {
      await api.post('/api/attendance/register', { trainingId: id });
      setAttendanceStatus('registered');
      toast.success(
        'Registration Successful',
        'You have been registered for this training session.'
      );
    } catch (error) {
      console.error('Error registering for training:', error);
      toast.error(
        'Registration Failed',
        error.response?.data?.message || 'Failed to register for training session.'
      );
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time for display
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Calculate duration in hours
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationMs = end - start;
    const durationHours = durationMs / (1000 * 60 * 60);
    return durationHours.toFixed(1);
  };

  // Check if training is in the past
  const isPastTraining = () => {
    if (!training) return false;
    return new Date(training.endDate) < new Date();
  };

  return (
    <Box>
      {isLoading ? (
        <Stack spacing={6}>
          <Skeleton height="60px" width="70%" />
          <Skeleton height="30px" width="40%" />
          <Skeleton height="200px" />
          <Skeleton height="200px" />
        </Stack>
      ) : error ? (
        <Alert status="error" mb={6}>
          <AlertIcon />
          {error}
        </Alert>
      ) : training ? (
        <>
          <Stack spacing={6}>
            {/* Header with title and status */}
            <Box>
              <Flex justify="space-between" align="start" wrap="wrap" gap={4}>
                <Box>
                  <Heading as="h1" size="xl" color="sasol.navy">
                    {training.title}
                  </Heading>
                  <HStack mt={2} spacing={3}>
                    <Badge colorScheme={training.isMandatory ? "red" : "blue"}>
                      {training.isMandatory ? "Mandatory" : "Optional"}
                    </Badge>
                    <Badge colorScheme={
                      training.status === 'scheduled' ? 'blue' :
                      training.status === 'in-progress' ? 'green' :
                      training.status === 'completed' ? 'gray' : 'red'
                    }>
                      {training.status}
                    </Badge>
                    {training.isVirtual && (
                      <Badge colorScheme="purple">Virtual</Badge>
                    )}
                  </HStack>
                </Box>
                
                <Box>
                  {/* Registration status or actions */}
                  {attendanceStatus ? (
                    <Alert status={
                      attendanceStatus === 'registered' ? 'info' :
                      attendanceStatus === 'attended' ? 'success' : 'warning'
                    } variant="solid" borderRadius="md">
                      <AlertIcon />
                      {attendanceStatus === 'registered' && 'You are registered for this training'}
                      {attendanceStatus === 'attended' && 'You have attended this training'}
                      {attendanceStatus === 'missed' && 'You missed this training'}
                    </Alert>
                  ) : !isPastTraining() ? (
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={handleRegister}
                      isDisabled={training.status !== 'scheduled'}
                    >
                      Register Now
                    </Button>
                  ) : null}
                </Box>
              </Flex>
            </Box>
            
            {/* Main content area */}
            <Tabs colorScheme="blue" bg={cardBg} borderRadius="md" boxShadow="sm">
              <TabList px={4} pt={4}>
                <Tab>Details</Tab>
                {isAdmin && <Tab>Attendees</Tab>}
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {/* Training Info Card */}
                    <Card variant="outline">
                      <CardBody>
                        <Stack spacing={4}>
                          <Heading size="md" mb={2} color="sasol.blue">
                            Training Information
                          </Heading>
                          
                          <List spacing={3}>
                            <ListItem>
                              <Flex>
                                <ListIcon as={FiCalendar} color="sasol.blue" mt={1} />
                                <Box>
                                  <Text fontWeight="bold">Date</Text>
                                  <Text>{formatDate(training.startDate)}</Text>
                                </Box>
                              </Flex>
                            </ListItem>
                            
                            <ListItem>
                              <Flex>
                                <ListIcon as={FiClock} color="sasol.blue" mt={1} />
                                <Box>
                                  <Text fontWeight="bold">Time</Text>
                                  <Text>{formatTime(training.startDate)} - {formatTime(training.endDate)}</Text>
                                  <Text fontSize="sm" color="gray.500">
                                    Duration: {calculateDuration(training.startDate, training.endDate)} hours
                                  </Text>
                                </Box>
                              </Flex>
                            </ListItem>
                            
                            <ListItem>
                              <Flex>
                                <ListIcon as={training.isVirtual ? FiVideo : FiMapPin} color="sasol.blue" mt={1} />
                                <Box>
                                  <Text fontWeight="bold">Location</Text>
                                  <Text>{training.isVirtual ? 'Virtual (Online)' : training.location}</Text>
                                  {training.isVirtual && training.meetingLink && (
                                    <Button 
                                      leftIcon={<FiLink />} 
                                      size="sm" 
                                      variant="outline" 
                                      mt={2}
                                      as="a" 
                                      href={training.meetingLink} 
                                      target="_blank"
                                    >
                                      Join Meeting
                                    </Button>
                                  )}
                                </Box>
                              </Flex>
                            </ListItem>
                            
                            {(training.facilitatorName || training.facilitatorContact) && (
                              <ListItem>
                                <Flex>
                                  <ListIcon as={FiUser} color="sasol.blue" mt={1} />
                                  <Box>
                                    <Text fontWeight="bold">Facilitator</Text>
                                    {training.facilitatorName && <Text>{training.facilitatorName}</Text>}
                                    {training.facilitatorContact && (
                                      <Flex align="center" mt={1}>
                                        <Icon as={FiPhone} mr={1} color="gray.500" />
                                        <Text fontSize="sm">{training.facilitatorContact}</Text>
                                      </Flex>
                                    )}
                                  </Box>
                                </Flex>
                              </ListItem>
                            )}
                            
                            {training.capacity && (
                              <ListItem>
                                <Flex>
                                  <ListIcon as={FiUsers} color="sasol.blue" mt={1} />
                                  <Box>
                                    <Text fontWeight="bold">Capacity</Text>
                                    <Text>{training.capacity} participants</Text>
                                  </Box>
                                </Flex>
                              </ListItem>
                            )}
                          </List>
                        </Stack>
                      </CardBody>
                    </Card>
                    
                    {/* Description & Prerequisites Card */}
                    <Card variant="outline">
                      <CardBody>
                        <Stack spacing={5}>
                          <Box>
                            <Heading size="md" mb={3} color="sasol.blue">
                              Description
                            </Heading>
                            <Text>{training.description || 'No description available.'}</Text>
                          </Box>
                          
                          {training.prerequisite && (
                            <Box>
                              <Heading size="md" mb={3} color="sasol.blue">
                                Prerequisites
                              </Heading>
                              <Text>{training.prerequisite}</Text>
                            </Box>
                          )}
                          
                          {/* Attendance button for registered users */}
                          {attendanceStatus === 'registered' && !isPastTraining() && (
                            <Box mt={4}>
                              <Divider mb={4} />
                              <Button 
                                colorScheme="green" 
                                leftIcon={<FiCheckCircle />}
                                size="lg"
                                width="full"
                                onClick={onOpen}
                              >
                                Mark Attendance & Complete Declaration
                              </Button>
                            </Box>
                          )}
                        </Stack>
                      </CardBody>
                    </Card>
                  </SimpleGrid>
                </TabPanel>
                
                {/* Attendees Tab (admin only) */}
                <TabPanel>
                  {isAdmin && (
                    <Box>
                      <Flex justify="space-between" align="center" mb={4}>
                        <Heading size="md" color="sasol.blue">
                          Attendees List
                        </Heading>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={fetchAttendees}
                          isLoading={isAttendeesLoading}
                        >
                          Refresh List
                        </Button>
                      </Flex>
                      
                      {isAttendeesLoading ? (
                        <Stack spacing={3}>
                          {Array(5).fill(0).map((_, i) => (
                            <Skeleton key={i} height="50px" />
                          ))}
                        </Stack>
                      ) : attendees.length > 0 ? (
                        <Stack spacing={2}>
                          {attendees.map(attendee => (
                            <Card key={attendee.id} size="sm" variant="outline">
                              <CardBody>
                                <Flex justify="space-between" align="center">
                                  <Box>
                                    <Text fontWeight="bold">
                                      {attendee.User.firstName} {attendee.User.lastName}
                                    </Text>
                                    <Text fontSize="sm">{attendee.User.email}</Text>
                                    {attendee.User.companyName && (
                                      <Text fontSize="sm" color="gray.500">
                                        {attendee.User.companyName}
                                      </Text>
                                    )}
                                  </Box>
                                  <HStack>
                                    <Badge colorScheme={
                                      attendee.status === 'registered' ? 'blue' :
                                      attendee.status === 'attended' ? 'green' :
                                      attendee.status === 'missed' ? 'red' : 'gray'
                                    }>
                                      {attendee.status}
                                    </Badge>
                                    {attendee.Declaration && (
                                      <Badge colorScheme="green">Declaration Submitted</Badge>
                                    )}
                                  </HStack>
                                </Flex>
                              </CardBody>
                            </Card>
                          ))}
                        </Stack>
                      ) : (
                        <Box textAlign="center" py={10}>
                          <Text>No attendees for this training session yet.</Text>
                          <Button 
                            mt={4} 
                            variant="outline" 
                            onClick={fetchAttendees}
                          >
                            Refresh List
                          </Button>
                        </Box>
                      )}
                    </Box>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
            
            {/* Admin Actions */}
            {isAdmin && (
              <Card variant="outline">
                <CardBody>
                  <Heading size="md" mb={4} color="sasol.blue">
                    Admin Actions
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                    <Button leftIcon={<FiUsers />}>
                      Manage Attendees
                    </Button>
                    <Button leftIcon={<FiInfo />}>
                      Edit Training
                    </Button>
                    <Button colorScheme="red" variant="outline">
                      Cancel Training
                    </Button>
                  </SimpleGrid>
                </CardBody>
              </Card>
            )}
          </Stack>
          
          {/* Attendance & Declaration Modal */}
          <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Attendance & Declaration Form</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text mb={4}>
                  Attendance registration and declaration form would be implemented here.
                </Text>
                <Alert status="info">
                  <AlertIcon />
                  This form would include confirmation of attendance and any required declarations.
                </Alert>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => navigate(`/attendance/${id}`)}
                >
                  Continue to Declaration Form
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <Box textAlign="center" py={10}>
          <Heading size="lg">Training Not Found</Heading>
          <Text mt={4}>The requested training session could not be found.</Text>
          <Button mt={6} onClick={() => navigate('/trainings')}>
            Back to Training List
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TrainingDetailPage;
