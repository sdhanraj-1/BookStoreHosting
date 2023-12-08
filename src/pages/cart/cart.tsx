import React, { useState, useEffect } from "react";
import Product from "../../components/product/product";
import Navbar from "../../components/navbar/navbar";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import Payment from "../../components/payment/payment";
import "./cart.css";
import { API_BASE_URL, COOKIE_USER } from "../../../config";
import { getData, putData } from "../../data/fetchDataFromDatabase";

const Cart: React.FC = () => {
	const cookies = new Cookies();
	const [user, setUser] = useState<{ id: string; username: string } | null>(
		null
	);
	const navigate = useNavigate();

	const { userId } = useParams<{ userId: string }>();
	const [showWarning, setShowWarning] = useState(false);
	const [showPage, setShowPage] = useState(true);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [products, setProducts] = useState<
		Array<{
			BookSelfLink: string;
			Qty: number;
			imageLinks: { thumbnail: string; smallThumbnail: string };
			productID: string;
			title: string;
			Price: number;
			_id: string;
		}>
	>([]);
	const [showPaymentModal, setShowPaymentModal] = useState(false);

	useEffect(() => {
		const jwtCookie = cookies.get(COOKIE_USER);
		if (!jwtCookie) {
			navigate("/");
			return;
		}
		const decodedToken: { id: string; username: string; adminFlag: boolean } =
			jwtDecode(jwtCookie);

		if (decodedToken.id !== userId) {
			setShowPage(false);
			setShowWarning(true);
			setTimeout(() => {
				navigate("/");
			}, 2000);
			return;
		}
		if (jwtCookie) {
			const decodedToken: { id: string; username: string } =
				jwtDecode(jwtCookie);
			setUser((prevUser) => {
				if (!prevUser || prevUser.id !== decodedToken.id) {
					return decodedToken;
				}
				return prevUser;
			});
		}
	}, [cookies, setUser, userId]);

	useEffect(() => {
		const fetchData = async () => {
			// if (user?.id) {
			// 	await fetch(`${API_BASE_URL}/cart/${user.id}`, {
			// 		method: "GET",
			// 		credentials: "include",
			// 	})
			// 		.then((res) => res.json())
			// 		.then((data) => {
			// 			setProducts(data.OrderLines);
			// 		});
			// }
			const mainpage = "cart";
			if (user?.id) {
				const data = await getData(mainpage, user.id);
				setProducts(data.OrderLines);
			}
		};
		fetchData();
	}, [user, products]);

	useEffect(() => {
		setTotalPrice(calculateTotalPrice(products));
	}, [products]);

	const calculateTotalPrice = (
		products: Array<{
			BookSelfLink: string;
			Qty: number;
			imageLinks: { thumbnail: string; smallThumbnail: string };
			productID: string;
			title: string;
			Price: number;
			_id: string;
		}>
	) => {
		return products
			.slice(1)
			.reduce((total, product) => total + product.Qty * product.Price, 0);
	};

	const handleBagCheckClick = async () => {
		console.log("order-payment:", `${API_BASE_URL}/orders/${user && user.id}`);
		const mainpage = "orders";

		try {
			const response = await putData(mainpage, user?.id, "POST", {});
			if (response.ok) {
				setShowPaymentModal(true);
			} else {
				console.error("Failed to create order:", response.statusText);
			}
		} catch (error) {
			console.error("Error creating order:", error);
		}
	};

	const closePayment = () => {
		setShowPaymentModal(false);
	};

	return (
		<>
			<Navbar />
			{showPage && (
				<>
					<h1 className='shoppingCartTitle'>My Shopping Cart</h1>
					{products.length < 2 ? (
						<p>Your cart is empty. Here are some books provided for you.</p>
					) : (
						products
							.slice(1)
							.map((product, index) => <Product {...product} key={index} />)
					)}
					<div className='cartPayment'>
						<li>
							<i className='bi bi-bag-check' onClick={handleBagCheckClick}></i>
						</li>
						<li>
							Amount of Product:<span>{products.length - 1}</span>
						</li>
						<li>
							Amount of Price:$<span>{totalPrice.toFixed(2)}</span>
						</li>
					</div>
				</>
			)}
			{showWarning && (
				<div className='warning'>
					<p>You don't have privilege to this page. Redirecting...</p>
				</div>
			)}
			{showPaymentModal && (
				<div className='paymentForm'>
					<button
						type='button'
						className='btn-close'
						aria-label='Close'
						onClick={closePayment}
					></button>
					<Payment />
				</div>
			)}
		</>
	);
};

export default Cart;
