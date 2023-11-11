import { instance } from '../axios/index';

// Function for register user endpoint
async function registerUser(name, email, password) {
  try {
    const response = await instance.post('/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// Function for login user endpoint
async function loginUser(email, password) {
  try {
    const response = await instance.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// Function for create book endpoint
async function createBook(formData) {
  try {
    const response = await instance.post('/books', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// Function for get all books endpoint
async function getAllBooks() {
  try {
    const response = await instance.get('/books');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// Function for edit book endpoint
async function editBook(id, title, author, publisher, year, pages) {
  try {
    const response = await instance.put(`/books/${id}`, { title, author, publisher, year, pages });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// Function for delete book endpoint
async function deleteBook(id) {
  try {
    const bookDetails = await getBookDetailById(id);
    console.log('Book details:', bookDetails);

    const response = await instance.delete(`/books/${id}`);
    console.log('Delete response:', response);

    if (bookDetails.image) {
      const imageResponse = await instance.delete(`/images/${bookDetails.image}`);
      console.log('Image delete response:', imageResponse);
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
}

async function getBookDetailById(id) {
  try {
    const response = await instance.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

export { registerUser, loginUser, createBook, getAllBooks, editBook, deleteBook,getBookDetailById };
