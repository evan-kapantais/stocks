import { useState, useEffect, useContext } from 'react';
import './App.scss';
import Form from './components/Form';
import StockDetails from './components/StockDetails';
import Aside from './components/Aside';
import Popup from './components/Popup';
import { GlobalContext } from './context/GlobalContext';

// TODO: format numbers in stockData
// TODO: pipeline: fetch both data types -> store stock info wis DB -> when focused again only fetch day info
// TODO: !!!IMPORTANT handle etf submission - object properties not handled properly
// TODO: !!!IMPORTANT prevent duplicates (front/back)
// TODO: store/show asset type in watchlist/portfolio
// TODO: store/show amount held in watchlist/portfolio

function App() {
	const { getDbStocks, display } = useContext(GlobalContext);

	useEffect(() => {
		getDbStocks();
	}, []);

	return (
		<div className='App'>
			<Popup />
			<Aside />
			<section>
				{display.type === 'form' && <Form />}
				{display.type === 'stock' && <StockDetails stock={display.stock} />}
			</section>
		</div>
	);
}

export default App;
