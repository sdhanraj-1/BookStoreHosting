import { useState, useEffect } from "react";
import SearchResultsPage from "../../components/searchresultspage/searchresultspage";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./searchpage.css";
function SearchPage() {
	const location = useLocation();
	const [results, setResults] = useState<any[]>([]);
	const query = new URLSearchParams(location.search).get("query");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
						query || ""
					)}&maxResults=${40}`
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

		if (query) {
			fetchData();
		}
	}, [query]);
	console.log("query:", query);

	return (
		<>
			<Navbar />
			<h1 className='searchResultsTitle'>
				Search Results for <span>{query}</span>
			</h1>
			<div>
				<SearchResultsPage results={results} />
			</div>
			<p className='ending'>Ending...</p>
		</>
	);
}

export default SearchPage;
