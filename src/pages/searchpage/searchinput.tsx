import { useState, useEffect } from "react";
import { SearchBar } from "../../components/searchbar/searchbar";
import SearchResultsList from "../../components/searchresultlist/searchresultlist";
import "./searchinput.css";
function Search() {
	const [results, setResults] = useState<any[]>([]);
	const [showResults, setShowResults] = useState(false);
	const [isSearchResultPage, setIsSearchResultPage] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const closeResults = () => {
		setShowResults(false);
		setSearchValue("");
	};

	useEffect(() => {
		// Check if the current URL contains "search-result"
		console.log(searchValue);

		setIsSearchResultPage(window.location.href.includes("search-result"));
	}, []);

	return (
		<>
			<SearchBar
				setResults={(results) => {
					setResults(results);
					setShowResults(results.length > 0);
				}}
			/>

			{showResults && !isSearchResultPage && (
				<div className='search-results-container'>
					<button
						type='button'
						className='btn-close'
						aria-label='Close'
						onClick={closeResults}
					></button>
					<SearchResultsList results={results} />
				</div>
			)}
		</>
	);
}

export default Search;
