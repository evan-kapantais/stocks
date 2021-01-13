import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Loader from './Loader';
import apartment from '../icons/apartment-black-18dp.svg';
import map from '../icons/map-black-18dp.svg';
import group from '../icons/group-black-18dp.svg';

const StockDetails = () => {
	// Fetch controls
	const abortController = new AbortController();
	const signal = abortController.signal;

	// State
	const [stock, setStock] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [viewFullDescription, setViewFullDescription] = useState(false);

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

		// const date = new Date();
		// const latestUpdate = new Date(display.stock.quote.latestUpdate).getTime();
		// const now = date.getTime();
		// const updateMargin = 300000;
		// const timeToUpdate = now - latestUpdate > updateMargin;
		// const isWeekend = date.getDay() === 0 || date.getDay() === 6;

		// console.log(`Latest Update: ${latestUpdate.toLocaleString()}`);
		// console.log(`Now: ${now.toLocaleString()}`);
		// console.log(`Time Difference: ${(now - latestUpdate).toLocaleString()}`);
		// console.log(`Update Margin: ${updateMargin.toLocaleString()}`);
		// console.log(`Time to Update: ${timeToUpdate}`);
		// isWeekend && console.log("it's the weekend");

		return () => {
			abortController.abort();
		};
	}, [display.stock]);

	const summary = `${display.stock.overview.description.slice(0, 1000)}...`;

	// console.log(
	// 	`${display.stock.overview.symbol} last updated on ${new Date(
	// 		display.stock.quote.latestUpdate
	// 	)}.`
	// );

	return (
		<div
			id='stock-preview-wrapper'
			className={`${isPending && 'center-loader'}`}
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
						<section className='financials'>
							<h2 className='section-heading'>Financial Data</h2>
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
							<div className='tables-container'>
								<table>
									<thead>
										<tr>
											<th>Quote</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>High</td>
											<td>$ {stock.quote.high}</td>
										</tr>
										<tr>
											<td>Low</td>
											<td>$ {stock.quote.low}</td>
										</tr>
										<tr>
											<td>Previous Close</td>
											<td>$ {stock.quote.previousClose}</td>
										</tr>
										<tr>
											<td>Change</td>
											<td>$ {stock.quote.change}</td>
										</tr>
										<tr>
											<td>% Change</td>
											<td>{stock.quote.changePercent}</td>
										</tr>
									</tbody>
								</table>
								<table>
									<thead>
										<tr>
											<th>Key Info</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Exchange</td>
											<td>{stock.overview.exchange}</td>
										</tr>
										<tr>
											<td>
												<abbr title='Price / Earnings Ratio'>P/E Ratio</abbr>
											</td>
											<td>{stock.overview.peRatio}</td>
										</tr>
										<tr>
											<td>
												<abbr title='Price / Book Ratio'>P/B Ratio</abbr>
											</td>
											<td>{stock.overview.pbRatio}</td>
										</tr>
										<tr>
											<td>52 Week High</td>
											<td>$ {stock.overview.yearHigh}</td>
										</tr>
										<tr>
											<td>52 Week Low</td>
											<td>$ {stock.overview.yearLow}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</section>
						<section className='overview'>
							<h2 className='section-heading'>Overview</h2>
							<div id='company-meta'>
								<div className='overview-row'>
									<img src={apartment} alt='' />
									<p>{display.stock.overview.industry}</p>
								</div>
								<div className='overview-row'>
									<img src={map} alt='' />
									<address>{display.stock.overview.address}</address>
								</div>
								<div className='overview-row'>
									<img src={group} alt='' />
									<p>{display.stock.overview.employees} employees</p>
								</div>
							</div>
							<p id='company-description'>
								{viewFullDescription
									? display.stock.overview.description
									: summary}
								<button
									type='button'
									className='text-button'
									onClick={() => setViewFullDescription(!viewFullDescription)}
								>
									View {viewFullDescription ? 'Less' : 'More'}
								</button>
							</p>
						</section>
					</main>
				</>
			)}
		</div>
	);
};

export default StockDetails;
