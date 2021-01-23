import { useEffect, useContext } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Popup from './components/Popup';
import { GlobalContext } from './context/GlobalContext';
import './App.scss';

function App() {
	const { getDbStocks } = useContext(GlobalContext);

	useEffect(() => {
		getDbStocks();
	}, []);

	return (
		<div className='App'>
			<Navbar />
			<Popup />
			<Sidebar />
			<Content />
		</div>
	);
}

export default App;
