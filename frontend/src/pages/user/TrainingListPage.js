import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Badge,
  Flex,
  Icon,
  Input,
  Select,
  HStack,
  Divider,
  Skeleton,
  InputGroup,
  InputLeftElement,
  Tag,
  useDisclosure,
  VStack,
  Progress,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiFilter,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiChevronRight,
  FiPlus,
  FiXCircle
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { AddTrainingModal } from '../../components/admin';
import { ViewTrainingModal } from '../../components/user';

const TrainingListPage = () => {
  const { currentUser } = useAuth();
  const [trainings, setTrainings] = useState([]);
  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    date: '',
  });
  const [selectedTraining, setSelectedTraining] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isViewOpen, 
    onOpen: onViewOpen, 
    onClose: onViewClose 
  } = useDisclosure();
  const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'esd_admin');

  const cardHeaderBgColor = 'gray.50';

  // Apply filters and search term to trainings
  const applyFilters = (trainings, searchTerm, filters) => {
    let filtered = [...trainings];
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(training => 
        training.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        training.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        training.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(training => training.status === filters.status);
    }
    
    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter(training => training.type === filters.type);
    }
    
    // Apply date filter (future implementation)
    // This would filter by date range once implemented
    
    return filtered;
  };

  // Fetch trainings on component mount
  useEffect(() => {
    const fetchTrainings = async () => {
      setIsLoading(true);
      try {
        // Check localStorage first
        const storedTrainings = localStorage.getItem('trainings');
        
        if (storedTrainings) {
          // Use stored trainings if available
          const parsedTrainings = JSON.parse(storedTrainings);
          setTrainings(parsedTrainings);
          setFilteredTrainings(parsedTrainings);
          setIsLoading(false);
        } else {
          // For demo purposes, we'll use mock data if nothing in localStorage
          setTimeout(() => {
            const mockTrainings = [
              {
                id: 101,
                title: 'Safety Procedures and Protocols',
                description: 'Comprehensive training on safety procedures and protocols in chemical plants, including emergency response, PPE usage, and hazard identification.',
                startDate: '2025-03-15T09:00:00',
                endDate: '2025-03-15T16:00:00',
                location: 'Training Center A',
                instructor: 'Dr. Sarah Johnson',
                category: 'Safety',
                type: 'In-Person',
                mandatory: true,
                availableSeats: 15,
                totalSeats: 30,
                status: 'upcoming',
                registrationDeadline: '2025-03-10',
                prerequisites: ['Basic Safety Orientation'],
                level: 'Intermediate',
                duration: '7 hours',
                imageUrl: 'https://images.unsplash.com/photo-1581093588401-cddd95e52abd?q=80&w=2940&auto=format&fit=crop'
              },
              {
                id: 102,
                title: 'Emergency Response Training',
                description: 'Learn to respond effectively to various emergency situations including fires, chemical spills, and medical emergencies.',
                startDate: '2025-03-22T10:00:00',
                endDate: '2025-03-22T17:00:00',
                location: 'Conference Hall B',
                instructor: 'Michael Kwan, Safety Director',
                category: 'Emergency',
                type: 'In-Person',
                mandatory: false,
                availableSeats: 8,
                totalSeats: 25,
                status: 'upcoming',
                registrationDeadline: '2025-03-18',
                prerequisites: [],
                level: 'All Levels',
                duration: '7 hours',
                imageUrl: 'https://images.unsplash.com/photo-1565335020653-6b4b98cb7c13?q=80&w=2787&auto=format&fit=crop'
              },
              {
                id: 103,
                title: 'Environmental Compliance',
                description: 'Overview of environmental regulations and compliance requirements for industrial operations.',
                startDate: '2025-04-05T09:30:00',
                endDate: '2025-04-05T15:30:00',
                location: 'Meeting Room 103',
                instructor: 'Elizabeth Chen, Environmental Specialist',
                category: 'Compliance',
                type: 'Hybrid',
                mandatory: true,
                availableSeats: 20,
                totalSeats: 40,
                status: 'upcoming',
                registrationDeadline: '2025-03-29',
                prerequisites: [],
                level: 'Basic',
                duration: '6 hours',
                imageUrl: 'https://images.unsplash.com/photo-1472148439583-1f4cf81b80e0?q=80&w=2862&auto=format&fit=crop'
              },
              {
                id: 104,
                title: 'Advanced Process Safety Management',
                description: 'Deep dive into process safety management principles and practices for senior technical staff.',
                startDate: '2025-04-12T08:00:00',
                endDate: '2025-04-13T17:00:00',
                location: 'Training Center A',
                instructor: 'Prof. Robert Williams',
                category: 'Safety',
                type: 'In-Person',
                mandatory: false,
                availableSeats: 5,
                totalSeats: 20,
                status: 'upcoming',
                registrationDeadline: '2025-04-01',
                prerequisites: ['Safety Procedures and Protocols', '2+ years in technical role'],
                level: 'Advanced',
                duration: '2 days',
                imageUrl: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?q=80&w=2940&auto=format&fit=crop'
              },
              {
                id: 105,
                title: 'Digital Tools for Productivity',
                description: 'Learn to use digital tools and software to enhance workplace productivity and collaboration.',
                startDate: '2025-03-28T13:00:00',
                endDate: '2025-03-28T16:00:00',
                location: 'Online - Microsoft Teams',
                instructor: 'Tanisha Patel, Digital Solutions Lead',
                category: 'Professional Development',
                type: 'Virtual',
                mandatory: false,
                availableSeats: 50,
                totalSeats: 100,
                status: 'upcoming',
                registrationDeadline: '2025-03-25',
                prerequisites: [],
                level: 'All Levels',
                duration: '3 hours',
                imageUrl: 'https://images.unsplash.com/photo-1519389950473-6b4b98cb7c13?q=80&w=2940&auto=format&fit=crop'
              },
              {
                id: 106,
                title: 'Chemical Handling and Storage',
                description: 'Best practices for safely handling, storing, and disposing of chemicals in the workplace.',
                startDate: '2025-02-15T09:00:00',
                endDate: '2025-02-15T16:00:00',
                location: 'Lab Building C',
                instructor: 'Dr. Marcus Lee',
                category: 'Safety',
                type: 'In-Person',
                mandatory: true,
                availableSeats: 0,
                totalSeats: 25,
                status: 'completed',
                registrationDeadline: '2025-02-10',
                prerequisites: ['Basic Safety Orientation'],
                level: 'Intermediate',
                duration: '7 hours',
                imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=2940&auto=format&fit=crop'
              },
            ];
            
            setTrainings(mockTrainings);
            setFilteredTrainings(mockTrainings);
            
            // Save mock data to localStorage
            localStorage.setItem('trainings', JSON.stringify(mockTrainings));
            
            setIsLoading(false);
          }, 1000);
        }
      } catch (err) {
        console.error('Error fetching trainings:', err);
        setError('Failed to load trainings. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  // Keep trainings in localStorage when they change
  useEffect(() => {
    if (trainings.length > 0) {
      localStorage.setItem('trainings', JSON.stringify(trainings));
    }
  }, [trainings]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredTrainings(applyFilters(trainings, value, filters));
  };

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    setFilteredTrainings(applyFilters(trainings, searchTerm, newFilters));
  };

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

  // Handle adding a new training
  const handleAddTraining = (newTraining) => {
    // Create a new ID (highest existing ID + 1)
    const maxId = trainings.reduce((max, training) => Math.max(max, training.id), 0);
    const trainingWithId = {
      ...newTraining,
      id: maxId + 1,
      // Add other default properties that weren't specified in the form
      availableSeats: newTraining.totalSeats,
      status: 'upcoming',
      imageUrl: 'https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?q=80&w=2069&auto=format&fit=crop'
    };
    
    const updatedTrainings = [trainingWithId, ...trainings];
    setTrainings(updatedTrainings);
    
    // Apply current filters to the updated training list
    setFilteredTrainings(applyFilters(updatedTrainings, searchTerm, filters));
  };

  // Handle selecting a training to view
  const handleViewTraining = (training) => {
    setSelectedTraining(training);
    onViewOpen();
  };

  // Helper function to determine badge variant based on status
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

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      status: '',
      type: '',
      date: '',
    });
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading as="h1" size="xl" color="sasol.primary">
          Training Programs
        </Heading>
        
        {isAdmin && (
          <Button 
            leftIcon={<FiPlus />} 
            colorScheme="blue" 
            onClick={onOpen}
          >
            Add Training
          </Button>
        )}
      </Flex>

      {error && (
        <Box mb={6} p={4} bg="red.50" color="red.500" borderRadius="md">
          {error}
        </Box>
      )}

      {/* Search and Filters */}
      <Card mb={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="#EDF2F7">
        <CardBody>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="gray.400" />
              </InputLeftElement>
              <Input 
                placeholder="Search trainings by title, description, facilitator..." 
                value={searchTerm}
                onChange={handleSearchChange}
                borderRadius="lg"
                borderColor="#E2E8F0"
                _hover={{ borderColor: '#CBD5E0' }}
                _focus={{ borderColor: '#0F3151', boxShadow: '0 0 0 1px #0F3151' }}
                color="gray.700"
                _placeholder={{ color: "gray.500" }}
              />
            </InputGroup>

            <Flex wrap="wrap" gap={4} align="center">
              <Select
                placeholder="All Statuses"
                icon={<Icon as={FiFilter} />}
                width={{ base: '100%', md: 'auto' }}
                minW={{ md: '180px' }}
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                borderRadius="lg"
                borderColor="#E2E8F0"
                _hover={{ borderColor: '#CBD5E0' }}
                _focus={{ borderColor: '#0F3151', boxShadow: '0 0 0 1px #0F3151' }}
                bg="white"
                color="gray.700"
                _placeholder={{ color: "gray.500" }}
              >
                <option value="upcoming">Upcoming</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
              
              <Select
                placeholder="All Types"
                icon={<Icon as={FiFilter} />}
                width={{ base: '100%', md: 'auto' }}
                minW={{ md: '180px' }}
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                borderRadius="lg"
                borderColor="#E2E8F0"
                _hover={{ borderColor: '#CBD5E0' }}
                _focus={{ borderColor: '#0F3151', boxShadow: '0 0 0 1px #0F3151' }}
                bg="white"
                color="gray.700"
                _placeholder={{ color: "gray.500" }}
              >
                <option value="In-Person">In-Person</option>
                <option value="Virtual">Virtual</option>
                <option value="Hybrid">Hybrid</option>
              </Select>

              <Button 
                variant="outline" 
                onClick={clearFilters}
                ml={{ base: 0, md: 'auto' }}
                mt={{ base: 2, md: 0 }}
                borderRadius="lg"
                color="#0F3151"
                borderColor="#0F3151"
                _hover={{ bg: '#E1EBF0' }}
                leftIcon={<Icon as={FiXCircle} />}
              >
                Clear Filters
              </Button>
            </Flex>
          </Stack>
        </CardBody>
      </Card>

      {/* Training List */}
      {isLoading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} height="250px" />
          ))}
        </SimpleGrid>
      ) : filteredTrainings.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6" mt="6">
          {filteredTrainings.map((training) => (
            <Card 
              key={training.id} 
              variant="elevated"
              _hover={{ 
                transform: 'translateY(-5px)', 
                transition: '0.3s', 
                boxShadow: 'lg' 
              }}
            >
              <CardHeader pb="2">
                <HStack justify="space-between" align="flex-start">
                  <Badge variant={training.category.toLowerCase()}>
                    {training.category}
                  </Badge>
                  <Badge variant={getStatusVariant(training.status)}>
                    {training.status}
                  </Badge>
                </HStack>
              </CardHeader>
              <CardBody pt="0">
                <Heading size="md" mb="2" color="sasol.primary">
                  {training.title}
                </Heading>
                <Text fontSize="sm" color="sasol.gray.600" mb="3" noOfLines={2}>
                  {training.description}
                </Text>
                
                <Stack spacing="3" mb="4">
                  <HStack>
                    <Icon as={FiCalendar} color="sasol.gray.500" />
                    <Text fontSize="sm" color="sasol.gray.700">
                      {new Date(training.startDate).toLocaleDateString()}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiMapPin} color="sasol.gray.500" />
                    <Text fontSize="sm" color="sasol.gray.700">
                      {training.location || "Online"}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiClock} color="sasol.gray.500" />
                    <Text fontSize="sm" color="sasol.gray.700">
                      {training.duration}
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
                    variant={training.mandatory ? "required" : "optional"}
                  >
                    {training.mandatory ? "Required" : "Optional"}
                  </Badge>
                  <Button 
                    size="sm" 
                    rightIcon={<FiChevronRight />} 
                    onClick={() => handleViewTraining(training)}
                    variant="outline"
                    colorScheme="blue"
                  >
                    View Details
                  </Button>
                </HStack>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <Box textAlign="center" py={10} px={6}>
          <Heading as="h2" size="lg" mb={2} color="gray.800">
            No Trainings Found
          </Heading>
          <Text color="gray.700">
            No training sessions match your current filters. Try adjusting your search criteria.
          </Text>
          <Button mt={4} onClick={clearFilters}>
            Clear All Filters
          </Button>
        </Box>
      )}

      {/* Add Training Modal */}
      {isAdmin && (
        <AddTrainingModal
          isOpen={isOpen}
          onClose={onClose}
          onAddTraining={handleAddTraining}
        />
      )}

      {/* View Training Modal */}
      <ViewTrainingModal
        isOpen={isViewOpen}
        onClose={onViewClose}
        training={selectedTraining}
      />
    </Box>
  );
};

export default TrainingListPage;
