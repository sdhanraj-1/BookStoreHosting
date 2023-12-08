import React, { SyntheticEvent } from "react";
import "./login.css";
import Navbar from "../../components/navbar/navbar";
import { AUTH_BASE_URL } from "../../../config";
// import { putData } from "../../data/fetchDataFromDatabase";

const Login: React.FC = () => {
	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		// reset errors
		setEmailError("");
		setPasswordError("");

		// get values
		const email = (e.target as any).email.value;
		const password = (e.target as any).password.value;

		try {
			const res = await fetch(`${AUTH_BASE_URL}/login/`, {
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});
			// console.log("client", JSON.stringify({ email, password }));

			// const mainpage = "login";
			// const body = { email, password };
			// const res = await putData(mainpage, undefined, "POST", body, true);
			const data = await res.json();
			// console.log(data);
			if (data.errors) {
				setEmailError(data.errors.email);
				setPasswordError(data.errors.password);
			}
			if (data.user) {
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

	return (
		<>
			<Navbar />
			{/* <div>
				<h1>{message}</h1>
			</div> */}

			<form className='login' onSubmit={handleSubmit}>
				<h2>Login</h2>
				<label htmlFor='email'>Email</label>
				<input type='text' name='email' />
				<div className='email error'></div>
				<label htmlFor='password'>Password</label>
				<input type='password' name='password' />
				<div className='password error'></div>
				<button type='submit'>login</button>
			</form>
		</>
	);
};

export default Login;
