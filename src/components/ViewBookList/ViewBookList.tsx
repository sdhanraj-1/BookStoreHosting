// ViewBookList.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ViewBookList.css";
import { fetchBooklistFromDatabase } from "../../data/fetchDataFromDatabase";

interface ViewBookListProps {
	id: string;
	BookListTitle: string;
}

const ViewBookList: React.FC<ViewBookListProps> = ({ id, BookListTitle }) => {
	const navigate = useNavigate();

	const handleViewBookListClick = async () => {
		//this will execute the fetchDataFromDatabase which queries the server
		try {
			const data = await fetchBooklistFromDatabase(id);
			//console.log(id);

			//navigates to booksPage and brings the fetched data
			navigate(`/books/${id}`, { state: { data, BookListTitle } });
			//console.log("VIEW BOOKBLIST BTN", data.BookListObj);
		} catch (error) {
			console.error("Error fetching data:", error);
			//navigate('/books');
			//console.log(id);
		}
	};

	return (
		<button className='view-book-list-button' onClick={handleViewBookListClick}>
			View
		</button>
	);
};

export default ViewBookList;
