// BookList.tsx
import React from "react";
import "./BookList.css";
import ViewBookList from "../ViewBookList/ViewBookList";

interface BookListProps {
	key: number;
	id: string;
	BookListTitle: string;
	imglink: string;
}

const BookList: React.FC<BookListProps> = ({ id, BookListTitle, imglink }) => {
	return (
		<div className='book-list2'>
			<h2 className='book-list-title'>{BookListTitle}</h2>
			<div className='view-button'>
				<ViewBookList id={id} BookListTitle={BookListTitle} />
			</div>
			<img
				className='d-block w-100 img-fluid background-img'
				src={imglink}
				alt='Background slide'
			/>
		</div>
	);
};

export default BookList;
