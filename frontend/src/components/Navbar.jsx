import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
  useNavigate,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../modules/fetch";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="50px"
      bg="#E8C9AD"
      color="white"
      borderBottom="30px solid white"
    >
      <Link to="/">
        <Flex align="center" mr={5} cursor="pointer">
          <Text fontSize="xl" fontWeight="bold" color="black">
            Book Store
          </Text>
        </Flex>
      </Link>
      <HStack>
        {isLogin && (
          <Link to="/newbook">
            <Button bg="#93C0F6">Create New Book</Button>
          </Link>
        )}
        {!isLogin ? (
          <Button
            bg="#62BCFD"
            _hover={{ bg: '#E6C0C0' }}
            onClick={onOpen}
            flex="1"
            mx="auto"
          >
            Login
          </Button>
        ) : (
          <Button
            bg="#E53737"
            color="white"
            _hover={{ bg: '#E6C0C0' }}
            onClick={() => {
              window.localStorage.removeItem("token");
              setIsLogin(false);
              navigate("/");
            }}
          >
            Logout
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const token = await loginUser(
                e.target.email.value,
                e.target.password.value
              );
              window.localStorage.setItem("token", token.token);
              setIsLogin(true);
              navigate("/");
              onClose();
            } catch (err) {
              toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <ModalOverlay />
          <ModalContent bg="#D2D1D1">
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    borderWidth="2px"
                    borderBottomWidth="4px"
                    borderColor="black"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    borderWidth="2px"
                    borderBottomWidth="4px"
                    borderColor="black"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" form="login-form" bg="#62BCFD" mr={3}>
                Login
              </Button>
              <Link to="/register" onClick={onClose}>
                <Button variant="ghost">
                  Doesn't Have Account? Click here
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
