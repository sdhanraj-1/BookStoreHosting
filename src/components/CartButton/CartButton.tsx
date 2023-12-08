// CartButton.tsx
import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import missingBookImage from "../../assets/missingbook.png";
import "./CartButton.css";
import { COOKIE_USER } from "../../../config";
import { putData } from "../../data/fetchDataFromDatabase";
interface CartButtonProps {
	onClick?: () => void;
	title: string;
	productID: string;
	BookSelfLink: string;
	imageLinks: { thumbnail: string; smallThumbnail: string };
	Qty: number;
	Price: number;
}

const CartButton: React.FC<CartButtonProps> = ({
	onClick,
	imageLinks,
	productID,
	BookSelfLink,
	title,
	Price,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const cookies = new Cookies();
	const [showNoUser, setShowNoUser] = useState(false);
	const [user, setUser] = useState<{ id: string; username: string } | null>(
		null
	);
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const jwtCookie = cookies.get(COOKIE_USER);

				if (jwtCookie) {
					const decodedToken: { id: string; username: string } =
						jwtDecode(jwtCookie);
					setUser(decodedToken);
				}
			} catch (error) {
				console.log("Error decoding the JWT token");
			}
		};

		fetchUserData();
	}, []);

	const handleClick = async () => {
		try {
			setIsLoading(true);
			const thumbnail = imageLinks.thumbnail;
			const thumbnailDisplay = thumbnail ? thumbnail : missingBookImage;
			const smallThumbnail = imageLinks.smallThumbnail;
			const smallThumbnailDisplay = smallThumbnail
				? smallThumbnail
				: missingBookImage;
			const cartItem = {
				customerid: user && user.id,
				title: title,
				productID: productID,
				BookSelfLink: BookSelfLink,
				imageLinks: {
					thumbnail: thumbnailDisplay,
					smallThumbnail: smallThumbnailDisplay,
				},
				Qty: 1,
				Price: Price,
			};
			console.log(cartItem);
			const mainpage = "cart/addrow";
			const response = await putData(mainpage, user?.id, "POST", cartItem);

			if (response.ok) {
				console.log("Item added to the cart successfully");
				if (onClick) {
					onClick();
				}
			} else {
				console.error("Error adding item to the cart");
				// Handle error or show a notification to the user
			}
		} catch (error) {
			console.error("Error adding item to the cart:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<button
			className={`cart-button ${isLoading ? "loading" : ""}`}
			onClick={() => {
				if (!user) {
					setShowNoUser(true);
					setTimeout(() => {
						setShowNoUser(false);
					}, 1000);
				} else {
					handleClick();
				}
			}}
		>
			{isLoading ? "Adding..." : showNoUser ? "No user" : <FaShoppingCart />}
		</button>
	);
};

export default CartButton;
