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
  VStack,
  HStack,
  Divider,
  SlideFade,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Subtle pulse animation for the login button
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError('');
      
      try {
        const result = await login(values.email, values.password);
        
        if (result.success) {
          navigate('/dashboard');
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('An error occurred during login. Please try again.');
        console.error('Login error:', err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <SlideFade in={true} offsetY="20px">
      <VStack spacing={6} w="100%">
        <VStack spacing={2} align="center" w="100%">
          <Heading fontSize="2xl" fontWeight="bold" color="sasol.primary">
            Welcome Back
          </Heading>
          <Text fontSize="md" color="gray.600">
            Sign in to your account
          </Text>
        </VStack>
        
        {error && (
          <SlideFade in={true} offsetY="20px">
            <Alert status="error" borderRadius="md" w="100%">
              <AlertIcon />
              {error}
            </Alert>
          </SlideFade>
        )}
        
        <Box w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4} align="stretch">
              <SlideFade in={true} offsetY="10px" delay={0.1}>
                <FormControl 
                  id="email" 
                  isInvalid={formik.touched.email && formik.errors.email}
                >
                  <FormLabel fontWeight="medium">Email Address</FormLabel>
                  <Input 
                    type="email" 
                    size="md"
                    borderRadius="md"
                    borderColor="gray.300"
                    _hover={{ borderColor: "sasol.primary" }}
                    _focus={{ borderColor: "sasol.primary", boxShadow: "0 0 0 1px #0F3151" }}
                    {...formik.getFieldProps('email')}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
              </SlideFade>
              
              <SlideFade in={true} offsetY="10px" delay={0.2}>
                <FormControl 
                  id="password"
                  isInvalid={formik.touched.password && formik.errors.password}
                >
                  <FormLabel fontWeight="medium">Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      size="md"
                      borderRadius="md"
                      borderColor="gray.300"
                      _hover={{ borderColor: "sasol.primary" }}
                      _focus={{ borderColor: "sasol.primary", boxShadow: "0 0 0 1px #0F3151" }}
                      {...formik.getFieldProps('password')}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant="ghost"
                        color="gray.500"
                        onClick={() => setShowPassword((show) => !show)}
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
              </SlideFade>
              
              <SlideFade in={true} offsetY="10px" delay={0.3}>
                <HStack justify="flex-end">
                  <Link 
                    as={RouterLink} 
                    to="/forgot-password" 
                    fontSize="sm" 
                    color="sasol.primary" 
                    fontWeight="medium"
                    _hover={{ textDecoration: "none", opacity: 0.8 }}
                  >
                    Forgot password?
                  </Link>
                </HStack>
              </SlideFade>
              
              <SlideFade in={true} offsetY="10px" delay={0.4}>
                <Button
                  mt={4}
                  w="100%"
                  size="md"
                  bg="sasol.primary"
                  color="white"
                  fontWeight="medium"
                  _hover={{ 
                    opacity: 0.9,
                    animation: `${pulse} 2s ease-in-out infinite`,
                  }}
                  _active={{ opacity: 0.8 }}
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Signing in..."
                  transition="all 0.2s"
                >
                  Sign In
                </Button>
              </SlideFade>
              
              <Divider my={4} />
              
              <SlideFade in={true} offsetY="10px" delay={0.5}>
                <Text fontSize="sm" textAlign="center" color="gray.600">
                  Don't have an account?{' '}
                  <Link
                    as={RouterLink}
                    to="/register"
                    color="sasol.primary"
                    fontWeight="medium"
                    _hover={{ textDecoration: "none", opacity: 0.8 }}
                  >
                    Sign up
                  </Link>
                </Text>
              </SlideFade>
            </VStack>
          </form>
        </Box>
      </VStack>
    </SlideFade>
  );
};

export default LoginPage;
