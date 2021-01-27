import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const SearchResult = ({ match }) => {
	const [amount, setAmount] = useState(0);
	const [price, setPrice] = useState(0);

	const { addToWatchlist } = useContext(GlobalContext);

	const matchSymbol = match['1. symbol'];
	const matchName = match['2. name'];
	const assetType = match['3. type'];

	const submitForm = (e) => {
		e.preventDefault();
		addToWatchlist(matchSymbol, matchName, assetType, amount, price);
	};

	return (
		<li className='search-match-outer'>
			<div className='search-match-inner'>
				<div className='search-match-front'>
					<header>
						<h4 className='search-match-symbol'>{matchSymbol}</h4>
						<p className='search-match-name'>{matchName}</p>
					</header>
					<footer>
						<p>{assetType}</p>
					</footer>
				</div>
				<div className='search-match-back'>
					<form id='stockholder-form' onSubmit={submitForm}>
						<div className='holder-group'>
							<div>
								<label htmlFor='amount'>Amount Held</label>
								<input
									type='number'
									name='amount'
									id='amount'
									placeholder='Amount Held'
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									required
								/>
							</div>
							<div>
								<label htmlFor='price'>Purchase Price</label>
								<input
									type='number'
									step='0.1'
									name='price'
									id='price'
									placeholder='Purchase Price'
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									required
								/>
							</div>
						</div>
						<button type='submit' className='primary-button'>
							Add to {amount ? 'Portfolio' : 'Watchlist'}
						</button>
					</form>
				</div>
			</div>
		</li>
	);
};

export default SearchResult;
