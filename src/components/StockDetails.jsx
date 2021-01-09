import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Table from './Table';

import apartment from '../icons/apartment-black-18dp.svg';
import map from '../icons/map-black-18dp.svg';
import group from '../icons/group-black-18dp.svg';

const Overview = ({ stock }) => {
	const [viewFullDescription, setViewFullDescription] = useState(false);

	const summary = `${stock.overview.description.slice(0, 400)}...`;

	return (
		<div className='tab' id='overview-tab'>
			<div className='overview'>
				<h2 className='preview-section-title'>Company Overview</h2>
				<div id='company-meta'>
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
				<p id='company-description'>
					{viewFullDescription ? stock.overview.description : summary}
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

const Financials = ({ stock }) => {
	const latestTradingDayData = {
		High: `$ ${Number(stock.quote.high).toFixed(2)}`,
		Low: `$ ${Number(stock.quote.low).toFixed(2)}`,
		'Previous Close': `$ ${stock.quote.previousClose}`,
		Change: stock.quote.change,
		'Change %': stock.quote.changePercent,
	};

	const keyData = {
		Exchange: stock.overview.exchange,
		'PB Ratio': stock.overview.pbRatio,
		'PE Ratio': stock.overview.peRatio,
		'52 Week High': stock.overview.yearHigh,
		'52 Week Low': stock.overview.yearLow,
	};

	return (
		<>
			<h2 className='preview-section-title'>Financial Data</h2>
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
				{new Date(stock.quote.latestTradingDay).toUTCString()}
			</i>
			<div className='content-grid'>
				<Table data={latestTradingDayData} title='Latest Trading Day' />
				<Table data={keyData} title='Key Data' />
			</div>
		</>
	);
};

const StockDetails = () => {
	const abortController = new AbortController();
	const signal = abortController.signal;

	const [activeTab, setActiveTab] = useState('overview');
	const [quote, setQuote] = useState(null);
	const { display, fetchStockQuote } = useContext(GlobalContext);

	useEffect(() => {
		// TODO: use quote regardless. if you use the display.stock as default, the recurrent updates are useless and not being reflected in the stock info.

		const latestUpdate = new Date(display.stock.quote.latestUpdate).getTime();
		const now = new Date().getTime();
		const updateMargin = 300000;

		console.log(`Latest Update: ${latestUpdate.toLocaleString()}`);
		console.log(`Now: ${now.toLocaleString()}`);
		console.log(`Time Difference: ${(now - latestUpdate).toLocaleString()}`);
		console.log(`Update Margin: ${updateMargin.toLocaleString()}`);
		console.log(`Time to Update: ${now - latestUpdate > updateMargin}`);

		if (display.stock.quote) {
			setQuote(display.stock.quote);
		} else {
			fetchStockQuote(display.stock.overview.symbol, { signal }).then((res) =>
				setQuote(res)
			);
		}

		return () => {
			abortController.abort();
		};
	}, [display]);

	// console.log(
	// 	`${display.stock.overview.symbol} last updated on ${new Date(
	// 		display.stock.quote.latestUpdate
	// 	)}.`
	// );

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
					<h1>{display.stock.overview.symbol}</h1>
					<h2>{display.stock.overview.name}</h2>
				</div>
			</header>
			<main>
				{activeTab === 'overview' && <Overview stock={display.stock} />}
				{activeTab === 'quote' && <Financials stock={display.stock || quote} />}
			</main>
		</div>
	);
};

export default StockDetails;
