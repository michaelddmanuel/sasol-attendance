import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AddTrainingModal } from '../../components/admin';
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Icon,
  Input,
  Select,
  HStack,
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
  InputGroup,
  InputLeftElement,
  Card,
  CardBody,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Skeleton,
  Stack,
  Checkbox,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  IconButton,
  Portal
} from '@chakra-ui/react';
import {
  FiSearch,
  FiFilter,
  FiCalendar,
  FiPlus,
  FiMoreVertical,
  FiEye,
  FiEdit2,
  FiUsers,
  FiDownload,
  FiTrash2,
  FiClock,
  FiMapPin
} from 'react-icons/fi';
import api from '../../services/api';

const TrainingManagementPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [trainings, setTrainings] = useState([]);
  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    date: '',
  });
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [showPast, setShowPast] = useState(false);
  
  // Add training modal state
  const { 
    isOpen: isAddTrainingOpen, 
    onOpen: onAddTrainingOpen, 
    onClose: onAddTrainingClose 
  } = useDisclosure();
  const [trainingToEdit, setTrainingToEdit] = useState(null);

  // Fetch trainings data
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        setIsLoading(true);
        // This would be a real API call
        // For now, let's use mock data
        
        const mockTrainings = [
          {
            id: 1,
            title: 'ESD Compliance Workshop',
            description: 'Key compliance requirements for enterprise suppliers',
            startDate: '2025-03-02T09:00:00',
            endDate: '2025-03-02T12:00:00',
            location: 'Sasol Head Office, Johannesburg',
            isVirtual: false,
            isMandatory: true,
            status: 'scheduled',
            facilitatorName: 'John Smith',
            capacity: 30,
            attendees: 24,
          },
          {
            id: 2,
            title: 'Safety Protocols Training',
            description: 'Essential safety protocols for all vendors',
            startDate: '2025-03-05T10:00:00',
            endDate: '2025-03-05T15:00:00',
            location: 'Online',
            isVirtual: true,
            isMandatory: true,
            status: 'scheduled',
            facilitatorName: 'Sarah Johnson',
            capacity: 25,
            attendees: 18,
          },
          {
            id: 3,
            title: 'Vendor Onboarding Session',
            description: 'Onboarding for new vendors and suppliers',
            startDate: '2025-03-10T14:00:00',
            endDate: '2025-03-10T16:30:00',
            location: 'Sasol Training Center, Secunda',
            isVirtual: false,
            isMandatory: false,
            status: 'scheduled',
            facilitatorName: 'David Williams',
            capacity: 20,
            attendees: 12,
          },
          {
            id: 4,
            title: 'Environmental Compliance Workshop',
            description: 'Workshop on environmental regulations and compliance',
            startDate: '2025-02-15T09:00:00',
            endDate: '2025-02-15T12:00:00',
            location: 'Sasol Head Office, Johannesburg',
            isVirtual: false,
            isMandatory: true,
            status: 'completed',
            facilitatorName: 'Emily Brown',
            capacity: 30,
            attendees: 28,
          },
        ];
        
        setTrainings(mockTrainings);
        setFilteredTrainings(mockTrainings);
        
      } catch (error) {
        console.error('Error fetching trainings:', error);
        setError('Failed to load training sessions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  // Apply filters and search
  useEffect(() => {
    if (!trainings.length) return;

    let result = [...trainings];

    // Filter past trainings if not showing them
    if (!showPast) {
      const now = new Date();
      result = result.filter(training => {
        const endDate = new Date(training.endDate);
        return endDate >= now || training.status === 'scheduled';
      });
    }

    // Apply search
    if (searchTerm) {
      result = result.filter(training => 
        training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (training.description && training.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (training.facilitatorName && training.facilitatorName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (training.location && training.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply filters
    if (filters.status) {
      result = result.filter(training => training.status === filters.status);
    }

    if (filters.type) {
      if (filters.type === 'mandatory') {
        result = result.filter(training => training.isMandatory);
      } else if (filters.type === 'optional') {
        result = result.filter(training => !training.isMandatory);
      } else if (filters.type === 'virtual') {
        result = result.filter(training => training.isVirtual);
      } else if (filters.type === 'physical') {
        result = result.filter(training => !training.isVirtual);
      }
    }

    if (filters.date) {
      const now = new Date();
      const today = new Date(now.setHours(0, 0, 0, 0));
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      switch (filters.date) {
        case 'today':
          result = result.filter(training => {
            const trainingDate = new Date(training.startDate);
            return trainingDate >= today && trainingDate < tomorrow;
          });
          break;
        case 'week':
          result = result.filter(training => {
            const trainingDate = new Date(training.startDate);
            return trainingDate >= today && trainingDate < nextWeek;
          });
          break;
        case 'month':
          result = result.filter(training => {
            const trainingDate = new Date(training.startDate);
            return trainingDate >= today && trainingDate < nextMonth;
          });
          break;
        default:
          // No date filter
          break;
      }
    }

    setFilteredTrainings(result);
  }, [searchTerm, filters, trainings, showPast]);

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

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      status: '',
      type: '',
      date: '',
    });
  };

  // Open the delete confirmation modal
  const handleDeleteClick = (training) => {
    setSelectedTraining(training);
    onOpen();
  };

  // Delete a training
  const handleDeleteConfirm = async () => {
    if (!selectedTraining) return;
    
    setIsDeleteLoading(true);
    
    try {
      // This would be a real API call
      // await api.delete(`/api/training/${selectedTraining.id}`);
      
      // Remove the training from the state
      setTrainings(prev => prev.filter(t => t.id !== selectedTraining.id));
      
      toast({
        title: 'Training deleted',
        description: `"${selectedTraining.title}" has been deleted successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      onClose();
    } catch (error) {
      console.error('Error deleting training:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete the training. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDeleteLoading(false);
    }
  };

  // Handler to open add training modal
  const handleAddTraining = () => {
    setTrainingToEdit(null); // No training to edit, creating new
    onAddTrainingOpen();
  };

  // Handler to open edit training modal
  const handleEditTraining = (training) => {
    setTrainingToEdit(training); // Set training to edit
    onAddTrainingOpen();
  };

  // Handler for when a training is added or updated
  const handleTrainingChange = (newTraining) => {
    if (trainingToEdit) {
      // Update existing training
      setTrainings(prev => 
        prev.map(t => t.id === newTraining.id ? newTraining : t)
      );
      setFilteredTrainings(prev => 
        prev.map(t => t.id === newTraining.id ? newTraining : t)
      );
      toast({
        title: "Training updated",
        description: "The training has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Add new training
      const trainingWithId = {
        ...newTraining,
        id: Math.random().toString(36).substr(2, 9) // Generate random id (in real app, backend would provide this)
      };
      setTrainings(prev => [trainingWithId, ...prev]);
      setFilteredTrainings(prev => [trainingWithId, ...prev]);
      toast({
        title: "Training added",
        description: "The new training has been successfully added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    onAddTrainingClose();
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading as="h1" size="xl" color="#0F3151">
          Training Management
        </Heading>
        <Button
          as={RouterLink}
          to="/admin/trainings/new"
          leftIcon={<Icon as={FiPlus} />}
          bg="#0F3151"
          color="white"
          _hover={{ bg: '#1A4B76', transform: 'translateY(-1px)' }}
          _active={{ bg: '#0A2A40' }}
          boxShadow="sm"
          borderRadius="lg"
          transition="all 0.2s"
          hidden
        >
          Create New Training
        </Button>
        <Button
          leftIcon={<Icon as={FiPlus} />}
          bg="#0F3151"
          color="white"
          _hover={{ bg: '#1A4B76', transform: 'translateY(-1px)' }}
          _active={{ bg: '#0A2A40' }}
          boxShadow="sm"
          borderRadius="lg"
          transition="all 0.2s"
          onClick={handleAddTraining}
        >
          Add Training
        </Button>
      </Flex>

      {error && (
        <Alert status="error" mb={6} borderRadius="lg">
          <AlertIcon />
          {error}
        </Alert>
      )}

      {/* Search and Filters */}
      <Card mb={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="#EDF2F7">
        <CardBody>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="#0F3151" />
              </InputLeftElement>
              <Input
                placeholder="Search trainings by title, description, facilitator..."
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

            <Flex wrap="wrap" gap={4}>
              <FormControl display="flex" alignItems="center" width="auto">
                <Checkbox
                  id="show-past"
                  isChecked={showPast}
                  onChange={(e) => setShowPast(e.target.checked)}
                  colorScheme="blue"
                />
                <FormLabel htmlFor="show-past" mb={0} ml={2}>
                  Show Past Trainings
                </FormLabel>
              </FormControl>
              
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
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Select>

              <Select
                placeholder="All Types"
                icon={<Icon as={FiFilter} color="#0F3151" />}
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
                <option value="mandatory">Mandatory</option>
                <option value="optional">Optional</option>
                <option value="virtual">Virtual</option>
                <option value="physical">Physical</option>
              </Select>

              <Select
                placeholder="All Dates"
                icon={<Icon as={FiCalendar} color="#0F3151" />}
                width={{ base: '100%', md: 'auto' }}
                minW={{ md: '180px' }}
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                borderRadius="lg"
                borderColor="#E2E8F0"
                _hover={{ borderColor: '#CBD5E0' }}
                _focus={{ borderColor: '#0F3151', boxShadow: '0 0 0 1px #0F3151' }}
                bg="white"
                color="gray.700"
                _placeholder={{ color: "gray.500" }}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </Select>

              <Button 
                variant="outline" 
                onClick={clearFilters}
                ml="auto"
                borderRadius="lg"
                borderColor="#E2E8F0"
                color="#0F3151"
                _hover={{ bg: '#E1EBF0', borderColor: '#0F3151' }}
                _active={{ bg: '#D9E5ED' }}
              >
                Clear Filters
              </Button>
            </Flex>
          </Stack>
        </CardBody>
      </Card>

      {/* Training Table */}
      <Card borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="#EDF2F7">
        <CardBody p={0}>
          <Box overflowX="auto">
            <Table variant="simple" width="100%" style={{ borderCollapse: 'separate', borderSpacing: '0' }}>
              <Thead bg="#F7FAFC">
                <Tr>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Training</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Date & Time</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Location</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Status</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600">Attendance</Th>
                  <Th py={4} fontSize="xs" textTransform="uppercase" color="gray.600" textAlign="right">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <Tr key={i}>
                      <Td><Skeleton height="20px" width="200px" /></Td>
                      <Td><Skeleton height="20px" width="150px" /></Td>
                      <Td><Skeleton height="20px" width="150px" /></Td>
                      <Td><Skeleton height="20px" width="100px" /></Td>
                      <Td><Skeleton height="20px" width="100px" /></Td>
                      <Td><Skeleton height="20px" width="80px" /></Td>
                    </Tr>
                  ))
                ) : filteredTrainings.length > 0 ? (
                  filteredTrainings.map(training => (
                    <Tr key={training.id} _hover={{ bg: "#F7FAFC" }} borderBottom="1px solid" borderColor="#EDF2F7">
                      <Td>
                        <Box>
                          <HStack spacing={2} mb={1}>
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
                            <Text fontWeight="medium">{training.title}</Text>
                          </HStack>
                          <Text fontSize="sm" color="gray.600" noOfLines={1}>
                            {training.description}
                          </Text>
                          <Text fontSize="xs" color="gray.500" mt={1}>
                            <Icon as={FiUsers} mr={1} fontSize="10px" color="#0F3151" />
                            Facilitator: {training.facilitatorName || 'Not assigned'}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        <HStack>
                          <Box>
                            <Text>{formatDate(training.startDate)}</Text>
                            <Text fontSize="sm" color="gray.500" display="flex" alignItems="center">
                              <Icon as={FiClock} mr={1} color="#0F3151" />
                              {formatTime(training.startDate)} - {formatTime(training.endDate)}
                            </Text>
                          </Box>
                        </HStack>
                      </Td>
                      <Td>
                        <Text display="flex" alignItems="center">
                          <Icon as={FiMapPin} mr={1} color="#0F3151" />
                          {training.isVirtual ? 'Virtual (Online)' : training.location}
                        </Text>
                      </Td>
                      <Td>
                        <Badge 
                          px={2} 
                          py={1} 
                          borderRadius="full" 
                          bg={
                            training.status === 'scheduled' ? '#C6F6D5' : 
                            training.status === 'in-progress' ? '#F7D2C4' : 
                            training.status === 'completed' ? '#C5CAE9' : '#FEE2E2'
                          } 
                          color={
                            training.status === 'scheduled' ? '#34C759' : 
                            training.status === 'in-progress' ? '#FFA07A' : 
                            training.status === 'completed' ? '#4F8CF7' : '#B91C1C'
                          } 
                          fontWeight="medium"
                          fontSize="xs"
                        >
                          {training.status}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack>
                          <Icon as={FiUsers} color="#0F3151" fontSize="12px" />
                          <Text>{training.attendees}/{training.capacity}</Text>
                        </HStack>
                      </Td>
                      <Td textAlign="right">
                        <Menu closeOnSelect placement="bottom-end">
                          <MenuButton
                            as={IconButton}
                            aria-label="More options"
                            icon={<Icon as={FiMoreVertical} color="#0F3151" />}
                            variant="ghost"
                            size="sm"
                            borderRadius="full"
                            _hover={{ bg: 'gray.100' }}
                          />
                          <Portal>
                            <MenuList 
                              minW="160px" 
                              shadow="lg" 
                              borderRadius="md"
                              py={2}
                              borderColor="gray.200"
                              border="1px solid"
                              bg="white"
                              color="gray.700"
                              zIndex={10}
                            >
                              <MenuItem 
                                icon={<Icon as={FiEye} fontSize="14px" color="#0F3151" />}
                                onClick={() => navigate(`/admin/trainings/${training.id}`)}
                                py={2}
                                fontSize="sm"
                                bg="white"
                                color="gray.700"
                                _hover={{ bg: '#F7FAFC' }}
                              >
                                View Details
                              </MenuItem>
                              <MenuItem 
                                icon={<Icon as={FiEdit2} fontSize="14px" color="#0F3151" />}
                                onClick={() => handleEditTraining(training)}
                                py={2}
                                fontSize="sm"
                                bg="white"
                                color="gray.700"
                                _hover={{ bg: '#F7FAFC' }}
                              >
                                Edit
                              </MenuItem>
                              <MenuItem 
                                icon={<Icon as={FiUsers} fontSize="14px" color="#0F3151" />}
                                onClick={() => navigate(`/admin/trainings/${training.id}/attendees`)}
                                py={2}
                                fontSize="sm"
                                bg="white"
                                color="gray.700"
                                _hover={{ bg: '#F7FAFC' }}
                              >
                                Manage Attendees
                              </MenuItem>
                              <MenuItem 
                                icon={<Icon as={FiDownload} fontSize="14px" color="#0F3151" />}
                                onClick={() => {/* Download functionality */}}
                                py={2}
                                fontSize="sm"
                                bg="white"
                                color="gray.700"
                                _hover={{ bg: '#F7FAFC' }}
                              >
                                Export
                              </MenuItem>
                              <MenuItem 
                                icon={<Icon as={FiTrash2} fontSize="14px" color="red.500" />}
                                onClick={() => handleDeleteClick(training)}
                                py={2}
                                fontSize="sm"
                                bg="white"
                                color="red.500"
                                _hover={{ bg: 'red.50' }}
                                _active={{ bg: 'red.100' }}
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Portal>
                        </Menu>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={6} textAlign="center" py={6}>
                      <Box>
                        <Text fontSize="lg" fontWeight="medium" mb={2}>
                          No training sessions found
                        </Text>
                        <Text color="gray.500" mb={4}>
                          No training sessions match your search criteria.
                        </Text>
                        <Button variant="outline" onClick={clearFilters}>
                          Clear All Filters
                        </Button>
                      </Box>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="lg" boxShadow="xl">
          <ModalHeader color="sasol.gray.900" borderBottomWidth="1px" borderBottomColor="sasol.gray.200" py={4}>Delete Training</ModalHeader>
          <ModalCloseButton color="sasol.gray.700" />
          <ModalBody py={5}>
            <Text color="sasol.gray.800">Are you sure you want to delete this training? This action cannot be undone.</Text>
          </ModalBody>
          <ModalFooter borderTopWidth="1px" borderTopColor="sasol.gray.200" py={4} gap={3}>
            <Button 
              variant="outline" 
              onClick={onClose}
              color="sasol.gray.700"
              borderColor="sasol.gray.300"
              _hover={{ bg: 'sasol.gray.100', borderColor: 'sasol.gray.400' }}
            >
              Cancel
            </Button>
            <Button 
              bg="red.500"
              color="white"
              _hover={{ bg: 'red.600' }}
              _active={{ bg: 'red.700' }}
              isLoading={isDeleteLoading}
              onClick={async () => {
                if (!selectedTraining) return;
                
                try {
                  setIsDeleteLoading(true);
                  // In a real app, you would call your API endpoint
                  // await api.delete(`/api/trainings/${selectedTraining.id}`);
                  
                  // For demo, just update the local state
                  setTrainings(prev => prev.filter(t => t.id !== selectedTraining.id));
                  setFilteredTrainings(prev => prev.filter(t => t.id !== selectedTraining.id));
                  
                  toast({
                    title: 'Training Deleted',
                    description: 'The training has been successfully deleted.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                  
                  onClose();
                } catch (error) {
                  console.error('Error deleting training:', error);
                  toast({
                    title: 'Error',
                    description: 'Failed to delete training. Please try again.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                } finally {
                  setIsDeleteLoading(false);
                }
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Training Modal */}
      <AddTrainingModal 
        isOpen={isAddTrainingOpen} 
        onClose={onAddTrainingClose} 
        trainingToEdit={trainingToEdit} 
        onTrainingChange={handleTrainingChange}
      />
    </Box>
  );
};

export default TrainingManagementPage;
