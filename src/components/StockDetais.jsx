import { useState, useEffect } from 'react';
import { getCompanyPhoto } from '../data/stockData';

const StockDetais = ({ stock }) => {
	const [photo, setPhoto] = useState('');

	useEffect(() => {
		getCompanyPhoto(stock.name.split(',')[0]).then((data) => setPhoto(data));
	});

	return (
		<div className='stock-details'>
			<header>
				<h1>
					{stock.name} ({stock.symbol})
				</h1>
				<p>{stock.industry}</p>
				<img src={photo} alt='' />
			</header>
			<main>
				<div className='company-info'></div>
			</main>
		</div>
	);
};

export default StockDetais;
