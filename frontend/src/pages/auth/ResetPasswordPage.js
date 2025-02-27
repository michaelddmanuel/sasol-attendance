import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  Icon,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FiCheck } from 'react-icons/fi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const boxBgColor = 'white';

  // Validate token on component mount
  useEffect(() => {
    const validateToken = async () => {
      try {
        setIsValidating(true);
        const response = await api.get(`/api/auth/reset-password/validate/${token}`);
        setIsTokenValid(true);
      } catch (err) {
        console.error('Token validation error:', err);
        setIsTokenValid(false);
        setError('The password reset link is invalid or has expired. Please request a new one.');
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  // Form validation schema
  const validationSchema = Yup.object({
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
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError('');
      
      try {
        const response = await api.post(`/api/auth/reset-password/${token}`, {
          password: values.password
        });
        
        setSuccess(true);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Your password has been reset successfully. You can now log in with your new password.' 
            } 
          });
        }, 3000);
        
      } catch (err) {
        console.error('Password reset error:', err);
        setError('Failed to reset password. Please try again or request a new reset link.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (isValidating) {
    return (
      <Center minH="300px">
        <Stack spacing={4} align="center">
          <Spinner size="xl" color="sasol.blue" />
          <Text>Validating your password reset link...</Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Box>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'} color="sasol.blue">Create new password</Heading>
          <Text fontSize={'md'} color={'gray.600'}>
            Enter a new password for your account
          </Text>
        </Stack>
        
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        {!isTokenValid ? (
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            borderRadius="md"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Invalid or Expired Link
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              The password reset link is invalid or has expired. Please request a new one.
            </AlertDescription>
            <Button
              as={RouterLink}
              to="/forgot-password"
              colorScheme="blue"
              mt={4}
            >
              Request New Link
            </Button>
          </Alert>
        ) : success ? (
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            borderRadius="md"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Password Reset Successful
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Your password has been reset successfully. You will be redirected to the login page in a moment.
            </AlertDescription>
            <Link as={RouterLink} to="/login" color="sasol.blue" mt={4}>
              Continue to Login
            </Link>
          </Alert>
        ) : (
          <Box
            rounded={'lg'}
            bg={boxBgColor}
            boxShadow={'sm'}
            p={8}
          >
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={4}>
                <FormControl 
                  id="password"
                  isInvalid={formik.touched.password && formik.errors.password}
                >
                  <FormLabel>New Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...formik.getFieldProps('password')}
                    />
                    <InputRightElement h={'full'}>
                      <IconButton
                        variant={'ghost'}
                        onClick={() => setShowPassword(show => !show)}
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                
                <FormControl 
                  id="confirmPassword"
                  isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                >
                  <FormLabel>Confirm New Password</FormLabel>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...formik.getFieldProps('confirmPassword')}
                  />
                  <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
                </FormControl>
                
                <Stack spacing={6} pt={2}>
                  <Button
                    variant="primary"
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Resetting..."
                    leftIcon={<Icon as={FiCheck} />}
                  >
                    Reset Password
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default ResetPasswordPage;
