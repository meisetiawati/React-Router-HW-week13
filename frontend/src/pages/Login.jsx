import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import { loginUser } from '../modules/fetch';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(credentials.email, credentials.password);
      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (e) {
      const errorMessage = e?.message || 'Login failed. Please check your credentials.';
      toast({
        title: 'Login Failed',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setError(errorMessage);
    }
  };

  return (
    <Box w="full" py={4} px={24} mx="auto" mt={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Login
      </Text>

      <Box borderWidth="1px" borderRadius="lg" p={4}>
        <form onSubmit={handleSubmit}>
          {error && (
            <Box color="red.500" mb={4}>
              {error}
            </Box>
          )}

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </FormControl>

          <Button mt={6} colorScheme="teal" type="submit">
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
