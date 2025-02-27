import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  Alert,
  AlertIcon,
  Avatar,
  VStack,
  Switch,
  FormControl,
  FormLabel,
  IconButton
} from '@chakra-ui/react';
import {
  FiSearch,
  FiPlus,
  FiDownload,
  FiMoreVertical,
  FiUser,
  FiTrash2,
  FiEdit2,
  FiUsers,
  FiUserPlus,
  FiFilter,
  FiRefreshCw,
  FiMail,
  FiPhone,
  FiBriefcase
} from 'react-icons/fi';

import api from '../../services/api';
import { 
  UnifiedTable, 
  UntitledPageHeader, 
  TableToolbar 
} from '../../components/common';

const UserManagementPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // State
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Background colors
  const cardBg = 'white';
  const borderColor = 'gray.200';
  
  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // In a real app, fetch from API
        // const response = await api.get('/api/users');
        // setUsers(response.data);
        
        // Mock data for now
        setTimeout(() => {
          const mockUsers = [
            {
              id: 1,
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@sasol.com',
              phone: '+27123456789',
              role: 'admin',
              department: 'IT',
              status: 'active',
              lastLogin: '2024-05-15T08:30:00Z',
              companyName: 'Sasol',
              avatarUrl: '',
            },
            {
              id: 2,
              firstName: 'Jane',
              lastName: 'Smith',
              email: 'jane.smith@sasol.com',
              phone: '+27123456790',
              role: 'user',
              department: 'Operations',
              status: 'active',
              lastLogin: '2024-05-10T10:15:00Z',
              companyName: 'Sasol',
              avatarUrl: '',
            },
            {
              id: 3,
              firstName: 'Michael',
              lastName: 'Johnson',
              email: 'michael.johnson@contractor.com',
              phone: '+27123456791',
              role: 'instructor',
              department: 'Safety',
              status: 'inactive',
              lastLogin: '2024-04-20T14:45:00Z',
              companyName: 'Safety Contractors Ltd',
              avatarUrl: '',
            },
            {
              id: 4,
              firstName: 'Sarah',
              lastName: 'Williams',
              email: 'sarah.williams@sasol.com',
              phone: '+27123456792',
              role: 'user',
              department: 'HR',
              status: 'active',
              lastLogin: '2024-05-14T09:20:00Z',
              companyName: 'Sasol',
              avatarUrl: '',
            },
            {
              id: 5,
              firstName: 'Robert',
              lastName: 'Brown',
              email: 'robert.brown@sasol.com',
              phone: '+27123456793',
              role: 'admin',
              department: 'Finance',
              status: 'active',
              lastLogin: '2024-05-13T16:10:00Z',
              companyName: 'Sasol',
              avatarUrl: '',
            },
          ];
          
          setUsers(mockUsers);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  // Handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  
  // Handle filter
  const handleFilterChange = (value) => {
    setRoleFilter(value);
  };
  
  // Handle row selection
  const handleSelectRow = (index) => {
    if (selectedUsers.includes(index)) {
      setSelectedUsers(selectedUsers.filter(i => i !== index));
    } else {
      setSelectedUsers([...selectedUsers, index]);
    }
  };
  
  // Handle select all
  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      const allIndices = filteredUsers.map((_, index) => index);
      setSelectedUsers(allIndices);
    } else {
      setSelectedUsers([]);
    }
  };
  
  // Open edit modal
  const handleEditUser = (user) => {
    setCurrentUser(user);
    onOpen();
  };
  
  // Delete user
  const handleDeleteUser = (userId) => {
    // In a real app, call API to delete user
    // api.delete(`/api/users/${userId}`);
    
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: 'User deleted',
      description: 'The user has been successfully deleted.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  
  // Handle row actions
  const handleRowAction = (action, user) => {
    switch (action) {
      case 'edit':
        handleEditUser(user);
        break;
      case 'delete':
        handleDeleteUser(user.id);
        break;
      default:
        break;
    }
  };
  
  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Table columns definition
  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (user) => (
        <HStack spacing={3}>
          <Avatar 
            size="sm" 
            name={`${user.firstName} ${user.lastName}`} 
            src={user.avatarUrl} 
            bg="brand.500" 
          />
          <Box>
            <Text fontWeight="medium">
              {user.firstName} {user.lastName}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {user.email}
            </Text>
          </Box>
        </HStack>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      render: (user) => (
        <HStack>
          <Icon as={FiBriefcase} color="gray.400" />
          <Text>{user.department}</Text>
        </HStack>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (user) => {
        let colorScheme;
        switch (user.role) {
          case 'admin':
            colorScheme = 'purple';
            break;
          case 'instructor':
            colorScheme = 'blue';
            break;
          default:
            colorScheme = 'gray';
        }
        
        return (
          <Badge
            colorScheme={colorScheme}
            variant="subtle"
            borderRadius="full"
            px={2.5}
            py={0.5}
          >
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </Badge>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      type: 'status',
    },
    {
      key: 'companyName',
      header: 'Company',
    },
    {
      key: 'lastLogin',
      header: 'Last Active',
      type: 'datetime',
    },
  ];
  
  // Available row actions
  const rowActions = [
    { label: 'Edit User', action: 'edit', icon: FiEdit2 },
    { label: 'Delete User', action: 'delete', icon: FiTrash2 },
  ];
  
  // Filter options
  const filterOptions = [
    { label: 'All Roles', value: 'all' },
    { label: 'Admins', value: 'admin' },
    { label: 'Instructors', value: 'instructor' },
    { label: 'Users', value: 'user' },
  ];

  return (
    <Box>
      <UntitledPageHeader
        title="User Management"
        description="View and manage system users and their permissions"
        actions={[
          { 
            label: 'Add New User', 
            icon: FiUserPlus, 
            type: 'primary',
            onClick: () => handleEditUser(null)
          },
          { 
            label: 'Export Users', 
            icon: FiDownload,
            onClick: () => console.log('Export users')
          }
        ]}
      />
      
      <Card borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="#EDF2F7" mb={6}>
        <CardBody>
          <TableToolbar
            searchPlaceholder="Search by name or email..."
            onSearch={handleSearch}
            searchValue={searchTerm}
            filterOptions={filterOptions}
            selectedFilter={roleFilter}
            onFilterChange={handleFilterChange}
            actions={[
              {
                label: 'Bulk Delete',
                icon: FiTrash2,
                onClick: () => console.log('Bulk delete'),
                disabled: selectedUsers.length === 0,
              }
            ]}
          />
          
          <Box mt={4}>
            {isLoading ? (
              <Stack spacing={4}>
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} height="60px" />
                ))}
              </Stack>
            ) : (
              <UnifiedTable
                columns={columns}
                data={filteredUsers}
                isSelectable={true}
                selectedRows={selectedUsers}
                onSelectRow={handleSelectRow}
                onSelectAll={handleSelectAll}
                onRowAction={handleRowAction}
                actions={rowActions}
                isLoading={isLoading}
              />
            )}
          </Box>
        </CardBody>
      </Card>
      
      {/* Edit/Create User Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent borderRadius="lg" bg="white">
          <ModalHeader color="sasol.gray.900">
            {currentUser ? 'Edit User' : 'Create New User'}
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing={4} align="start">
              <HStack spacing={4} width="full">
                <FormControl>
                  <FormLabel color="sasol.gray.800" fontWeight="medium">First Name</FormLabel>
                  <Input 
                    defaultValue={currentUser?.firstName || ''}
                    placeholder="Enter first name"
                    borderColor="sasol.gray.300"
                    _placeholder={{ color: 'sasol.gray.500' }}
                    color="sasol.gray.800"
                    _hover={{ borderColor: 'sasol.gray.400' }}
                    _focus={{ borderColor: 'sasol.primary', boxShadow: '0 0 0 1px #0F3151' }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="sasol.gray.800" fontWeight="medium">Last Name</FormLabel>
                  <Input 
                    defaultValue={currentUser?.lastName || ''}
                    placeholder="Enter last name"
                    borderColor="sasol.gray.300"
                    _placeholder={{ color: 'sasol.gray.500' }}
                    color="sasol.gray.800"
                    _hover={{ borderColor: 'sasol.gray.400' }}
                    _focus={{ borderColor: 'sasol.primary', boxShadow: '0 0 0 1px #0F3151' }}
                  />
                </FormControl>
              </HStack>
              
              <FormControl>
                <FormLabel color="sasol.gray.800" fontWeight="medium">Email</FormLabel>
                <Input 
                  defaultValue={currentUser?.email || ''}
                  placeholder="Enter email address"
                  borderColor="sasol.gray.300"
                  _placeholder={{ color: 'sasol.gray.500' }}
                  color="sasol.gray.800"
                  _hover={{ borderColor: 'sasol.gray.400' }}
                  _focus={{ borderColor: 'sasol.primary', boxShadow: '0 0 0 1px #0F3151' }}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel color="sasol.gray.800" fontWeight="medium">Phone Number</FormLabel>
                <Input 
                  defaultValue={currentUser?.phone || ''}
                  placeholder="Enter phone number"
                  borderColor="sasol.gray.300"
                  _placeholder={{ color: 'sasol.gray.500' }}
                  color="sasol.gray.800"
                  _hover={{ borderColor: 'sasol.gray.400' }}
                  _focus={{ borderColor: 'sasol.primary', boxShadow: '0 0 0 1px #0F3151' }}
                />
              </FormControl>
              
              <HStack spacing={4} width="full">
                <FormControl>
                  <FormLabel color="sasol.gray.800" fontWeight="medium">Department</FormLabel>
                  <Select 
                    defaultValue={currentUser?.department || ''}
                    placeholder="Select department"
                    borderColor="sasol.gray.300"
                    color="sasol.gray.800"
                    _hover={{ borderColor: 'sasol.gray.400' }}
                    _focus={{ borderColor: 'sasol.primary', boxShadow: '0 0 0 1px #0F3151' }}
                  >
                    <option value="hr">Human Resources</option>
                    <option value="it">IT</option>
                    <option value="finance">Finance</option>
                    <option value="operations">Operations</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel color="sasol.gray.800" fontWeight="medium">Role</FormLabel>
                  <Select 
                    defaultValue={currentUser?.role || ''}
                    placeholder="Select role"
                    borderColor="sasol.gray.300"
                    color="sasol.gray.800"
                    _hover={{ borderColor: 'sasol.gray.400' }}
                    _focus={{ borderColor: 'sasol.primary', boxShadow: '0 0 0 1px #0F3151' }}
                  >
                    <option value="admin">Admin</option>
                    <option value="instructor">Instructor</option>
                    <option value="user">User</option>
                  </Select>
                </FormControl>
              </HStack>
              
              <FormControl>
                <FormLabel color="sasol.gray.800" fontWeight="medium">Company Name</FormLabel>
                <Input 
                  defaultValue={currentUser?.companyName || ''}
                  placeholder="Enter company name"
                  borderColor="sasol.gray.300"
                  _placeholder={{ color: 'sasol.gray.500' }}
                  color="sasol.gray.800"
                  _hover={{ borderColor: 'sasol.gray.400' }}
                  _focus={{ borderColor: 'sasol.primary', boxShadow: '0 0 0 1px #0F3151' }}
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0" color="sasol.gray.800" fontWeight="medium">Active Status</FormLabel>
                <Switch 
                  colorScheme="green" 
                  defaultChecked={currentUser?.status === 'active'}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose} borderColor="sasol.gray.300" color="sasol.gray.700">
              Cancel
            </Button>
            <Button 
              bg="#0F3151"
              color="white"
              _hover={{ bg: '#1A4B76', color: "white" }}
              _active={{ bg: '#0A2A40', color: "white" }}
              onClick={() => {
                onClose();
                toast({
                  title: currentUser ? 'User updated' : 'User created',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
              }}
            >
              {currentUser ? 'Save Changes' : 'Create User'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserManagementPage;
