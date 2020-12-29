import { useState, useEffect } from 'react';
import './App.scss';
import Form from './components/Form';
import getStock from './data/stockData';
import placeholderData from './utils/placeholderData';
import StockDetails from './components/StockDetails';
import StockPreview from './components/StockPreview';
import Aside from './components/Aside';
import Popup from './components/Popup';
import stocksService from './server';

//TODO: format numbers in stockData
// TODO: pipeline: fetch both data types -> store stock info wis DB -> when focused again only fetch day info
// TODO: replace seatch field with search and recommendations (https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo, https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo)

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
		stocksService.getAllStocks().then((dbStocks) => {
			setStocks([...dbStocks]);
		});
	}, []);

	const showStockDetails = (symbol) => {
		setShownPanel('details');
		setStockToShow(symbol);
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
					showMessage('error', 'Stock symbol not found OR API limit reached');
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
			stocksService.postStock(stockPreview).then(() => {
				setStocks([...stocks, stockPreview]);
				showMessage('success', 'Stock added to watchlist');
			});
		}
	};

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
					<StockDetails
						stocks={stocks}
						setStocks={setStocks}
						symbol={stockToShow}
					/>
				) : shownPanel === 'preview' ? (
					<StockPreview
						stock={stockPreview}
						addToWatchlist={addToWatchlist}
						setShownPanel={setShownPanel}
					/>
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
