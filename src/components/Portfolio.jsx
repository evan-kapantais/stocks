import { useContext } from 'react';
import Stock from './Stock';
import { GlobalContext } from '../context/GlobalContext';

const Portfolio = (props) => {
	const { stocks } = useContext(GlobalContext);

	const portfolio = stocks.filter((stock) => stock.amountHeld);

	return (
		<details id='portfolio' open>
			<summary>
				<h2>Portfolio</h2>
				<span role='img'>▼</span>
			</summary>
			<ul>
				{!stocks && <p>Loading your portfolio...</p>}
				{portfolio.map((stock) => (
					<Stock
						key={stock.symbol}
						stock={stock}
						showStockDetais={props.showStockDetails}
					/>
				))}
			</ul>
		</details>
	);
};

export default Portfolio;
