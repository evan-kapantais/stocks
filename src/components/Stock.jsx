import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const Stock = ({ stock }) => {
	const { deleteDbStock, setDisplay } = useContext(GlobalContext);

	console.log(stock);

	return (
		<li className='stock'>
			<div className='stock-header'>
				<div className='stock-meta' onClick={() => setDisplay('stock', stock)}>
					<h3>{stock.symbol.toUpperCase()}</h3>
					<h4>{stock.name}</h4>
				</div>
				<button
					type='button'
					className='delete-button'
					onClick={() => deleteDbStock(stock.id)}
				>
					<span role='img' aria-label='delete button'>
						✕
					</span>
				</button>
			</div>
			{stock.amountHeld && (
				<div className='stock-valuation'>
					<p>{stock.amountHeld} shares held</p>
				</div>
			)}
		</li>
	);
};

export default Stock;
