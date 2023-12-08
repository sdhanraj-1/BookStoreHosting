import { API_BASE_URL } from "../../config";
export const addToBookList = async (bookListId: string, bookData: Record<string, any>): Promise<void> => {

    const url = `${API_BASE_URL}/booklist/addbook/${bookListId}`;

    try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',

          },
          body: JSON.stringify(bookData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to add book to book list');
        }
    
        const result = await response.json();

        console.log('Book added successfully:', result);
        // Perform any other actions upon successful addition
      } catch (error) {

        console.error('Error adding book to book list:'), error;
        // Handle the error accordingly
        throw error; // Re-throw the error to allow handling it in the calling code
      }
    };