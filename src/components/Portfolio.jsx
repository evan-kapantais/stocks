import { useContext, useEffect } from 'react';
import Stock from './Stock';
import { GlobalContext } from '../context/GlobalContext';

const Portfolio = (props) => {
	const { stocks, setDisplay } = useContext(GlobalContext);

	const portfolio = stocks.filter((stock) => stock.portfolio);

	useEffect(() => {
		stocks.length === 0 && setDisplay('form');
	}, [stocks]);

	return (
		<details id='portfolio' open>
			<summary>
				<div>
					<span role='img' className='summary-icon'>
						►
					</span>
					<h2>Portfolio</h2>
				</div>
				<button
					type='button'
					className='text-button'
					onClick={() => setDisplay('portfolio')}
				>
					View Full Portfolio
				</button>
			</summary>
			<ul>
				{!stocks && <p>Loading your portfolio...</p>}
				{portfolio.map((stock) => (
					<Stock
						key={stock.overview.symbol}
						stock={stock}
						type='portfolio-stock'
					/>
				))}
			</ul>
		</details>
	);
};

export default Portfolio;
