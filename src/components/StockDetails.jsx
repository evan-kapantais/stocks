import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Loader from './Loader';
import QuoteTable from './tables/QuoteTable';
import KeyDataTable from './tables/KeyDataTable';
import apartment from '../icons/apartment-black-18dp.svg';
import map from '../icons/map-black-18dp.svg';
import group from '../icons/group-black-18dp.svg';

const FinancialData = ({ stock }) => {
	return (
		<section className='financials'>
			<div className='financials-row'>
				<div className='quote-price'>
					<p className='stock-price'>
						<b>$ {Number(stock.quote.price).toFixed(2)}</b>
						<span
							className={`stock-change ${
								stock.quote.changePercent > 0
									? 'positive-change'
									: 'negative-change'
							}`}
						>
							{stock.quote.changePercent > 0 ? '↑' : '↓'}
							{stock.quote.changePercent.toFixed(3)} %
						</span>
					</p>
					<i className='stock-day'>
						Latest trading day:{' '}
						{new Date(stock.quote.latestTradingDay).toLocaleDateString()}
					</i>
				</div>
				<QuoteTable stock={stock} />
			</div>
			<div className='tables-container'>
				{stock.overview.assetType === 'Common Stock' && (
					<KeyDataTable stock={stock} />
				)}
			</div>
		</section>
	);
};

const Overview = ({ stock }) => {
	return (
		<section id='stock-overview'>
			<div id='company-meta'>
				<h2>Company Info</h2>
				<div className='overview-row'>
					<img src={apartment} alt='' />
					<p>{stock.overview.industry}</p>
				</div>
				<div className='overview-row'>
					<img src={map} alt='' />
					<address>{stock.overview.address}</address>
				</div>
				<div className='overview-row'>
					<img src={group} alt='' />
					<p>{stock.overview.employees} employees</p>
				</div>
			</div>
			<div id='company-description'>
				<h2>Company Description</h2>
				<p>{stock.overview.description}</p>
			</div>
		</section>
	);
};

const StockDetails = () => {
	// Fetch controls
	const abortController = new AbortController();
	const signal = abortController.signal;

	// State
	const [stock, setStock] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [view, setView] = useState('financials');

	// Context
	const { display, fetchStockQuote, getDbStocks } = useContext(GlobalContext);

	useEffect(() => {
		if (display.stock.quote) {
			setStock(display.stock);
			setIsPending(false);
		} else {
			fetchStockQuote(display.stock.overview.symbol, {
				signal,
			}).then((res) => {
				setStock(res);
				setIsPending(false);
				getDbStocks();
			});
		}

		return () => {
			abortController.abort();
		};
	}, [display.stock]);

	const handleTabs = (text) => {
		const financialsTab = document.querySelector('#financials-tab');
		const overviewTab = document.querySelector('#overview-tab');

		switch (text) {
			case 'overview':
				financialsTab.classList.remove('active');
				overviewTab.classList.add('active');
				break;
			case 'financials':
			default:
				financialsTab.classList.add('active');
				overviewTab.classList.remove('active');
		}

		setView(text);
	};

	return (
		<div
			id='stock-preview-wrapper'
			className={`${isPending ? 'center-loader' : ''}`}
		>
			{isPending && <Loader />}
			{!isPending && (
				<>
					<header>
						<div>
							<h1>{display.stock.overview.symbol}</h1>
							<h2>{display.stock.overview.name}</h2>
						</div>
					</header>
					<main className='details-main'>
						<div className='tabs'>
							<button
								className='tab active'
								id='financials-tab'
								onClick={() => handleTabs('financials')}
							>
								Financials
							</button>
							<button
								className='tab'
								id='overview-tab'
								onClick={() => handleTabs('overview')}
							>
								Overview
							</button>
						</div>
						<div className='details-content'>
							{view === 'overview' &&
								display.stock.overview.assetType === 'Common Stock' && (
									<Overview stock={display.stock} />
								)}
							{view === 'financials' && <FinancialData stock={stock} />}
						</div>
					</main>
				</>
			)}
		</div>
	);
};

export default StockDetails;
