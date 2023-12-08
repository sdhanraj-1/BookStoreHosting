// src/components/UsersList.tsx
import React, { useEffect, useState } from "react";
import UserStatus from "../userstatus/userstatus";
import Navbar from "../navbar/navbar";
import "./userlist.css";
import { API_BASE_URL } from "../../../config";
interface User {
	username: string;
	activeFlag: boolean;
	adminFlag: boolean;
	email: string;
	_id: string;
}

const UsersList: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				await fetch(`${API_BASE_URL}/admin/getusers`, {
					method: "GET",
					credentials: "include",
				})
					.then((res) => res.json())
					.then((data) => setUsers(data));
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, [users]);

	return (
		<>
			<Navbar />
			<div className='users-list-container'>
				<h1>Users List</h1>
				<ul className='users-list'>
					{users.map((user) => (
						<li key={user._id} className='user-item'>
							<div className='user-details'>
								<p className='username'>{user.username}</p>
								<p className='email'>{user.email}</p>
								<p className='admin-flag'>
									{user.adminFlag ? "Admin: True" : "Admin: False"}
								</p>
								<p className='active-flag'>
									{user.activeFlag ? "Active: True" : "Active: False"}
								</p>
							</div>
							<div className='user-status'>
								<UserStatus userId={user._id} />
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default UsersList;
