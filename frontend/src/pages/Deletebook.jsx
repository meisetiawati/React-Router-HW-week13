import { Box, Text, Button, VStack, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBook, getBookDetailById } from "../modules/fetch";

export default function DeleteBookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      console.log("Deleting book with ID:", id);
      await deleteBook(id);
      console.log("Book deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/books/${id}`);
  };

  return (
    <VStack>
      {book ? (
        <>
          <Text>Are you sure you want to delete this book?</Text>
          <Box>
            {Object.entries(book).map(([key, value]) => (
              <Text key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </Text>
            ))}
          </Box>
          <VStack spacing={4}>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </VStack>
        </>
      ) : (
        <Center h="300px">
          <Text>Book not found</Text>
        </Center>
      )}
    </VStack>
  );
}
