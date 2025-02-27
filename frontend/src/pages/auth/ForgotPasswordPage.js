import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
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
  FormErrorMessage,
  Icon,
} from '@chakra-ui/react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const boxBgColor = 'white';

  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError('');
      
      try {
        const response = await api.post('/api/auth/forgot-password', {
          email: values.email
        });
        
        setSuccess(true);
      } catch (err) {
        // For security reasons, we don't want to reveal if an email exists in our system
        // So we show a success message even if the email doesn't exist
        setSuccess(true);
        console.error('Forgot password error:', err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Box>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'} color="sasol.blue">Reset your password</Heading>
          <Text fontSize={'md'} color={'gray.600'}>
            Enter your email address and we'll send you a link to reset your password
          </Text>
        </Stack>
        
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        {success ? (
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
              Password Reset Email Sent
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              We've sent password reset instructions to your email address. Please check your inbox (and spam folder) and follow the instructions.
            </AlertDescription>
            <Link as={RouterLink} to="/login" color="sasol.blue" mt={4}>
              Back to Login
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
                
                <Stack spacing={6} pt={2}>
                  <Button
                    variant="primary"
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Sending..."
                    leftIcon={<Icon as={FiMail} />}
                  >
                    Send Reset Link
                  </Button>
                  <Button
                    as={RouterLink}
                    to="/login"
                    variant="ghost"
                    leftIcon={<Icon as={FiArrowLeft} />}
                    size="sm"
                  >
                    Back to Login
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

export default ForgotPasswordPage;
