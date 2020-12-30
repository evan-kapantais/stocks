import { useState } from 'react';
import SearchResult from './SearchResult';

const Form = (props) => {
	const [searchMatches, setSearchMatches] = useState(null);
	const [inputValue, setInputValue] = useState('');

	const fetchOptions = (e) => {
		e.preventDefault();

		const endpoint = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${process.env.REACT_APP_API_KEY}`;

		fetch(endpoint)
			.then((results) => results.json())
			.then((matches) => {
				setSearchMatches(matches.bestMatches);
				setInputValue('');
			});
	};

	return (
		<div className='form-wrapper'>
			<div className='form-container'>
				<form id='search-form' onSubmit={fetchOptions}>
					<input
						type='search'
						placeholder='Search stock symbol...'
						id='search-stock-input'
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button type='submit' className='main-button'>
						Search
					</button>
				</form>
				{searchMatches && (
					<p className='note'>
						<b>!</b> Click an item to add it to your watchlist.
					</p>
				)}
				<ul id='search-matches'>
					{!searchMatches ||
						(searchMatches.length === 0 && <p>No matches found.</p>)}
					{searchMatches?.map((match) => (
						<SearchResult key={match['1. symbol']} match={match} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default Form;
