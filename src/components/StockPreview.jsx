import mapIcon from '../icons/map-black-18dp.svg';
import groupIcon from '../icons/group-black-18dp.svg';

const StockPreview = ({ stock }) => {
	return (
		<div id='stock-preview-wrapper'>
			{/* <div className='tabs'>
				<button type='button'>Overview</button>
				<button type='button'>Financials</button>
			</div> */}
			<header>
				<h1>
					{stock.name} ({stock.symbol})
				</h1>
				<h2>{stock.industry}</h2>
			</header>
			<main>
				<div className='meta'>
					<div className='address'>
						<img src={mapIcon} alt='map icon' />
						<address>{stock.address}</address>
					</div>
					<div className='employees'>
						<img src={groupIcon} alt='group icon' />
						<p>Employs {stock.employees}</p>
					</div>
				</div>
				<p>{stock.description}</p>
			</main>
		</div>
	);
};

export default StockPreview;
