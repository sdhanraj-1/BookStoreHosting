import { API_BASE_URL } from "../../config";
export const deleteFromBookList = async (bookListId: string, BookId: string): Promise<void> => {

    const url = `${API_BASE_URL}/booklist/deletebook/${bookListId}`;

    try{

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                productID: BookId
            }),
        });

        if(!response.ok) {
            console.error(`Error deleting book ${BookId} from book list ${bookListId}:`, response.status);
        }

    } catch (error) {
        console.error('Error:', error);
    };
}