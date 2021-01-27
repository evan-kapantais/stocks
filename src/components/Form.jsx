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
			<h2 className='display-heading'>
				{!searchMatches ? 'Add New Stock' : 'Search Matches'}
			</h2>
			{!searchMatches && (
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
				</div>
			)}
			{searchMatches && (
				<div id='search-matches'>
					<div id='matches-container'>
						{/* <p className='note'>
							<b>!</b> Select an item to add to your watchlist
						</p> */}
						<ul id='matches-grid'>
							{searchMatches?.map((match) => (
								<SearchResult key={match['1. symbol']} match={match} />
							))}
						</ul>
						<button
							type='button'
							className='main-button'
							onClick={() => setSearchMatches(null)}
						>
							New Search
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Form;
