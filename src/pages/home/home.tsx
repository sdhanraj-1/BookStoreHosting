// import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import BookListPage from "../bookListPage/bookListPage";
// main.ts (or any other file where you want to log the values)
// import { APP_PORT, API_BASE_URL, COOKIE_USER } from "../../../config";

// console.log("APP_PORT:", APP_PORT);
// console.log("API_BASE_URL:", API_BASE_URL);
// console.log("COOKIE_USER:", COOKIE_USER);

// import Cookies from "universal-cookie";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// interface User {
// 	id: string;
// 	username: string;
// 	activeFlag: boolean;
// 	adminFlag: boolean;
// 	email: string;
// 	_id: string;
// }
const Home: React.FC = () => {
	// const cookies = new Cookies();
	// const [user, setUser] = useState<User | null>(null);
	// const [currentCookie, setCurrentCookie] = useState<string | null>(null);
	// const navigate = useNavigate();
	// useEffect(() => {
	// 	let jwtCookie = cookies.get("userid");

	// 	if (jwtCookie && jwtCookie !== currentCookie) {
	// 		setCurrentCookie(jwtCookie);

	// 		const decodedToken: User = jwtDecode(jwtCookie);

	// 		setUser((prevUser) => {
	// 			if (
	// 				!prevUser ||
	// 				prevUser.activeFlag !== decodedToken.activeFlag ||
	// 				prevUser.adminFlag !== decodedToken.adminFlag
	// 			) {
	// 				return decodedToken;
	// 			}
	// 			return prevUser;
	// 		});
	// 	}
	// 	// if (!user && currentCookie) {
	// 	// 	navigate("/about");
	// 	// }
	// }, [cookies, currentCookie, setUser]);
	return (
		<>
			<Navbar />
			<BookListPage />
		</>
	);
};

export default Home;
