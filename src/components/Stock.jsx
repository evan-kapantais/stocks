import React from 'react';

const Stock = ({ stock, showStockDetais }) => {
	return (
		<li className='stock' onClick={() => showStockDetais(stock)}>
			<div className='stock-meta'>
				<h3>{stock.symbol}</h3>
				<h4>{stock.name}</h4>
			</div>
			<p>
				<b>${Number(stock.price).toFixed(2)}</b>
			</p>
		</li>
	);
};

export default Stock;
