import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteFromBookList } from "../../data/deleteFromBookList";
import "./DeleteFromBL.css";
import { fetchBooklistFromDatabase } from "../../data/fetchDataFromDatabase";

interface DeleteFromBLProps {
	BookId: string;
	BookListTitle: string;
}

const DeleteFromBL: React.FC<DeleteFromBLProps> = ({
	BookId,
	BookListTitle,
}) => {
	const navigate = useNavigate();

	const handleButtonClick = async () => {
		//Get current URL and retrieve the BookListID
		const currentURL = window.location.pathname;
		const BookListId = currentURL.substring(7);

		try {
			await deleteFromBookList(BookListId, BookId);

			//this will pull the booklist back again to refresh the page and remove the book from the list
			const data = await fetchBooklistFromDatabase(BookListId);

			navigate(`/books/${BookListId}`, { state: { data, BookListTitle } });
			//console.log( `Book ${BookId} successfully deleted from Book List ${BookListId}`);
		} catch (error) {
			console.error(
				`Failed to delete book ${BookId} from book list ${BookListId}`
			);
		}
	};

	return (
		<>
			<button className='delete-from-bl' onClick={handleButtonClick}>
				-
			</button>
		</>
	);
};

export default DeleteFromBL;
