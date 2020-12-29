const StockDetails = ({ stock }) => {
	return (
		<div className='stock-details'>
			<header>
				<h1>
					{stock.name} ({stock.symbol})
				</h1>
				<p>{stock.industry}</p>
			</header>
			<main>
				<div className='company-info'></div>
			</main>
		</div>
	);
};

export default StockDetails;
