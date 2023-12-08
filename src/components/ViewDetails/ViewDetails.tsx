// ViewDetails.tsx
import { useNavigate } from "react-router-dom";
import "./ViewDetails.css";

interface ViewDetailsProps {
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
}

const ViewDetails: React.FC<ViewDetailsProps> = ({
	bookId,
	authors,
	categories,
	title,
	descr,
	img,
	productID,
	BookSelfLink,
	imageLinks,
	Qty,
	Price
}) => {
	const navigate = useNavigate();

	const handleViewDetailsClick = () => {
		// Redirect to the "/details" route;
		navigate(`/details/${bookId}`, {
			state: { authors, categories, title, descr, img, productID, BookSelfLink, imageLinks, Qty, Price },
		});
	};

	return (
		<button className='view-details-button' onClick={handleViewDetailsClick}>
			<i className='bi bi-three-dots-vertical'></i>
		</button>
	);
};

export default ViewDetails;
