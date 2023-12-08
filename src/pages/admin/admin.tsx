import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import UsersList from "../../components/user/userlist";
import Navbar from "../../components/navbar/navbar";
import "./admin.css";
import { COOKIE_USER } from "../../../config";
const Admin = () => {
	const cookies = new Cookies();
	const navigate = useNavigate();
	const { userId } = useParams<{ userId: string }>();
	const [showWarning, setShowWarning] = useState(false);
	const [showPage, setShowPage] = useState(true);
	const [user, setUser] = useState<{
		id: string;
		username: string;
		adminFlag: boolean;
	} | null>(null);
	useEffect(() => {
		const jwtCookie = cookies.get(COOKIE_USER);
		if (!jwtCookie) {
			navigate("/");
			return;
		}
		const decodedToken: { id: string; username: string; adminFlag: boolean } =
			jwtDecode(jwtCookie);

		if (decodedToken.id !== userId) {
			// console.log(useParams());
			setShowPage(false);
			setShowWarning(true);
			setTimeout(() => {
				navigate("/");
			}, 2000);
			return;
		}

		// Check adminFlag
		if (!decodedToken.adminFlag) {
			setShowPage(false);
			setShowWarning(true);
			setTimeout(() => {
				navigate("/");
			}, 2000);
			return;
		}

		if (jwtCookie) {
			const decodedToken: { id: string; username: string; adminFlag: boolean } =
				jwtDecode(jwtCookie);
			setUser((prevUser) => {
				// Ensure that setUser callback receives the latest state
				if (!prevUser || prevUser.id !== decodedToken.id) {
					return decodedToken;
				}
				return prevUser;
			});
		}
		if (!user) {
			console.log("come to admin page");
		}
	}, [cookies, setUser]);

	return (
		<>
			<Navbar />
			{showPage && <UsersList />}
			{showWarning && (
				<div className='warning'>
					<p>You don't have privilege to this page. Redirecting...</p>
				</div>
			)}
		</>
	);
};
export default Admin;
