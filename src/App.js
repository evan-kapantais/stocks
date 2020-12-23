import { useState } from 'react';
import './App.scss';
import Stock from './components/Stock';
import Form from './components/Form';
import { getStock } from './data/stockData';
import placeholderData from './utils/placeholderData';
import StockDetails from './components/StockDetais';
import StockPreview from './components/StockPreview';

function App() {
	const [stocks, setStocks] = useState([...placeholderData]);

	// Form state
	const [value, setValue] = useState('');
	const [message, setMessage] = useState('');

	// Content control
	const [shownPanel, setShownPanel] = useState('form');
	const [isWatchlistShown, setIsWatchlistShown] = useState(true);
	const [isPortfolioShown, setIsPortfolioShown] = useState(true);
	const [stockPreview, setStockPreview] = useState(null);
	const [stockToShow, setStockToShow] = useState(null);

	const showStockDetails = (stock) => {
		setShownPanel('details');
		setStockToShow(stock);
	};

	const showStockPreview = (stock) => {
		console.log(stock);
		setStockPreview(stock);
		setShownPanel('preview');
	};

	const fetchSymbol = (e) => {
		e.preventDefault();

		if (!value) {
			setMessage('Error: please provide a search symbol.');
			return;
		}

		getStock(value)
			.then((stock) => {
				setStocks([...stocks, stock]);
				showStockPreview(stock);
			})
			.catch((error) => console.error(error));

		setMessage('');
		setValue('');
	};

	return (
		<div className='App'>
			<aside>
				<div id='portfolio'>
					<header>
						<h2>Portfolio</h2>
						<button
							type='button'
							className='toggle-list'
							onClick={() => setIsPortfolioShown(!isPortfolioShown)}
						>
							{isPortfolioShown ? 'Hide Portfolio' : 'Show Portfolio'}
						</button>
						<ul
							style={{ display: `${isPortfolioShown ? 'block' : 'none'}` }}
						></ul>
					</header>
				</div>
				<div id='watchlist'>
					<header>
						<h2>Watchlist</h2>
						<button
							type='button'
							className='toggle-list'
							onClick={() => setIsWatchlistShown(!isWatchlistShown)}
						>
							{isWatchlistShown ? 'Hide Watchlist' : 'Show Watchlist'}
						</button>
					</header>
					<ul style={{ display: `${isWatchlistShown ? 'block' : 'none'}` }}>
						{!stocks && <p>Loading data...</p>}
						{stocks &&
							stocks.map((stock) => (
								<Stock
									key={stock.symbol}
									stock={stock}
									showStockDetais={showStockDetails}
								/>
							))}
					</ul>
				</div>
				<div className='add-stock-wrapper'>
					<button
						type='button'
						className='add-stock-button'
						onClick={() => setShownPanel('form')}
					>
						+
					</button>
				</div>
			</aside>
			<section>
				{shownPanel === 'details' ? (
					<StockDetails stock={stockToShow} />
				) : shownPanel === 'preview' ? (
					<StockPreview stock={stockPreview} />
				) : (
					<Form
						value={value}
						setValue={setValue}
						fetchSymbol={fetchSymbol}
						message={message}
					/>
				)}
			</section>
		</div>
	);
}

export default App;
