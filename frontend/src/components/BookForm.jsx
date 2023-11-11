import { Button, FormControl, FormLabel, Image, Input, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createBook, editBook, deleteBook } from "../modules/fetch"; 

export default function BookForm({ bookData, isEdit, onDelete }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(bookData?.image ? `http://localhost:8000/${bookData.image}` : null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedImage && !isEdit) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData(event.target);

    try {
      if (isEdit) {
        await editBook(bookData.id, ...formData.values());
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await createBook(formData);
        event.target.reset();
        setSelectedImage(null);
        toast({
          title: "Success",
          description: "Book created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  async function handleDelete() {
    try {
      await deleteBook(bookData.id);
      toast({
        title: "Success",
        description: "Book deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onDelete && onDelete(); 
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData.image}`);
    }
  }, [bookData]);

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} bg="#EDEAF1" w="600px" h="1050px" p="6" borderRadius="10px" marginBottom="30px">
        <FormControl>
          <FormLabel fontWeight="bold">Title</FormLabel>
          <Input name="title" required defaultValue={bookData?.title} borderWidth="2px" borderBottomWidth="4px" borderColor="black" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold">Author</FormLabel>
          <Input name="author" required defaultValue={bookData?.author} borderWidth="2px" borderBottomWidth="4px" borderColor="black" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold">Publisher</FormLabel>
          <Input name="publisher" required defaultValue={bookData?.publisher} borderWidth="2px" borderBottomWidth="4px" borderColor="black" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold">Year</FormLabel>
          <Input name="year" type="number" required defaultValue={bookData?.year} borderWidth="2px" borderBottomWidth="4px" borderColor="black" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold">Pages</FormLabel>
          <Input name="pages" type="number" required defaultValue={bookData?.pages} borderWidth="2px" borderBottomWidth="4px" borderColor="black" />
        </FormControl>
        {selectedImage && <Image w={64} src={selectedImage} alt="Selected Image" />}
        {!bookData?.image && (
          <FormControl>
            <FormLabel fontWeight="bold">Image</FormLabel>
            <Input
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setSelectedImage(URL.createObjectURL(file));
              }}
              borderWidth="2px"
              borderBottomWidth="4px"
              borderColor="black"
            />
          </FormControl>
        )}
        <Button bg="#62BCFD" type="submit">
          {isEdit ? "Edit Book" : "Create Book"}
        </Button>
        {isEdit && (
          <Button colorScheme="red" onClick={handleDelete}>
            Delete Book
          </Button>
        )}
      </VStack>
    </form>
  );
}
