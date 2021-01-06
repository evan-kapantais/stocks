import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const Stock = ({ stock }) => {
	const { deleteDbStock, setDisplay } = useContext(GlobalContext);

	return (
		<li className='stock'>
			<div className='stock-header'>
				<div className='stock-meta' onClick={() => setDisplay('stock', stock)}>
					<div className='stock-heading'>
						<h3>{stock.symbol.toUpperCase()}</h3>
						<span>$ {stock?.price} </span>
						<span
							className={`daily-change ${
								stock.changePercent > 0 ? 'positive-change' : 'negative-change'
							}`}
						>
							({stock.changePercent > 0 ? '↑' : '↓'}
							{stock?.changePercent.toFixed(2)} %)
						</span>
					</div>
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
