import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const SearchResult = ({ match }) => {
	const [shareholder, setShareholder] = useState(false);
	const [amount, setAmount] = useState(0);
	const [price, setPrice] = useState(0);

	const { stocks, addToWatchlist, addToPortfolio, setMessage } = useContext(
		GlobalContext
	);

	const matchSymbol = match['1. symbol'];

	const submitForm = (e) => {
		e.preventDefault();

		if (stocks.find((stock) => stock.symbol === matchSymbol)) {
			return setMessage('error', 'Stock already in your watchlist');
		}

		if (!shareholder) {
			addToWatchlist(matchSymbol);
		} else {
			if (amount <= 0) {
				return setMessage(
					'error',
					'Please enter a positive share mount OR add stock to watchlist instead'
				);
			} else if (price <= 0) {
				return setMessage('error', 'Please enter a positive purchase price');
			}

			addToPortfolio(matchSymbol, amount, price);
		}

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
					<div className='radio-group'>
						<div>
							<input
								type='radio'
								id='check'
								name='check'
								value='yes'
								checked={shareholder ? true : false}
								onChange={() => setShareholder(true)}
							/>
							<label htmlFor='yes'>I own {match['1. symbol']} stock</label>
						</div>
						<div>
							<input
								type='radio'
								id='check'
								name='check'
								value='yes'
								checked={shareholder ? false : true}
								onChange={() => setShareholder(false)}
							/>
							<label htmlFor='no'>
								I do NOT own {match['1. symbol']} stock
							</label>
						</div>
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
								/>
							</div>
						</div>
					)}
					<button type='submit'>
						Add to {shareholder ? 'Portfolio' : 'Watchlist'}
					</button>
				</form>
			</details>
		</li>
	);
};

export default SearchResult;
