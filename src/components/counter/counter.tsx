import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import "./counter.css";
import { COOKIE_USER } from "../../../config";
import { putData } from "../../data/fetchDataFromDatabase";
interface CounterProps {
	Qty: number;
	productID: string; // Use consistent naming
	userID: string; // Use consistent naming
}

const Counter: React.FC<CounterProps> = ({ Qty, productID }) => {
	const [qty, setQty] = useState<number>(Qty);
	const cookies = new Cookies();
	const [user, setUser] = useState<{ id: string; username: string } | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const jwtCookie = cookies.get(COOKIE_USER);
				if (jwtCookie) {
					const decodedToken: { id: string; username: string } =
						jwtDecode(jwtCookie);
					setUser(decodedToken);
				} else {
					setTimeout(() => {
						navigate("/login");
					}, 10000);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
				console.log(loading);
			}
		};

		fetchUserData();
	}, []);

	const increment = () => {
		const newCount = qty + 1;
		setQty(newCount);
		updateQuantityInDatabase(newCount);
	};

	const decrement = () => {
		if (qty > 1) {
			const newCount = qty - 1;
			setQty(newCount);
			updateQuantityInDatabase(newCount);
		}
		if (qty === 1 || 0) {
			deleteQuantityInDatabase();
		}
	};

	const updateQuantityInDatabase = async (newCount: number) => {
		const mainpage = "cart/updateorderrow";
		const body = { productID: productID, Qty: newCount };

		try {
			const response = await putData(mainpage, user?.id, "PUT", body);

			if (response.ok) {
				console.log("Quantity updated to the cart successfully");
			}
		} catch (error) {
			console.error("Error updating quantity:", error);
		}
	};

	const deleteQuantityInDatabase = async () => {
		const mainpage = "cart/deleterow";
		const body = { productID: productID };
		try {
			const response = await putData(mainpage, user?.id, "DELETE", body);
			if (response.ok) {
				console.log("item delete to the cart successfully");
			}
			console.log(
				"frontend delete body json: " +
					JSON.stringify({
						productID: productID,
						userID: user?.id,
					})
			);
		} catch (error) {
			console.error("Error deleting quantity:", error);
		}
	};

	return (
		<div className='counterButton'>
			<button className='buttonStyle' onClick={increment}>
				+
			</button>
			<p> {qty}</p>
			<button className='buttonStyle' onClick={decrement}>
				-
			</button>
		</div>
	);
};

export default Counter;
