import React from "react";
import { useLocation } from "react-router-dom";
import ViewDetails from "../ViewDetails/ViewDetails";
import CartButton from "../CartButton/CartButton";
import "./book.css";
import missingBookImage from "../../assets/missingbook.png";
import AddToBL from "../AddToBL/AddToBL";
import DeleteFromBL from "../DeleteFromBL/DeleteFromBL";

interface BookProps {
	bookId: string;
	authors: string[];
	categories: string[];
	title: string;
	descr: string;
	img: string;
	productID: string;
	BookSelfLink: string;
	imageLinks: { thumbnail: string; smallThumbnail: string };
	Qty: number;
	Price: number;
	BookListTitle: string;
}

const Book: React.FC<BookProps> = ({
	bookId,
	authors,
	categories,
	title,
	img,
	descr,
	productID,
	BookSelfLink,
	imageLinks,
	Qty,
	Price,
	BookListTitle,
}) => {
	const titleDisply = title.substring(0, 30) || "No Title Available";
	const firstAuthor =
		authors && authors.length > 0
			? authors[0].substring(0, 20)
			: "Unknown Author";
	const imgDisplay = img ? img : missingBookImage;

	const location = useLocation();

	const isBookListPage = location.pathname.match(/^\/books\/cust-bl\d+$/);
	return (
		<article className='book'>
			<div className='book-details'>
				<p className='title'>{titleDisply}</p>
				<p className='authors'>{firstAuthor}</p>
				<div className='otherDetails'>
					<p className='categories'>{categories || "Unknown"}</p>
					<p className='price'>${Price}</p>
				</div>

				<ViewDetails
					bookId={bookId}
					authors={authors}
					categories={categories}
					title={title}
					descr={descr}
					img={img}
					productID={productID}
					BookSelfLink={BookSelfLink}
					imageLinks={imageLinks}
					Qty={Qty}
					Price={Price}
				/>
				<CartButton
					title={title}
					productID={productID}
					BookSelfLink={BookSelfLink}
					imageLinks={imageLinks}
					Qty={Qty}
					Price={Price}
				/>

				{/* If in a custom book list, don't render the AddToBL component, only 
					render DeleteFromBL in a custom book list
				*/}
				{!isBookListPage && <AddToBL BookId={bookId} />}

				{isBookListPage && (
					<DeleteFromBL BookId={bookId} BookListTitle={BookListTitle} />
				)}
			</div>

			<div className='overlay'></div>
			<img src={imgDisplay} alt={titleDisply} />
		</article>
	);
};

export default Book;
