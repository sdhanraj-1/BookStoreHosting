import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./navbar.css";
import { jwtDecode } from "jwt-decode";
import Search from "../../pages/searchpage/searchinput";
import { COOKIE_USER } from "../../../config";
interface User {
	id: string;
	username: string;
	activeFlag: boolean;
	adminFlag: boolean;
	email: string;
	_id: string;
}

const Navbar: React.FC = () => {
	const cookies = new Cookies();
	const [user, setUser] = useState<User | null>(null);
	const [showNavbar, setShowNavbar] = useState(true);
	const [currentCookie, setCurrentCookie] = useState<string | null>(null);

	useEffect(() => {
		let jwtCookie = cookies.get(COOKIE_USER);

		if (jwtCookie && jwtCookie !== currentCookie) {
			setCurrentCookie(jwtCookie);

			const decodedToken: User = jwtDecode(jwtCookie);

			setUser((prevUser) => {
				if (
					!prevUser ||
					prevUser.activeFlag !== decodedToken.activeFlag ||
					prevUser.adminFlag !== decodedToken.adminFlag
				) {
					return decodedToken;
				}
				return prevUser;
			});
		}
	}, [cookies, currentCookie, setUser]);

	const handleLogout = () => {
		// Clear the cookie first
		cookies.remove(COOKIE_USER);

		// Use the callback function with setState
		setUser((prevUser) => {
			if (prevUser !== null) {
				return null; // Set user to null only if it's not already null
			}
			return prevUser;
		});
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setShowNavbar(false);
			}
			if (window.scrollY === 0) {
				setShowNavbar(true);
			}
		};

		const handleMouseMovement = (event: MouseEvent) => {
			const mouseY = event.clientY;
			const threshold = 100;

			if (mouseY < threshold) {
				setShowNavbar(true);
			}
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("mousemove", handleMouseMovement);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("mousemove", handleMouseMovement);
		};
	}, [setShowNavbar]);

	/*
	no user:
		welcome, you haven't sign up
		log in
		sign up
	admin user:
		welcome, Admin {user.name}
		admin page
		log out
	activate user:
		welcome, {user.name}
		log out
		order
		cart
		private bookshelf
	nonactivate user:
		welcome, you don't allowed to show up
		log out
*/
	return (
		<nav className={showNavbar ? "scrolled" : "hidden"}>
			<ul>
				<li>
					<Link to='/'>
						<i className='bi bi-house'></i>
					</Link>
				</li>
				{!user ? (
					<li>
						<Link to='/about'>
							<i className='bi bi-bookmark-dash'></i>
						</Link>
					</li>
				) : null}
			</ul>
			<Search />
			<ul>
				{user ? (
					<>
						<li className='welcome'>
							{user.adminFlag
								? `Welcome, Administrator ${user.username}`
								: `Welcome, ${user.username}`}
						</li>

						{user.activeFlag ? (
							<>
								<li>
									<a href='/logout' onClick={handleLogout}>
										<i
											className='bi bi-box-arrow-right'
											aria-label='Logout'
										></i>
									</a>
								</li>
								{user.adminFlag ? (
									<li>
										<Link to={`/admin/${user.id}`}>
											<i className='bi bi-kanban' aria-label='Admin Page'></i>
										</Link>
									</li>
								) : (
									<>
										<li>
											<Link to={`/orders/${user.id}`}>
												<i className='bi bi-wallet' aria-label='Orders'></i>
											</Link>
										</li>
										<li>
											<a href={`/cart/${user.id}`}>
												<i className='bi bi-cart2 bi-lg' aria-label='Cart'></i>
											</a>
										</li>
										<li>
											<Link to='/customBookList'>
												<i
													className='bi bi-journals'
													aria-label='private bookshelf'
												></i>
											</Link>
										</li>
									</>
								)}
							</>
						) : (
							<>
								<li className='welcome'>
									You don't have permission to show up
								</li>
								<li>
									<a href='/logout' onClick={handleLogout}>
										<i
											className='bi bi-box-arrow-right'
											aria-label='Logout'
										></i>
									</a>
								</li>
							</>
						)}
					</>
				) : (
					<>
						<span className='welcome'>Welcome, you haven't signed up</span>
						<li>
							<Link to='/login'>
								<i className='bi bi-box-arrow-in-right' aria-label='Login'></i>
							</Link>
						</li>
						<li>
							<Link to='/signup'>
								<i className='bi bi-door-open' aria-label='Signup'></i>
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
