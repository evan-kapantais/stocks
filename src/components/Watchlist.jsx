import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Stock from './Stock';

const Watchlist = () => {
	const { stocks } = useContext(GlobalContext);

	const watchlist = stocks.filter((stock) => !stock.portfolio);

	return (
		<details id='watchlist' open>
			<summary>
				<h2>Watchlist</h2>
				<span role='img'>▼</span>
			</summary>
			<ul>
				{!stocks && <p>Loading your watchlist...</p>}
				{watchlist &&
					watchlist.map((stock) => (
						<Stock key={stock.overview.symbol} stock={stock} />
					))}
			</ul>
		</details>
	);
};

export default Watchlist;
