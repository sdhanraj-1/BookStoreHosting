import { FC } from "react";
import "./searchresultspage.css";
import "../ViewDetails/ViewDetails";
import Book from "../Book/Book";

interface Book {
	id: string;
	selfLink: string;
	volumeInfo: {
		authors: string[];
		categories: string[];
		title: string;
		description: string;
		imageLinks: { smallThumbnail: string; thumbnail: string };
		saleInfo: {
			retailPrice: {
				amount: number;
				currencyCode: string;
			};
		};
	};
}

interface SearchResultsPageProps {
	results: Book[];
}

const SearchResultsPage: FC<SearchResultsPageProps> = ({ results }) => {
	return (
		<>
			{results.map((book) => {
				const key = book.id;
				const thumbnail =
					book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;
				const smallThumbnail =
					book.volumeInfo.imageLinks &&
					book.volumeInfo.imageLinks.smallThumbnail;

				const authors = book.volumeInfo.authors;
				const title = book.volumeInfo.title || "No Title Available";
				const categories = book.volumeInfo.categories;
				const descr = book.volumeInfo.description;
				const price =
					(book.volumeInfo.saleInfo &&
						book.volumeInfo.saleInfo.retailPrice.amount) ||
					parseFloat((Math.random() * 99 + 1).toFixed(2));

				return (
					<div className='book-search-page' key={key}>
						<div className='card-search-page' key={key}>
							<Book
								BookListTitle=''
								key={key}
								bookId={key}
								authors={authors}
								categories={categories}
								title={title}
								descr={descr}
								img={smallThumbnail}
								productID={book.id}
								BookSelfLink={book.selfLink}
								imageLinks={{
									smallThumbnail: smallThumbnail,
									thumbnail: thumbnail,
								}}
								Qty={1}
								Price={price}
							/>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default SearchResultsPage;
