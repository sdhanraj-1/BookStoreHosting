// import React, { useState, useEffect } from "react";
// import Navbar from "../../components/navbar/navbar";
// import { useNavigate } from "react-router-dom";
// import Cookies from "universal-cookie";
// import { jwtDecode } from "jwt-decode";

// interface BookCollectionProps {
// 	onUserAuthenticated: (userId: string) => void;
// }

// const BookCollection: React.FC<BookCollectionProps> = ({
// 	onUserAuthenticated,
// }) => {
// 	const cookies = new Cookies();
// 	const [user, setUser] = useState<{ id: string } | null>(null);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);
// 	const [countdown, setCountdown] = useState(10); // Initial countdown value
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		const fetchUserData = async () => {
// 			try {
// 				// Check for the "userid" cookie
// 				const jwtCookie = cookies.get("userid");

// 				// Update the user state based on the presence of the cookie
// 				if (jwtCookie) {
// 					// Decode the token to get id
// 					const decodedToken: { id: string } = jwtDecode(jwtCookie);
// 					setUser(decodedToken);
// 					// Call the callback with the id
// 					onUserAuthenticated(decodedToken.id);
// 				} else {
// 					// If no JWT cookie, start the countdown
// 					const countdownInterval = setInterval(() => {
// 						setCountdown((prevCountdown) => prevCountdown - 1);
// 					}, 1000); // Update countdown every second

// 					// Set a timeout to redirect to login after 10 seconds
// 					setTimeout(() => {
// 						clearInterval(countdownInterval); // Clear the interval
// 						navigate("/login");
// 					}, 10000);
// 				}
// 			} catch (error) {
// 				setError("Error decoding the JWT token");
// 			} finally {
// 				// Set loading to false after the authentication check
// 				setLoading(false);
// 			}
// 		};

// 		fetchUserData(); // Invoke the function

// 		// Cleanup the interval on component unmount
// 		const countdownInterval = setInterval(() => {
// 			setCountdown((prevCountdown) => prevCountdown - 1);
// 		}, 1000); // Update countdown every second
// 		return () => {
// 			clearInterval(countdownInterval);
// 		};

// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [cookies, onUserAuthenticated, navigate]); // Include cookies, onUserAuthenticated, and navigate in the dependency array

// 	// Render the component content for authenticated users
// 	return (
// 		<>
// 			<Navbar />
// 			<div>
// 				{countdown > 0 ? (
// 					<p>
// 						Requiring user login. Redirecting to login page in
// 						<span> {countdown} </span>
// 						seconds...
// 					</p>
// 				) : (
// 					<p>Redirecting to login page...</p>
// 				)}
// 				{user ? (
// 					<p>Welcome to the private page, id: {user.id}</p>
// 				) : (
// 					<p>You need to log in to access this page.</p>
// 				)}
// 			</div>
// 		</>
// 	);
// };

// export default BookCollection;
