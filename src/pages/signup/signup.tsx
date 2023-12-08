import React, { SyntheticEvent } from "react";
import Navbar from "../../components/navbar/navbar";
import "./signup.css";
import { AUTH_BASE_URL } from "../../../config";
const Signup: React.FC = () => {
	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		// reset errors
		setEmailError("");
		setPasswordError("");
		setUsernameError("");

		// get values
		const email = (e.target as any).email.value;
		const password = (e.target as any).password.value;
		const username = (e.target as any).username.value;

		try {
			const res = await fetch(`${AUTH_BASE_URL}/signup/`, {
				method: "POST",
				body: JSON.stringify({ email, password, username }),
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});
			const data = await res.json();
			console.log(data);
			if (data.errors) {
				setEmailError(data.errors.email);
				setPasswordError(data.errors.password);
				setUsernameError(data.errors.username);
			}
			if (data.user) {
				// Redirect or perform other actions upon successful signup
				window.location.assign("/");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const setEmailError = (error: string) => {
		const emailErrorElement = document.querySelector(".email.error");
		if (emailErrorElement) {
			emailErrorElement.textContent = error;
		}
	};

	const setPasswordError = (error: string) => {
		const passwordErrorElement = document.querySelector(".password.error");
		if (passwordErrorElement) {
			passwordErrorElement.textContent = error;
		}
	};

	const setUsernameError = (error: string) => {
		const usernameErrorElement = document.querySelector(".username.error");
		if (usernameErrorElement) {
			usernameErrorElement.textContent = error;
		}
	};

	return (
		<>
			<Navbar />
			<form className='signup' onSubmit={handleSubmit}>
				<h2>Sign up</h2>
				<label htmlFor='username'>User Name</label>
				<input type='text' name='username' id='username' required />
				<div className='username error'></div>
				<label htmlFor='email'>Email</label>
				<input type='text' name='email' id='email' required />
				<div className='email error'></div>
				<label htmlFor='password'>Password</label>
				<input type='password' name='password' id='password' required />
				<div className='password error'></div>
				<button type='submit'>Sign up</button>
			</form>
		</>
	);
};

export default Signup;
