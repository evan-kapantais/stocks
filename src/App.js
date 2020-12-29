import { useState, useEffect } from 'react';
import './App.scss';
import Form from './components/Form';
import { getStock } from './data/stockData';
import placeholderData from './utils/placeholderData';
import StockDetails from './components/StockDetails';
import StockPreview from './components/StockPreview';
import Aside from './components/Aside';
import Popup from './components/Popup';
import stocksService from './server';

//TODO: format numbers in stockData

function App() {
	const [stocks, setStocks] = useState([]);

	// Form state
	const [value, setValue] = useState('');
	const [message, setMessage] = useState({
		isActive: false,
		type: 'success',
		text: '',
	});

	// Content control
	const [shownPanel, setShownPanel] = useState('form');
	const [stockPreview, setStockPreview] = useState(null);
	const [stockToShow, setStockToShow] = useState(null);

	useEffect(() => {
		let stocksArray = [];

		stocksService.getAllStocks().then((fetchedStocks) => {
			fetchedStocks.forEach((fetchedStock) => {
				getStock(fetchedStock.symbol)
					.then((stock) => {
						if (stock === undefined) {
							return;
						} else {
							if (fetchedStock.amountHeld) {
								stocksArray.push({
									amountHeld: fetchedStock.amountHeld,
									purchasePrice: fetchedStock.purchasePrice,
									...stock,
								});
							} else {
								stocksArray.push(stock);
							}
						}
					})
					.then(() => {
						setStocks([...stocks, ...stocksArray]);
					})
					.catch((error) => console.error(error));
			});
		});
	}, []);

	const showStockDetails = (stock) => {
		setShownPanel('details');
		setStockToShow(stock);
	};

	const showStockPreview = (stock) => {
		setStockPreview(stock);
		setShownPanel('preview');
	};

	const showMessage = (type, text) => {
		setTimeout(() => {
			setMessage({ isActive: false, ...message });
		}, 5000);

		setMessage({
			isActive: true,
			type,
			text,
		});
	};

	const fetchSymbol = (e) => {
		e.preventDefault();

		if (!value) {
			showMessage('error', 'Please provide a search symbol');
			return;
		}

		showMessage('success', 'Looking for stock symbol...');

		getStock(value)
			.then((stock) => {
				if (stock === undefined) {
					showMessage('error', 'Stock symbol not found');
				} else {
					showStockPreview(stock);
					showMessage('success', 'Stock fetched successfully');
				}
			})
			.catch((error) => console.error(error));

		setValue('');
	};

	const addToWatchlist = () => {
		const existing = stocks.some(
			(stock) => stock.symbol === stockPreview.symbol
		);

		if (existing) {
			showMessage('error', 'Stock already in your watchlist');
		} else {
			setStocks([...stocks, stockPreview]);
			showMessage('success', 'Stock added to watchlist');
		}
	};

	const addToPortfolio = () => {};

	return (
		<div className='App'>
			<Popup message={message} />
			<Aside
				stocks={stocks}
				showStockDetails={showStockDetails}
				setShownPanel={setShownPanel}
			/>
			<section>
				{shownPanel === 'details' ? (
					<StockDetails stock={stockToShow} />
				) : shownPanel === 'preview' ? (
					<StockPreview stock={stockPreview} addToWatchlist={addToWatchlist} />
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
