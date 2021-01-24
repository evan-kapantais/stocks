import { useContext } from 'react';
import Watchlist from './Watchlist';
import Portfolio from './Portfolio';
import { GlobalContext } from '../context/GlobalContext';

const Aside = () => {
	const { setDisplay } = useContext(GlobalContext);
	return (
		<aside id='sidebar'>
			<Portfolio />
			<Watchlist />
			<button
				type='button'
				className='add-stock-button'
				onClick={() => setDisplay('form')}
			>
				Add Stock
			</button>
		</aside>
	);
};

export default Aside;
