import { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const Header = ({ stock, deleteDbStock, setDisplay }) => {
	return (
		<div className='stock-header'>
			<div className='stock-heading' onClick={() => setDisplay('stock', stock)}>
				<h3>{stock.overview.symbol.toUpperCase()}</h3>
				<h4 className='stock-name'>{stock.overview.name}</h4>
				<span className='asset-type'>
					<i>{stock.overview.assetType}</i>
				</span>
			</div>
			<button
				type='button'
				className='delete-button'
				onClick={() => deleteDbStock(stock.id)}
			>
				<span role='img' aria-label='delete button'>
					✕
				</span>
			</button>
		</div>
	);
};

const Footer = ({ stock }) => {
	return (
		<div className='stock-footer'>
			<div className='stock-held'>
				{stock.portfolio && (
					<span>{stock.portfolio.amountHeld} shares held</span>
				)}
			</div>
			<div className='stock-quote'>
				{stock.quote && (
					<>
						<span
							className={`daily-change ${
								stock.quote.changePercent > 0
									? 'positive-change'
									: 'negative-change'
							}`}
						>
							{` `}
							{stock.quote.changePercent > 0 ? '↑' : '↓'}
							{stock.quote.changePercent.toFixed(2)} %
						</span>
						<span>$ {stock.quote.price}</span>
					</>
				)}
			</div>
		</div>
	);
};

const Stock = ({ stock, type }) => {
	const {
		deleteDbStock,
		setDisplay,
		fetchStockQuote,
		getDbStocks,
	} = useContext(GlobalContext);

	const updateStock = () => {
		console.log(`Stock: Attempting ${stock.overview.symbol} quote update...`);

		fetchStockQuote(stock.overview.symbol).then((result) => {
			if (typeof result !== 'object') {
				return false;
			} else {
				getDbStocks();
			}
		});
	};

	useEffect(() => {
		let updateInterval;

		updateStock();

		updateInterval = setInterval(updateStock, 60000);

		return () => {
			clearInterval(updateInterval);
		};
	}, []);

	return (
		<li className={`stock ${type}`}>
			<Header
				stock={stock}
				deleteDbStock={deleteDbStock}
				setDisplay={setDisplay}
			/>
			<Footer stock={stock} />
			{stock?.amountHeld && (
				<div className='stock-valuation'>
					<p>{stock?.amountHeld} shares held</p>
				</div>
			)}
		</li>
	);
};

export default Stock;
