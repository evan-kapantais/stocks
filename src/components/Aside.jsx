import Stock from './Stock';

const Aside = (props) => {
	const { stocks, showStockDetails, setShownPanel } = props;

	const portfolio = stocks.filter((stock) => stock.amountHeld);
	const watchlist = stocks.filter((stock) => !stock.amountHeld);

	return (
		<aside>
			<details id='portfolio' open>
				<summary>
					<h2>Portfolio</h2>
					<span role='img'>▼</span>
				</summary>
				<ul>
					{portfolio.map((stock) => (
						<Stock
							key={stock.symbol}
							stock={stock}
							showStockDetais={showStockDetails}
						/>
					))}
				</ul>
			</details>
			<details id='watchlist' open>
				<summary>
					<h2>Watchlist</h2>
					<span role='img'>▼</span>
				</summary>
				<ul>
					{!stocks && <p>Loading data...</p>}
					{stocks &&
						watchlist.map((stock) => (
							<Stock
								key={stock.symbol}
								stock={stock}
								showStockDetais={showStockDetails}
							/>
						))}
				</ul>
			</details>
			<div className='add-stock-wrapper'>
				<button
					type='button'
					className='add-stock-button'
					onClick={() => setShownPanel('form')}
				>
					+
				</button>
			</div>
		</aside>
	);
};

export default Aside;
