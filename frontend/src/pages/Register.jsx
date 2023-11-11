import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  useNavigate
} from "@chakra-ui/react";
import { registerUser } from "../modules/fetch";

const Register = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      return;
    }
    try {
      await registerUser(credentials.name, credentials.email, credentials.password);
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (e) {
      const errorMessage = e?.message || "An error occurred. Please try again.";
      toast({
        title: "An error occurred.",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setError(errorMessage);
    }
  };

  return (
    <Box w="full" py={4} px={24} mx="auto" mt={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Register
      </Text>

      <Box borderWidth="1px" borderRadius="lg" p={4}>
        <form onSubmit={handleSubmit}>
          {error && (
            <Box color="red.500" mb={4}>
              {error}
            </Box>
          )}

          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="name"
              name="name"
              placeholder="Enter your name"
              onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
            />
          </FormControl>

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
              placeholder="Enter a password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm your password"
              value={credentials.confirmPassword}
              onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
            />
            {credentials.password !== credentials.confirmPassword && (
              <Text fontSize="xs" color="red.500">
                The password does not match
              </Text>
            )}
          </FormControl>

          <Button mt={6} colorScheme="teal" type="submit">
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
