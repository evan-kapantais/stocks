import { useContext } from 'react';
import Watchlist from './Watchlist';
import Portfolio from './Portfolio';
import { GlobalContext } from '../context/GlobalContext';

const Aside = () => {
	const { setDisplay } = useContext(GlobalContext);
	return (
		<aside>
			<Portfolio />
			<Watchlist />
			<div className='add-stock-wrapper'>
				<button
					type='button'
					className='add-stock-button'
					onClick={() => setDisplay('form')}
				>
					+
				</button>
			</div>
		</aside>
	);
};

export default Aside;
