import { FC } from "react";
import "./searchresultlist.css";
import "../ViewDetails/ViewDetails";
import ViewDetails from "../ViewDetails/ViewDetails";
import CartButton from "../CartButton/CartButton";
import missingBookImage from "../../assets/missingbook.png";
import AddToBL from "../AddToBL/AddToBL";
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

interface SearchResultsListProps {
	results: Book[];
}

const SearchResultsList: FC<SearchResultsListProps> = ({ results }) => {
	return (
		<div className='results-list '>
			{results.map((book) => {
				const key = book.id;
				const thumbnail =
					book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;
				const thumbnailDisplay = thumbnail ? thumbnail : missingBookImage;
				const smallThumbnail = book.volumeInfo.imageLinks?.smallThumbnail;
				const smallThumbnailDisplay = smallThumbnail
					? smallThumbnail
					: missingBookImage;
				const authors = book.volumeInfo.authors;
				const title = book.volumeInfo.title || "No Title Available";
				const categories = book.volumeInfo.categories || "Unknown Category";
				const descr = book.volumeInfo.description;
				const firstAuthor =
					authors && authors.length > 0
						? authors[0].substring(0, 20)
						: "Unknown Author";
				const displaytitle = book.volumeInfo.title || "No Title";
				const price =
					(book.volumeInfo.saleInfo &&
						book.volumeInfo.saleInfo.retailPrice.amount) ||
					parseFloat((Math.random() * 99 + 1).toFixed(2));
				return (
					<div className='list-group-item' key={key}>
						<img
							src={smallThumbnailDisplay}
							alt={book.volumeInfo.title}
							className='img-thumbnail rounded float-left'
						/>
						<div className='title-author-search-list'>
							<p className='title-search-list'>{displaytitle}</p>
							<p className='author-search-list'>{firstAuthor}</p>
							<p className='category-search-list'>{categories}</p>
						</div>

						<div className='view-cart-search-list'>
							<ViewDetails
								bookId={key}
								authors={authors}
								categories={categories}
								title={title}
								descr={descr}
								img={smallThumbnail}
								productID={key}
								BookSelfLink={book.selfLink}
								imageLinks={{
									smallThumbnail: smallThumbnailDisplay,
									thumbnail: thumbnailDisplay,
								}}
								Qty={1}
								Price={price}
							/>
							<CartButton
								title={title}
								productID={book.id}
								BookSelfLink={book.selfLink}
								imageLinks={{
									smallThumbnail: smallThumbnailDisplay,
									thumbnail: thumbnailDisplay,
								}}
								Qty={1}
								Price={price}
							/>

							<AddToBL BookId={key} />
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default SearchResultsList;
