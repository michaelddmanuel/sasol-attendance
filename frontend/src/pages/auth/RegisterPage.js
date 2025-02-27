import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Heading,
  Text,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  Select,
  Divider,
  HStack,
  InputLeftAddon,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Form validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    role: Yup.string()
      .required('Role is required'),
    companyName: Yup.string()
      .when('role', {
        is: (role) => role === 'vendor',
        then: Yup.string().required('Company name is required for vendors')
      }),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^\+?[0-9]{10,15}$/, 'Phone number is not valid'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      companyName: '',
      phoneNumber: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError('');
      
      try {
        const result = await register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          role: values.role,
          companyName: values.companyName,
          phoneNumber: values.phoneNumber,
        });
        
        if (result.success) {
          navigate('/login', { state: { message: 'Registration successful! Please login with your credentials.' } });
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('An error occurred during registration. Please try again.');
        console.error('Registration error:', err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Box>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'} color="sasol.blue">Create your account</Heading>
          <Text fontSize={'md'} color={'gray.600'}>
            Join the Sasol Training Attendance & Compliance System
          </Text>
        </Stack>
        
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        <Box
          rounded={'lg'}
          bg={'white'}
          boxShadow={'sm'}
          p={8}
        >
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <HStack>
                <FormControl 
                  id="firstName" 
                  isInvalid={formik.touched.firstName && formik.errors.firstName}
                >
                  <FormLabel>First Name</FormLabel>
                  <Input 
                    type="text" 
                    {...formik.getFieldProps('firstName')}
                  />
                  <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                </FormControl>
                
                <FormControl 
                  id="lastName"
                  isInvalid={formik.touched.lastName && formik.errors.lastName}
                >
                  <FormLabel>Last Name</FormLabel>
                  <Input 
                    type="text" 
                    {...formik.getFieldProps('lastName')}
                  />
                  <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
                </FormControl>
              </HStack>
              
              <FormControl 
                id="email" 
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <FormLabel>Email address</FormLabel>
                <Input 
                  type="email" 
                  {...formik.getFieldProps('email')}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              
              <FormControl 
                id="password"
                isInvalid={formik.touched.password && formik.errors.password}
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...formik.getFieldProps('password')}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword(show => !show)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              
              <FormControl 
                id="confirmPassword"
                isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
              >
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('confirmPassword')}
                />
                <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
              </FormControl>
              
              <Divider my={2} />
              
              <FormControl 
                id="role"
                isInvalid={formik.touched.role && formik.errors.role}
              >
                <FormLabel>Role</FormLabel>
                <Select
                  placeholder="Select role"
                  {...formik.getFieldProps('role')}
                >
                  <option value="participant">Participant</option>
                  <option value="vendor">Vendor</option>
                  <option value="facilitator">Facilitator</option>
                </Select>
                <FormErrorMessage>{formik.errors.role}</FormErrorMessage>
              </FormControl>
              
              {formik.values.role === 'vendor' && (
                <FormControl 
                  id="companyName"
                  isInvalid={formik.touched.companyName && formik.errors.companyName}
                >
                  <FormLabel>Company Name</FormLabel>
                  <Input 
                    type="text" 
                    {...formik.getFieldProps('companyName')}
                  />
                  <FormErrorMessage>{formik.errors.companyName}</FormErrorMessage>
                </FormControl>
              )}
              
              <FormControl 
                id="phoneNumber"
                isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
              >
                <FormLabel>Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon>+</InputLeftAddon>
                  <Input 
                    type="tel" 
                    placeholder="e.g. 27123456789"
                    {...formik.getFieldProps('phoneNumber')}
                  />
                </InputGroup>
                <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
              </FormControl>
              
              <Stack spacing={6} pt={2}>
                <Button
                  variant="primary"
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Creating Account..."
                  size="lg"
                >
                  Create Account
                </Button>
              </Stack>
              
              <Stack pt={4}>
                <Text align={'center'}>
                  Already a user? <Link as={RouterLink} to="/login" color={'sasol.blue'}>Sign in</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Box>
  );
};

export default RegisterPage;
