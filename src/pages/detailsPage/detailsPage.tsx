// DetailsPage.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./detailsPage.css";
import CartButton from "../../components/CartButton/CartButton";
import missingBookImage from "../../assets/missingbook.png";
import AddToBL from "../../components/AddToBL/AddToBL";
const DetailsPage: React.FC = () => {
	const { state } = useLocation();
	console.log(state);

	// Now you can use state.bookId and state.title in your component logic
	const titleDisplay = state?.title.substring(0, 30) || "No Title Available";
	const imgDisplay = state?.img || missingBookImage;
	const authorDisplay = state?.authors || "Authors Not Available";
	const categoriesDisplay = state?.categories || "Categories Not Available";
	const description =
		state?.descr ||
		"Dive into a captivating world of mystery and adventure as this riveting novel unfolds a tale of love, courage, and unexpected twists. With compelling characters and rich storytelling, this book takes readers on an unforgettable journey through vivid landscapes and unforeseen challenges. As the narrative weaves together, emotions run high, offering a rollercoaster of suspense and intrigue. A perfect blend of romance, suspense, and fantasy, this book promises an immersive experience that keeps readers eagerly turning each page. Prepare to be spellbound by a narrative that transcends genres, leaving an indelible mark on the imagination. Uncover a story where every chapter reveals a new layer of intrigue, making it a must-read for all book enthusiasts.";
	console.log("state bookself", state?.BookSelfLink);

	console.log("state imglink", state?.imageLinks);

	return (
		<>
			<Navbar />
			<h1 className='detailsPageHeadline'>
				Detail Page for <span>{titleDisplay}</span>
			</h1>
			<div className='detailspage'>
				<div className='detail-cart-button'>
					<CartButton
						title={state?.title}
						productID={state?.productID}
						BookSelfLink={state?.BookSelfLink}
						imageLinks={state?.imageLinks}
						Qty={state?.Qty}
						Price={state?.Price}
					/>
				</div>
				<div className='detail-bl-button'>
					<AddToBL BookId={state?.productID} />
				</div>

				<img src={imgDisplay} className='details-img'></img>
				<p className='details-author'>Authors: {authorDisplay}</p>
				<p className='details-category'>Categories: {categoriesDisplay}</p>

				<p className='details-headline'>Description:</p>
				<p className='details-descr'> {description}</p>
			</div>
		</>
	);
};

export default DetailsPage;
