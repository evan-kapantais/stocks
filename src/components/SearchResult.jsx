import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const SearchResult = ({ match }) => {
	const [shareholder, setShareholder] = useState(false);
	const [amount, setAmount] = useState(0);
	const [price, setPrice] = useState(0);

	const { addToWatchlist } = useContext(GlobalContext);

	const matchSymbol = match['1. symbol'];
	const matchName = match['2. name'];
	const assetType = match['3. type'];

	const submitForm = (e) => {
		e.preventDefault();

		addToWatchlist(matchSymbol, matchName, assetType, amount, price);

		const details = e.currentTarget.parentNode;
		details.removeAttribute('open');
	};

	return (
		<li className='search-match-item'>
			<details>
				<summary>
					<p>
						<b>{matchSymbol}</b>
					</p>
					<p>{match['2. name']}</p>
				</summary>
				<form id='stockholder-form' onSubmit={submitForm}>
					<div className='checkbox-wrapper'>
						<input
							type='checkbox'
							name='shareholder'
							id='shareholder'
							checked={shareholder}
							onChange={() => setShareholder(!shareholder)}
						/>
						<label htmlFor='shareholder'>I am a shareholder</label>
					</div>
					{shareholder && (
						<div className='holder-group'>
							<div>
								<label htmlFor='amount'>Purchase Amount</label>
								<input
									type='number'
									name='amount'
									id='amount'
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
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									required
								/>
							</div>
						</div>
					)}
					<button type='submit' className='primary-button'>
						Add to {shareholder ? 'Portfolio' : 'Watchlist'}
					</button>
				</form>
			</details>
		</li>
	);
};

export default SearchResult;
