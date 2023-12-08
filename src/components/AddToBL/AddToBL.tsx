import React, { useState, useEffect } from "react";
import DropdownBL from "./DropdownBL";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import "./AddtoBL.css";
import { COOKIE_USER } from "../../../config";
interface AddToBLProps {
	BookId: string;
}

const AddToBL: React.FC<AddToBLProps> = ({ BookId }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const cookies = new Cookies();
	const handleButtonClick = () => {
		setShowDropdown(!showDropdown);
	};
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
				if (!jwtCookie) {
					setShowNoUser(true);
					setTimeout(() => {
						setShowNoUser(false);
					}, 1000);
				}
			} catch (error) {
				console.log("Error decoding the JWT token");
			}
		};

		fetchUserData();
	}, []);
	const closeDropdown = () => {
		setShowDropdown(false);
	};

	return (
		<div className='dropdown'>
			<button
				className='add-to-bl'
				onClick={() => {
					if (!user) {
						setShowNoUser(true);
						setTimeout(() => {
							setShowNoUser(false);
						}, 1000);
					} else {
						handleButtonClick();
					}
				}}
			>
				<i className='bi bi-plus'></i>

				{showNoUser
					? "No user"
					: showDropdown && (
							<div className='dropdownList'>
								<button
									className='close-dropdown'
									onClick={closeDropdown}
								></button>
								<DropdownBL BookId={BookId} />
							</div>
					  )}
			</button>
		</div>
	);
};

export default AddToBL;
