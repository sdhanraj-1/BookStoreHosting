import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./userstatus.css";
import { API_BASE_URL, COOKIE_USER } from "../../../config";
import { putData } from "../../data/fetchDataFromDatabase";
interface UserStatusProps {
	userId: string;
}
const UserStatus: React.FC<UserStatusProps> = ({ userId }) => {
	const cookies = new Cookies();
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [user, setUser] = useState<{ id: string; username: string } | null>(
		null
	);
	useEffect(() => {
		const jwtCookie = cookies.get(COOKIE_USER);
		if (!jwtCookie) {
			navigate("/login");
			return;
		}
		if (jwtCookie) {
			const decodedToken: { id: string; username: string } =
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
			console.log("no user");
		}
	}, [cookies, setUser]);

	const activateUser = async () => {
		const mainpage = "admin/activateuser";
		try {
			await putData(mainpage, userId, "PUT", {});
			// await fetch(`${API_BASE_URL}/admin/activateuser/${userId}`, {
			// 	method: "PUT",
			// });
		} catch (error) {
			console.error("Error activating user:", error);
		}
	};

	const deactivateUser = async () => {
		console.log(
			"deactivate:",
			`${API_BASE_URL}/admin/deactivateuser/${userId}`
		);
		const mainpage = "admin/deactivateuser";
		try {
			const response = await putData(mainpage, userId, "PUT", {});
			// const response = await fetch(
			// 	`${API_BASE_URL}/admin/deactivateuser/${userId}`,
			// 	{
			// 		method: "PUT",
			// 	}
			// );

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to deactivate user");
			}

			// Handle success or update UI as needed
		} catch (error: any) {
			console.error("Error deactivating user:", error.message);
			setError("Cannot deactivate admin user");
		}
	};

	const makeSiteManager = async () => {
		const mainpage = "admin/makemanager";

		try {
			await putData(mainpage, userId, "PUT", {});
			// await fetch(`${API_BASE_URL}/admin/makemanager/${userId}`, {
			// 	method: "PUT",
			// });
		} catch (error) {
			console.error("Error making user a site manager:", error);
		}
	};
	const closeError = () => {
		setError("");
	};

	return (
		<div className='user-actions-container'>
			<button className='action-button' onClick={activateUser}>
				<i className='bi bi-person-check'></i>
			</button>
			<button className='action-button' onClick={deactivateUser}>
				<i className='bi bi-person-dash'></i>
			</button>
			{error && (
				<div className='error-container'>
					<button className='close-button' onClick={closeError}>
						<i className='bi bi-x-lg'></i>
					</button>
					<span className='error-message'>{error}</span>
				</div>
			)}
			<button className='action-button' onClick={makeSiteManager}>
				<i className='bi bi-person-gear'></i>
			</button>
		</div>
	);
};
export default UserStatus;
