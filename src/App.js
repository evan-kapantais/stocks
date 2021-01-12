import { useEffect, useContext } from 'react';
import './App.scss';
import Form from './components/Form';
import StockDetails from './components/StockDetails';
import Aside from './components/Aside';
import Popup from './components/Popup';
import { GlobalContext } from './context/GlobalContext';

// TODO: pipeline: fetch both data types -> store stock info wis DB -> when focused again only fetch day info
// TODO: !!!IMPORTANT handle etf submission - object properties not handled properly
// TODO: !!!IMPORTANT prevent duplicates (front/back)
// TODO: store/show asset type in watchlist/portfolio
// TODO: store/show amount held in watchlist/portfolio
// TODO: add option to manually add stocks from other markets
// TODO: latest update difference
// TODO: abort controllers
// TODO: Bug: on new stock, quote fetch is successful, error is thrown, but resolves on reload
// TODO: update once during the weekend, store the latestUpdate on the quote, and check for the date. if the quote has been updated once during the weekend, refrain from fetching data until Monday
// TODO: Bug: app is deleting the wrong stock

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
				{display.type === 'stock' && <StockDetails />}
			</section>
		</div>
	);
}

export default App;
