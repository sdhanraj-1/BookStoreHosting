// src/components/Product.tsx
import React from "react";
import Counter from "../counter/counter";
import "./product.css";
import missingBookImage from "../../assets/missingbook.png";

interface ProductProps {
	BookSelfLink: string;
	Qty: number;
	imageLinks: { smallThumbnail: string; thumbnail: string };
	productID: string;
	title: string;
	Price: number;
	_id: string;
}

const Product: React.FC<ProductProps> = ({
	Qty,
	imageLinks,
	productID,
	Price,
	title,
	_id,
}) => {
	if (Qty === 0) {
		return null;
	}
	const titleDisply = title.substring(0, 30) || "No Title Available";
	const imgDisplay = imageLinks?.thumbnail
		? imageLinks.thumbnail
		: missingBookImage;
	return (
		<div className='product'>
			<div className='product-details'>
				<p className='title'>{titleDisply}</p>
				<Counter Qty={Qty} productID={productID} userID={_id} />
				<p>
					unit price: <span>${Price}</span>
				</p>
			</div>
			<div className='overlay'></div>
			<img src={imgDisplay} className='rounded float-start' alt={titleDisply} />
		</div>
	);
};

export default Product;
