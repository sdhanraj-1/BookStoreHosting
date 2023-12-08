import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./searchbar.css";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
	setResults: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
	const [input, setInput] = useState<string>("");
	const navigate = useNavigate();

	const fetchData = async (value: string) => {
		try {
			// Remove leading and trailing white spaces and convert to lowercase
			const cleanedValue = value.trim().toLowerCase();

			// If the cleaned value is empty, don't perform the search
			if (!cleanedValue) {
				setResults([]);
				return;
			}

			// Construct a regular expression pattern for soft-matched search
			const pattern = cleanedValue
				.split("")
				.map((char) => (char === " " ? "\\s*" : char))
				.join(".*");

			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
					pattern
				)}`
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			const results = data.items || [];
			console.log(results);
			setResults(results);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleChange = (value: string) => {
		console.log("Selected value:", value);
		setInput(value);
		fetchData(value);
	};

	const handleClick = (value: string) => {
		console.log("Selected value:", value);
		fetchData(value);
		// Redirect to the search results page
		navigate(`/search-results?query=${encodeURIComponent(value)}`);
	};

	return (
		<div className='input-wrapper searchbar'>
			<FaSearch id='search-icon' onClick={() => handleClick(input)} />
			<input
				placeholder='Search books...'
				value={input}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange(e.target.value)
				}
			/>
		</div>
	);
};
