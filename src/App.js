import { useEffect, useContext } from 'react';
import './App.scss';
import Form from './components/Form';
import StockDetails from './components/StockDetails';
import Aside from './components/Aside';
import Popup from './components/Popup';
import FullPortfolio from './components/FullPortfolio';
import { GlobalContext } from './context/GlobalContext';
import Navbar from './components/Navbar';
import ApiTimer from './components/ApiTimer';

function App() {
	const { getDbStocks, display } = useContext(GlobalContext);

	useEffect(() => {
		getDbStocks();
	}, []);

	return (
		<div className='App'>
			<Navbar />
			<Popup />
			<Aside />
			<ApiTimer />
			<section>
				{display.type === 'form' && <Form />}
				{display.type === 'stock' && <StockDetails />}
				{display.type === 'portfolio' && <FullPortfolio />}
			</section>
		</div>
	);
}

export default App;
