import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  VStack,
  IconButton,
  Drawer,
  DrawerContent,
  useDisclosure,
  Text,
  Icon,
  Avatar,
  Image,
  Collapse,
  HStack,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  useBreakpointValue
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  HamburgerIcon,
} from '@chakra-ui/icons';
import {
  FiHome,
  FiFile,
  FiUsers,
  FiSettings,
  FiCalendar,
  FiUser,
  FiLogOut,
  FiList,
  FiChevronDown,
  FiChevronRight,
  FiChevronLeft,
  FiBarChart2,
  FiShield,
  FiClipboard,
  FiClock,
  FiUserPlus,
  FiKey,
  FiEdit,
  FiPlusCircle,
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

// NavItem component for navigation links
const NavItem = ({ icon, children, to, isActive, isCollapsed, ...rest }) => {
  return (
    <RouterLink to={to} style={{ textDecoration: 'none', width: '100%' }}>
      <Flex
        align="center"
        p="3"
        mx="0"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        width="100%"
        bg={isActive ? '#0F3151' : 'transparent'}
        color={isActive ? '#FFFFFF' : 'gray.600'}
        _hover={{
          bg: isActive ? '#0F3151' : '#E1EBF0',
          color: isActive ? '#FFFFFF' : '#0F3151',
          boxShadow: isActive ? 'none' : 'sm',
        }}
        transition="all 0.2s"
        fontWeight={isActive ? "medium" : "normal"}
        justifyContent={isCollapsed ? "center" : "flex-start"}
        {...rest}
      >
        {icon && (
          <Icon
            mr={isCollapsed ? "0" : "4"}
            fontSize="16"
            color={isActive ? '#FFFFFF' : 'gray.400'}
            _groupHover={{
              color: isActive ? '#FFFFFF' : '#0F3151',
            }}
            as={icon}
          />
        )}
        {!isCollapsed && (
          <Text color={isActive ? "#FFFFFF" : "inherit"} fontWeight="inherit">{children}</Text>
        )}
      </Flex>
    </RouterLink>
  );
};

// NavSubItem component for submenu items (admin section)
const NavSubItem = ({ icon, children, to, isActive, isCollapsed, onClick, ...rest }) => {
  return (
    <RouterLink to={to} style={{ textDecoration: 'none', width: '100%' }} onClick={onClick}>
      <Flex
        align="center"
        p="3"
        ml={isCollapsed ? "0" : "2"}
        mr="0"
        borderRadius="md"
        role="group"
        cursor="pointer"
        width={isCollapsed ? "100%" : "calc(100% - 0.5rem)"}
        bg={isActive ? '#0F3151' : 'transparent'}
        color={isActive ? '#FFFFFF' : 'gray.600'}
        _hover={{
          bg: isActive ? '#0F3151' : '#E1EBF0',
          color: isActive ? '#FFFFFF' : '#0F3151',
          boxShadow: isActive ? 'none' : 'sm',
        }}
        transition="all 0.2s"
        fontWeight={isActive ? "medium" : "normal"}
        justifyContent={isCollapsed ? "center" : "flex-start"}
        {...rest}
      >
        {icon && (
          <Icon
            mr={isCollapsed ? "0" : "3"}
            fontSize={isCollapsed ? "16" : "14"}
            color={isActive ? '#FFFFFF' : 'gray.400'}
            _groupHover={{
              color: isActive ? '#FFFFFF' : '#0F3151',
            }}
            as={icon}
          />
        )}
        {!isCollapsed && (
          <Text color={isActive ? "#FFFFFF" : "inherit"} fontWeight="inherit">{children}</Text>
        )}
      </Flex>
    </RouterLink>
  );
};

// NavGroup component for collapsible navigation sections (admin)
const NavGroup = ({ icon, title, children, isActive, isCollapsed, ...rest }) => {
  const [isOpen, setIsOpen] = React.useState(isActive);

  return (
    <Box width="100%">
      <Flex
        align="center"
        p="3"
        mx="0"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        width="100%"
        bg={isActive ? '#0F3151' : 'transparent'}
        color={isActive ? '#FFFFFF' : 'gray.600'}
        fontWeight={isActive ? "semibold" : "medium"}
        onClick={() => setIsOpen(!isOpen)}
        _hover={{
          bg: isActive ? '#0F3151' : '#E1EBF0',
          color: isActive ? '#FFFFFF' : '#0F3151',
        }}
        justifyContent={isCollapsed ? "center" : "flex-start"}
        {...rest}
      >
        {icon && (
          <Icon
            mr={isCollapsed ? "0" : "4"}
            fontSize="16"
            color={isActive ? '#FFFFFF' : 'gray.500'}
            _groupHover={{
              color: isActive ? '#FFFFFF' : '#0F3151',
            }}
            as={icon}
          />
        )}
        {!isCollapsed && (
          <>
            <Text flex="1" color={isActive ? '#FFFFFF' : 'gray.600'} fontWeight={isActive ? "semibold" : "medium"}>{title}</Text>
            <Icon 
              as={isOpen ? FiChevronDown : FiChevronRight}
              color={isActive ? '#FFFFFF' : 'gray.500'}
              _groupHover={{
                color: isActive ? '#FFFFFF' : '#0F3151',
              }}
            />
          </>
        )}
      </Flex>
      <Collapse in={isOpen}>
        <VStack
          width="100%"
          spacing="2"
          pt="2"
          pb="2"
          align="stretch"
        >
          {React.Children.map(children, child => 
            React.cloneElement(child, { isCollapsed })
          )}
        </VStack>
      </Collapse>
    </Box>
  );
};

// Sidebar content
const SidebarContent = ({ currentUser, logout, isCollapsed, onToggleCollapse, ...rest }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const isAdminActive = location.pathname.startsWith('/admin');
  const navigate = useNavigate();

  return (
    <Box
      transition="all 0.3s ease"
      bg="white"
      w={isCollapsed ? "70px" : "283px"}
      pos="fixed"
      h="full"
      borderRight="1px"
      borderRightColor="gray.200"
      {...rest}
    >
      <Flex 
        h="full" 
        flexDirection="column"
        px={isCollapsed ? "2" : "6"}
        py="4"
        position="relative"
      >
        {/* Toggle button */}
        <IconButton
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          icon={isCollapsed ? <Icon as={FiChevronRight} color="#0F3151" /> : <Icon as={FiChevronLeft} color="#0F3151" />}
          position="absolute"
          right="-12px"
          top="84px"
          size="sm"
          rounded="full"
          bg="white"
          shadow="md"
          border="1px"
          borderColor="gray.200"
          zIndex={2}
          onClick={onToggleCollapse}
          _hover={{
            bg: "#0F3151",
            "& svg": { color: "white" }
          }}
        />
        
        {/* Logo section at the top */}
        <Flex 
          h="20" 
          alignItems="center" 
          justifyContent="center" 
          mb="4"
        >
          {isCollapsed ? (
            <Image
              src="/sasol-icon.png"
              alt="Sasol Icon"
              maxW="40px"
              objectFit="contain"
              fallbackSrc="https://download.logo.wine/logo/Sasol/Sasol-Logo.wine.png"
            />
          ) : (
            <Image
              src="/sasol-logo-wine.png"
              alt="Sasol Logo"
              maxW="150px"
              objectFit="contain"
              fallbackSrc="https://download.logo.wine/logo/Sasol/Sasol-Logo.wine.png"
            />
          )}
        </Flex>

        {/* Nav Items */}
        <Box flex="1">
          <VStack spacing="2" align="stretch">
            <NavItem 
              icon={FiHome} 
              to="/dashboard" 
              isActive={isActive('/dashboard')}
              isCollapsed={isCollapsed}
            >
              Dashboard
            </NavItem>
            <NavItem 
              icon={FiCalendar} 
              to="/trainings" 
              isActive={isActive('/trainings')}
              isCollapsed={isCollapsed}
            >
              Trainings
            </NavItem>
            <NavItem 
              icon={FiClipboard} 
              to="/attendance" 
              isActive={isActive('/attendance')}
              isCollapsed={isCollapsed}
            >
              My Attendance
            </NavItem>
            
            {/* Admin section only shows for admin users */}
            {currentUser && (currentUser.role === 'admin' || currentUser.role === 'esd_admin') && (
              <NavGroup 
                icon={FiShield} 
                title="Admin" 
                isActive={isAdminActive}
                isCollapsed={isCollapsed}
              >
                <NavSubItem 
                  icon={FiHome} 
                  to="/admin/dashboard" 
                  isActive={isActive('/admin/dashboard')}
                  isCollapsed={isCollapsed}
                >
                  Admin Dashboard
                </NavSubItem>

                <NavSubItem 
                  icon={FiList} 
                  to="/admin/trainings" 
                  isActive={isActive('/admin/trainings')}
                  isCollapsed={isCollapsed}
                >
                  Training Management
                </NavSubItem>

                <NavSubItem 
                  icon={FiUsers} 
                  to="/admin/users" 
                  isActive={isActive('/admin/users')}
                  isCollapsed={isCollapsed}
                >
                  User Management
                </NavSubItem>

                <NavSubItem 
                  icon={FiBarChart2} 
                  to="/admin/reports" 
                  isActive={isActive('/admin/reports')}
                  isCollapsed={isCollapsed}
                >
                  Reports & Analytics
                </NavSubItem>
              </NavGroup>
            )}
          </VStack>
        </Box>

        {/* User section at the bottom */}
        <Flex 
          borderTop="1px" 
          borderTopColor="gray.200" 
          py="4"
          alignItems="center" 
          justifyContent={isCollapsed ? "center" : "space-between"}
        >
          {isCollapsed ? (
            <Popover placement="right" closeOnBlur={true}>
              <PopoverTrigger>
                <IconButton
                  aria-label="User settings"
                  icon={<Icon as={FiSettings} color="#0F3151" size={18} />}
                  variant="ghost"
                  size="sm"
                  _hover={{
                    bg: '#E1EBF0'
                  }}
                />
              </PopoverTrigger>
              <Portal>
                <PopoverContent width="200px" shadow="lg" borderRadius="md" _focus={{ outline: "none" }} bg="white">
                  <PopoverArrow bg="white" />
                  <PopoverHeader borderBottomWidth="1px" borderBottomColor="gray.200" fontWeight="semibold" py={3} px={4} color="sasol.blue.800">
                    User Options
                  </PopoverHeader>
                  <PopoverBody p={0}>
                    <VStack align="stretch" spacing={0}>
                      <Button 
                        variant="ghost" 
                        justifyContent="flex-start" 
                        leftIcon={<Icon as={FiUser} color="#0F3151" />}
                        py={3}
                        borderRadius={0}
                        onClick={() => navigate('/profile')}
                        color="gray.700"
                        _hover={{ bg: 'gray.50' }}
                      >
                        My Account
                      </Button>
                      <Button 
                        variant="ghost" 
                        justifyContent="flex-start" 
                        leftIcon={<Icon as={FiSettings} color="#0F3151" />}
                        py={3}
                        borderRadius={0}
                        onClick={() => navigate('/settings')}
                        color="gray.700"
                        _hover={{ bg: 'gray.50' }}
                      >
                        Settings
                      </Button>
                      <Button 
                        variant="ghost" 
                        justifyContent="flex-start" 
                        leftIcon={<Icon as={FiLogOut} color="red.500" />}
                        py={3}
                        borderRadius={0}
                        onClick={logout}
                        color="red.500"
                        _hover={{ bg: 'red.50' }}
                      >
                        Logout
                      </Button>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          ) : (
            <>
              <Flex alignItems="center" flex="1">
                <Avatar
                  size="sm"
                  name={currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : ''}
                  bg="#0F3151"
                  mr="3"
                />
                <Box flex="1" overflow="hidden">
                  <Text fontWeight="bold" fontSize="sm" isTruncated maxW="160px">
                    {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : ''}
                  </Text>
                  <Text fontSize="xs" color="gray.600" isTruncated maxW="160px">
                    {currentUser?.role || ''}
                  </Text>
                </Box>
              </Flex>

              <Popover placement="top-end" closeOnBlur={true}>
                <PopoverTrigger>
                  <IconButton
                    aria-label="User settings"
                    icon={<Icon as={FiSettings} color="#0F3151" size={18} />}
                    variant="ghost"
                    size="sm"
                    _hover={{
                      bg: '#E1EBF0'
                    }}
                  />
                </PopoverTrigger>
                <Portal>
                  <PopoverContent width="200px" shadow="lg" borderRadius="md" _focus={{ outline: "none" }} bg="white">
                    <PopoverArrow bg="white" />
                    <PopoverHeader borderBottomWidth="1px" borderBottomColor="gray.200" fontWeight="semibold" py={3} px={4} color="sasol.blue.800">
                      User Options
                    </PopoverHeader>
                    <PopoverBody p={0}>
                      <VStack align="stretch" spacing={0}>
                        <Button 
                          variant="ghost" 
                          justifyContent="flex-start" 
                          leftIcon={<Icon as={FiUser} color="#0F3151" />}
                          py={3}
                          borderRadius={0}
                          onClick={() => navigate('/profile')}
                          color="gray.700"
                          _hover={{ bg: 'gray.50' }}
                        >
                          My Account
                        </Button>
                        <Button 
                          variant="ghost" 
                          justifyContent="flex-start" 
                          leftIcon={<Icon as={FiSettings} color="#0F3151" />}
                          py={3}
                          borderRadius={0}
                          onClick={() => navigate('/settings')}
                          color="gray.700"
                          _hover={{ bg: 'gray.50' }}
                        >
                          Settings
                        </Button>
                        <Button 
                          variant="ghost" 
                          justifyContent="flex-start" 
                          leftIcon={<Icon as={FiLogOut} color="red.500" />}
                          py={3}
                          borderRadius={0}
                          onClick={logout}
                          color="red.500"
                          _hover={{ bg: 'red.50' }}
                        >
                          Logout
                        </Button>
                      </VStack>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

// Main layout component
const MainLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { currentUser, logout: authLogout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box minH="100vh" bg="#E1EBF0">
      {/* Mobile navigation drawer */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent 
            currentUser={currentUser} 
            logout={authLogout} 
            onClose={onClose} 
            isCollapsed={false}
          />
        </DrawerContent>
      </Drawer>

      {/* Desktop sidebar - always visible */}
      <Box
        display={{ base: 'none', md: 'block' }}
        w={{ md: isCollapsed ? '70px' : '283px' }}
        pos="fixed"
        h="full"
        transition="all 0.3s ease"
      >
        <SidebarContent 
          display={{ base: 'none', md: 'block' }} 
          currentUser={currentUser} 
          logout={authLogout} 
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />
      </Box>

      {/* Main content area */}
      <Box 
        ml={{ base: 0, md: isCollapsed ? '70px' : '283px' }} 
        p="4"
        transition="all 0.3s ease"
      >
        {/* Mobile header with menu button */}
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          borderBottomWidth="1px"
          borderColor="gray.200"
          h="14"
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="outline"
          />

          {/* Mobile logo */}
          <Image
            src="/sasol-logo-wine.png"
            alt="Sasol Logo"
            height="30px"
            fallbackSrc="https://download.logo.wine/logo/Sasol/Sasol-Logo.wine.png"
          />

          {/* Mobile user menu */}
          <Popover placement="bottom-end" closeOnBlur={true}>
            <PopoverTrigger>
              <IconButton
                aria-label="User settings"
                icon={<Icon as={FiSettings} color="#0F3151" size={18} />}
                variant="ghost"
                size="sm"
                _hover={{
                  bg: '#E1EBF0'
                }}
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent width="200px" shadow="lg" borderRadius="md" _focus={{ outline: "none" }} bg="white">
                <PopoverArrow bg="white" />
                <PopoverHeader borderBottomWidth="1px" borderBottomColor="gray.200" fontWeight="semibold" py={3} px={4} color="sasol.blue.800">
                  User Options
                </PopoverHeader>
                <PopoverBody p={0}>
                  <VStack align="stretch" spacing={0}>
                    <Button 
                      variant="ghost" 
                      justifyContent="flex-start" 
                      leftIcon={<Icon as={FiUser} color="#0F3151" />}
                      py={3}
                      borderRadius={0}
                      onClick={() => navigate('/profile')}
                      color="gray.700"
                      _hover={{ bg: 'gray.50' }}
                    >
                      My Account
                    </Button>
                    <Button 
                      variant="ghost" 
                      justifyContent="flex-start" 
                      leftIcon={<Icon as={FiSettings} color="#0F3151" />}
                      py={3}
                      borderRadius={0}
                      onClick={() => navigate('/settings')}
                      color="gray.700"
                      _hover={{ bg: 'gray.50' }}
                    >
                      Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      justifyContent="flex-start" 
                      leftIcon={<Icon as={FiLogOut} color="red.500" />}
                      py={3}
                      borderRadius={0}
                      onClick={authLogout}
                      color="red.500"
                      _hover={{ bg: 'red.50' }}
                    >
                      Logout
                    </Button>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </Flex>

        {/* Page content */}
        <Box pt={{ base: 4, md: 2 }}>
          <Box
            bg="white"
            p={5}
            shadow="sm"
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.200"
            mb={5}
          >
            <Outlet />
          </Box>
        </Box>

        {/* Footer */}
        <HStack
          as="footer"
          mt="8"
          py="4"
          borderTop="1px"
          borderColor="gray.200"
          justify="center"
        >
          <Text fontSize="sm" color="gray.600">
            {new Date().getFullYear()} Sasol Training & Compliance System. All rights reserved.
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default MainLayout;
