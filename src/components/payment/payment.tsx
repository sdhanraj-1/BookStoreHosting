import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./payment.css";
import { COOKIE_USER } from "../../../config";
import { putData } from "../../data/fetchDataFromDatabase";
const Payment = () => {
	const cookies = new Cookies();
	const navigate = useNavigate();
	const [user, setUser] = useState<{ id: string; username: string } | null>(
		null
	);

	const [cardNumber, setCardNumber] = useState("");
	const [cardHolder, setCardHolder] = useState("");
	const [expirationDate, setExpirationDate] = useState("");
	const [cvv, setCVV] = useState("");

	const [isCardNumberValid, setIsCardNumberValid] = useState(false);
	const [isCardHolderValid, setIsCardHolderValid] = useState(false);
	const [isExpirationDateValid, setIsExpirationDateValid] = useState(false);
	const [isCVVValid, setIsCVVValid] = useState(false);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const jwtCookie = cookies.get(COOKIE_USER);

				if (jwtCookie) {
					const decodedToken: { id: string; username: string } =
						jwtDecode(jwtCookie);
					setUser(decodedToken);
				}
			} catch (error) {
				console.log("Error decoding the JWT token");
			}
		};

		fetchUserData();
	}, []);
	const validateCardNumber = (value: string) => {
		const isValid = /^\d{16}$/.test(value);
		setIsCardNumberValid(isValid);
		return isValid;
	};

	const validateCardHolder = (value: string) => {
		const isValid = value.trim() !== "";
		setIsCardHolderValid(isValid);
		return isValid;
	};

	const validateExpirationDate = (value: string) => {
		const isValidFormat = /^\d{2}\/\d{2}$/.test(value);
		if (!isValidFormat) {
			setIsExpirationDateValid(false);
			return false;
		}
		const [month, year] = value.split("/");
		const isValidMonth =
			/^\d{2}$/.test(month) &&
			parseInt(month, 10) >= 1 &&
			parseInt(month, 10) <= 12;
		const isValidYear = /^\d{2}$/.test(year);
		const isValid = isValidMonth && isValidYear;
		setIsExpirationDateValid(isValid);
		return isValid;
	};
	const validateCVV = (value: string) => {
		const isValid = /^\d{3}$/.test(value);
		setIsCVVValid(isValid);
		return isValid;
	};

	const fetchPayment = async (event: React.FormEvent) => {
		event.preventDefault();

		// Validate inputs before making the payment request
		const isCardNumberValid = validateCardNumber(cardNumber);
		const isCardHolderValid = validateCardHolder(cardHolder);
		const isExpirationDateValid = validateExpirationDate(expirationDate);
		const isCVVValid = validateCVV(cvv);

		if (
			isCardNumberValid &&
			isCardHolderValid &&
			isExpirationDateValid &&
			isCVVValid
		) {
			const mainpage = "orders";
			const body = {
				cardNumber: cardNumber,
				cardHolder: cardHolder,
				expirationDate: expirationDate,
				cvv: cvv,
			};
			try {
				const response = await putData(mainpage, user?.id, "PUT", body);
				console.log("resonse:", response.ok);

				if (response.ok) {
					console.log("Payment information updated successfully");
					navigate(`/orders/${user?.id}`);
				}
			} catch (error) {
				console.error("Error updating payment information:", error);
			}
		} else {
			console.error("Invalid input. Please check your information.");
		}
	};

	return (
		<div className='form-container'>
			<form className='row g-3' onSubmit={fetchPayment}>
				<div className='col-md-6'>
					<label htmlFor='cardNumber' className='form-label'>
						Card Number
					</label>
					<input
						type='text'
						className={`form-control ${isCardNumberValid ? "" : "is-invalid"}`}
						id='cardNumber'
						value={cardNumber}
						onChange={(e) => setCardNumber(e.target.value)}
						placeholder='Enter 16-digit card number'
						required
					/>
					{!isCardNumberValid && (
						<div className='invalid-feedback'>
							Please enter a valid 16-digit card number.
						</div>
					)}
				</div>
				<div className='col-md-6'>
					<label htmlFor='cardHolder' className='form-label'>
						Card Holder
					</label>
					<input
						type='text'
						className={`form-control ${isCardHolderValid ? "" : "is-invalid"}`}
						id='cardHolder'
						value={cardHolder}
						onChange={(e) => setCardHolder(e.target.value)}
						placeholder='Enter card holder name'
						required
					/>
					{!isCardHolderValid && (
						<div className='invalid-feedback'>
							Please enter a valid card holder name.
						</div>
					)}
				</div>
				<div className='col-md-6'>
					<label htmlFor='expirationDate' className='form-label'>
						Expiration Date (MM/YY)
					</label>
					<input
						type='text'
						className={`form-control ${
							isExpirationDateValid ? "" : "is-invalid"
						}`}
						id='expirationDate'
						value={expirationDate}
						onChange={(e) => setExpirationDate(e.target.value)}
						placeholder='MM/YY'
						required
					/>
					{!isExpirationDateValid && (
						<div className='invalid-feedback'>
							Please enter a valid expiration date (MM/YY).
						</div>
					)}
				</div>
				<div className='col-md-6'>
					<label htmlFor='cvv' className='form-label'>
						CVV
					</label>
					<input
						type='text'
						className={`form-control ${isCVVValid ? "" : "is-invalid"}`}
						id='cvv'
						value={cvv}
						onChange={(e) => setCVV(e.target.value)}
						placeholder='Enter 3-digit CVV'
						required
					/>
					{!isCVVValid && (
						<div className='invalid-feedback'>
							Please enter a valid 3-digit CVV.
						</div>
					)}
				</div>
				<div className='col-12'>
					<button className='btn btn-primary' type='submit'>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default Payment;
