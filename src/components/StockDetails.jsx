import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Table from './Table';

import apartment from '../icons/apartment-black-18dp.svg';
import map from '../icons/map-black-18dp.svg';
import group from '../icons/group-black-18dp.svg';

const Overview = ({ stock }) => {
	const [viewFullDescription, setViewFullDescription] = useState(false);

	const summary = `${stock.description.slice(0, 400)}...`;

	return (
		<div className='tab' id='overview-tab'>
			<div className='overview'>
				<h2 className='preview-section-title'>Company Overview</h2>
				<div id='company-meta'>
					<div className='overview-row'>
						<img src={apartment} alt='' />
						<p>{stock.industry}</p>
					</div>
					<div className='overview-row'>
						<img src={map} alt='' />
						<address>{stock.address}</address>
					</div>
					<div className='overview-row'>
						<img src={group} alt='' />
						<p>{stock.employees} employees</p>
					</div>
				</div>
				<p id='company-description'>
					{viewFullDescription ? stock.description : summary}
					<button
						type='button'
						className='text-button'
						onClick={() => setViewFullDescription(!viewFullDescription)}
					>
						View {viewFullDescription ? 'Less' : 'More'}
					</button>
				</p>
			</div>
		</div>
	);
};

const Financials = ({ quote, data }) => {
	const latestTradingDayData = {
		High: `$ ${Number(quote.high).toFixed(2)}`,
		Low: `$ ${Number(quote.low).toFixed(2)}`,
		'Previous Close': `$ ${quote.previousClose}`,
		Change: quote.change,
		'Change %': quote.changePercent,
	};

	const keyData = {
		Exchange: data.exchange,
		'PB Ratio': data.pbRatio,
		'PE Ratio': data.peRatio,
		'52 Week High': data.yearHigh,
		'52 Week Low': data.yearLow,
	};

	return (
		<>
			<h2 className='preview-section-title'>Financial Data</h2>
			<p className='stock-price'>
				<b>$ {Number(quote.price).toFixed(2)}</b>
				<span
					className={`stock-change ${
						quote.changePercent > 0 ? 'positive-change' : 'negative-change'
					}`}
				>
					{quote.changePercent > 0 ? '↑' : '↓'}
					{quote.changePercent.toFixed(3)} %
				</span>
			</p>
			<i className='stock-day'>Latest trading day: {quote.latestTradingDay}</i>
			<div className='content-grid'>
				<Table data={latestTradingDayData} title='Latest Trading Day' />
				<Table data={keyData} title='Key Data' />
			</div>
		</>
	);
};

const StockDetails = () => {
	const [activeTab, setActiveTab] = useState('overview');
	const [quote, setQuote] = useState(null);
	const { display, fetchStockQuote } = useContext(GlobalContext);

	useEffect(() => {
		fetchStockQuote(display.stock.symbol).then((res) => setQuote(res));
	}, [display]);

	return (
		<div id='stock-preview-wrapper'>
			<nav>
				<div className='tabs'>
					<button
						type='button'
						className='tab-button'
						onClick={() => setActiveTab('overview')}
					>
						Overview
					</button>
					<button
						type='button'
						className='tab-button'
						onClick={() => setActiveTab('quote')}
					>
						Financials
					</button>
				</div>
			</nav>
			<header>
				<div>
					<h1>{display.stock.symbol}</h1>
					<h2>{display.stock.name}</h2>
				</div>
			</header>
			<main>
				{activeTab === 'overview' && <Overview stock={display.stock} />}
				{quote && activeTab === 'quote' && (
					<Financials quote={quote} data={display.stock} />
				)}
			</main>
		</div>
	);
};

export default StockDetails;
