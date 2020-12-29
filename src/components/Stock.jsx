import React from 'react';

const Stock = ({ stock, showStockDetais }) => {
	return (
		<li className='stock' onClick={() => showStockDetais(stock.symbol)}>
			<div className='stock-meta'>
				<h3>{stock.symbol.toUpperCase()}</h3>
				<h4>{stock.name}</h4>
			</div>
			{stock.amountHeld && (
				<div className='stock-held'>
					<p>
						{stock.amountHeld} shares purchased at $ {stock.purchasePrice}
					</p>
				</div>
			)}
		</li>
	);
};

export default Stock;
