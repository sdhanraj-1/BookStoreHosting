import { useLocation } from "react-router-dom";
import "./booksPage.css";
import Navbar from "../../components/navbar/navbar";
import Book from "../../components/Book/Book";
/* import React, { useEffect, useState } from "react"; */
interface Book {
	id: string;
	selfLink: string;
	volumeInfo: {
		title: string;
		authors: string[];
		description: string;
		imageLinks: { thumbnail: string; smallThumbnail: string };
		categories: string[];
	};
	saleInfo: {
		retailPrice: {
			amount: number;
		};
	};
}

interface BookProps {
	items?: Book[];
}

const BookList: React.FC<BookProps> = () => {
	const location = useLocation();
	const bookData = location.state?.data;
	const BookListTitle = location.state?.BookListTitle;
	const books: BookProps | undefined = bookData?.BookListObj;

	return (
		<>
			<Navbar />
			<div className='main-body'>
				<h1 className='main-title'>{BookListTitle}</h1>
				<article className='book-list'>
					{books?.items?.map((book) => {
						const bookId = book.id;
						const thumbnailDisplay = book.volumeInfo.imageLinks?.thumbnail;
						const smallThumbnailDisplay =
							book.volumeInfo.imageLinks?.smallThumbnail;
						const authors = book.volumeInfo.authors;
						const categories = book.volumeInfo.categories;
						const descr = book.volumeInfo.description;
						const displaytitle =
							book.volumeInfo.title.length > 25
								? `${book.volumeInfo.title.substring(0, 25)}...`
								: book.volumeInfo.title.substring(0, 25) || "No Title";
						const price =
							book.saleInfo?.retailPrice?.amount ||
							parseFloat((Math.random() * 99 + 1).toFixed(2));
						return (
							<Book
								key={book.id}
								bookId={bookId}
								authors={authors}
								categories={categories}
								title={displaytitle}
								descr={descr}
								img={thumbnailDisplay}
								productID={book.id}
								BookSelfLink={book.selfLink}
								imageLinks={{
									thumbnail: thumbnailDisplay,
									smallThumbnail: smallThumbnailDisplay,
								}}
								Qty={1}
								Price={price}
								BookListTitle={BookListTitle}
							/>
						);
					})}
				</article>
			</div>
		</>
	);
};

export default BookList;
