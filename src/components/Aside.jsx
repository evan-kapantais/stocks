import Watchlist from './Watchlist';
import Portfolio from './Portfolio';

const Aside = () => {
	return (
		<aside>
			<Portfolio />
			<Watchlist />
			<div className='add-stock-wrapper'>
				<button
					type='button'
					className='add-stock-button'
					// onClick={() => setShownPanel('form')}
				>
					+
				</button>
			</div>
		</aside>
	);
};

export default Aside;
