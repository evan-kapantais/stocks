import { useEffect, useContext } from 'react';
import './App.scss';
import Form from './components/Form';
import StockDetails from './components/StockDetails';
import Aside from './components/Aside';
import Popup from './components/Popup';
import { GlobalContext } from './context/GlobalContext';

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
