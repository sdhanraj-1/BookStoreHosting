import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import "./orders.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { COOKIE_USER } from "../../../config";
import { API_BASE_URL } from "../../../config";
// import { getData } from "../../data/fetchDataFromDatabase";
const Orders = () => {
	const cookies = new Cookies();
	const navigate = useNavigate();
	const [user, setUser] = useState<{ id: string; username: string } | null>(
		null
	);
	const [showWarning, setShowWarning] = useState(false);
	const { userId } = useParams<{ userId: string }>();
	const [orders, setOrders] = useState<
		Array<{
			customerid: string;
			payment: {
				cardHolder: string;
				cardNumber: string;
				cvv: string;
				expirationDate: string;
				paymentDate: string;
			};
			paymentStatus: string;

			OrderLines: {
				BookSelfLink: string;
				Qty: number;
				imageLinks: { thumbnail: string; smallThumbnail: string };
				productID: string;
				title: string;
				Price: number;
				_id: string;
			}[];
		}>
	>([]);

	useEffect(() => {
		const jwtCookie = cookies.get(COOKIE_USER);
		if (!jwtCookie) {
			navigate("/");
			setShowWarning(true);
			setTimeout(() => {
				navigate("/");
			}, 2000);
			return;
		}
		const decodedToken: { id: string; username: string; adminFlag: boolean } =
			jwtDecode(jwtCookie);

		if (decodedToken.id !== userId) {
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
		const fetchOrders = async () => {
			try {
				await fetch(`${API_BASE_URL}/orders/${user?.id}`, {
					method: "GET",
					credentials: "include",
				})
					.then((res) => res.json())
					.then((data) => setOrders(data));
				// const mainpage = "orders";
				// const orders = await getData(mainpage, user?.id).then((data) =>
				// 	setOrders(data.OrderLines)
				// );
				// // setOrders(data.OrderLines);
				console.log("orders:", orders);
			} catch (error) {
				console.error("Error fetching orders:", error);
			}
		};
		if (user?.id) {
			fetchOrders();
		}
	}, [user?.id]);

	console.log(orders);
	const createTime = (dateString: string): string => {
		const formattedDate = new Date(dateString);

		try {
			const formattedString = formattedDate.toLocaleString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				timeZoneName: "short",
			});
			return formattedString;
		} catch (error) {
			console.error("Error formatting date:", error);
			return ""; // Return an empty string or handle the error as needed
		}
	};
	return (
		<>
			<Navbar />
			<div className='orderPage'>
				<div className='orderTitle'>My Orders</div>
				{showWarning && (
					<div className='warning'>
						<p>You don't have privilege to this page. Redirecting...</p>
					</div>
				)}
				{orders.length > 0 ? (
					orders.map((order, index) => (
						<div className='order' key={index}>
							<p>
								Status: <span>{order.paymentStatus}</span>
							</p>
							<p>
								Payment Time:
								<span>{createTime(order.payment.paymentDate)}</span>
							</p>
							{order.OrderLines.slice(1).map((orderline, index) => (
								<div className='orderLine' key={index}>
									<div className='order-details'>
										<h6>{orderline.title.substring(0, 30)}</h6>
										<p className='qty'>
											Quantity:
											<span>{orderline.Qty}</span>
										</p>
										<p className='price'>
											Unit Price:
											<span>{orderline.Price}</span>
										</p>
									</div>
									<div className='overlay'></div>
									<img src={orderline.imageLinks?.thumbnail} alt='' />
								</div>
							))}
						</div>
					))
				) : (
					<p>No orders available.</p>
				)}
			</div>
		</>
	);
};

export default Orders;
