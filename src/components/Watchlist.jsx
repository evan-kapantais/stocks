import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Stock from './Stock';

const Watchlist = () => {
	const { stocks, setDisplay } = useContext(GlobalContext);

	const watchlist = stocks.filter((stock) => !stock.portfolio);

	useEffect(() => {
		stocks.length === 0 && setDisplay('form');
	}, [stocks]);

	return (
		<details id='watchlist' open>
			<summary>
				<span role='img' className='summary-icon'>
					►
				</span>
				<h2>Watchlist</h2>
			</summary>
			<ul>
				{!stocks && <p>Loading your watchlist...</p>}
				{watchlist &&
					watchlist.map((stock) => (
						<Stock
							key={stock.overview.symbol}
							stock={stock}
							type='watchlist-stock'
						/>
					))}
			</ul>
		</details>
	);
};

export default Watchlist;
