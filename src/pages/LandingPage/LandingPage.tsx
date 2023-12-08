// src/pages/LandingPage.tsx
import React from "react";
import "./LandingPage.css";
import Signup from "../signup/signup";
// import BookListPage from "../bookListPage/bookListPage";
const LandingPage: React.FC = () => {
	return (
		<div className='landing-page'>
			<div className='hero-section'>
				<h1>Welcome to Odyssey!</h1>
				<p>
					Where every book beckons, promising enchanting worlds and thrilling
					journeys.
				</p>
				<Signup />
			</div>
		</div>
	);
};

export default LandingPage;
