import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import SearchResult from './SearchResult';

const Form = () => {
	const [searchMatches, setSearchMatches] = useState(null);
	const [inputValue, setInputValue] = useState('');

	const { fetchSymbolMatches, setMessage } = useContext(GlobalContext);

	const fetchOptions = (e) => {
		e.preventDefault();

		const container = document.querySelector('.form-container');
		container.style.transform = 'translateY(25vh)';

		const abortController = new AbortController();
		const signal = abortController.signal;

		if (!inputValue) {
			setMessage('error', 'Please provide a search symbol');
			return;
		}

		setMessage('success', 'Searching for matches...');

		fetchSymbolMatches(inputValue, { signal }).then((matches) => {
			if (matches.bestMatches.length === 0) {
				setMessage('error', 'No matches found');
			} else {
				setMessage('success', 'Matches fetched.');
				setSearchMatches(matches.bestMatches);
			}
		});

		setInputValue('');
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
					{searchMatches?.map((match) => (
						<SearchResult key={match['1. symbol']} match={match} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default Form;
