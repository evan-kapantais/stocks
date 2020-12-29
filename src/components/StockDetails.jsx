import { useEffect, useState } from 'react';
import getStock from '../data/stockData';
import stocksService from '../server';

const StockDetails = ({ setStocks, stocks, symbol }) => {
	const [displayedStock, setDisplayedStock] = useState({});

	useEffect(() => {
		getStock(symbol)
			.then((res) => {
				setDisplayedStock({ ...res });

				let index;

				for (let i = 0; i < stocks.length; i++) {
					if (stocks[i].symbol === symbol) {
						index = i;
					}
				}

				const thisStock = stocks.filter((stock) => stock.symbol === symbol)[0];
				const updatedStock = { ...thisStock, name: res.name };

				stocksService.updateStock(thisStock.id, updatedStock);

				const filteredStocks = stocks.filter(
					(stock) => stock.symbol !== symbol
				);

				const updatedStocks = [
					...filteredStocks.slice(0, index),
					updatedStock,
					...filteredStocks.slice(index),
				];

				setStocks([...updatedStocks]);
			})
			.catch((error) => console.log(error));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [symbol]);

	return (
		<div className='stock-details'>
			{displayedStock && (
				<>
					<header>
						<h1>
							{displayedStock.name} ({displayedStock.symbol})
						</h1>
						<p>{displayedStock.industry}</p>
					</header>
					<main>
						<div className='company-info'></div>
					</main>
				</>
			)}
		</div>
	);
};

export default StockDetails;
