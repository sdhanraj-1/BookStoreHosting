// fetchGoogleBook.ts

export const fetchGoogleBook = async (bookId: string): Promise<any | null> => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch book data. Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching book data:', error);
      return null;
    }
  };
  