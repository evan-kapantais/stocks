import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import PortfolioRow from './PortfolioRow';
import {
	calculateTotalShares,
	calculateTotalInitialValue,
	calculateTotalCurrentValue,
	calculateTotalGain,
	calculateTotalPercentGain,
} from '../utils/stockUtils';

const FullPortfolio = () => {
	// Context
	const { stocks, fetchStockQuote, getDbStocks } = useContext(GlobalContext);

	// Portfolio filter
	const portfolio = stocks.filter((stock) => stock.portfolio);

	// Init
	useEffect(() => {
		portfolio.forEach((portfolioStock) => {
			if (!portfolioStock.quote) {
				fetchStockQuote(portfolioStock.overview.symbol).then(() =>
					getDbStocks()
				);
			}
		});
	}, [stocks]);

	// Get values

	const totalPositions = portfolio.length;
	const totalShares = calculateTotalShares(portfolio);
	const totalInitialValue = calculateTotalInitialValue(portfolio).toFixed(2);
	const totalCurrentValue = calculateTotalCurrentValue(portfolio).toFixed(2);
	const totalGain = calculateTotalGain(portfolio).toFixed(2);
	const totalPercentGain = calculateTotalPercentGain(portfolio).toFixed(2);

	return (
		<div className='portfolio-wrapper'>
			<h2 className='display-heading'>Portfolio</h2>
			<div>
				<header></header>
				<main>
					<h2 className='portfolio-heading'>Breakdown</h2>
					<table className='portfolio-table'>
						<thead>
							<tr>
								<th>Symbol</th>
								<th>Shares</th>
								<th>Buy Price</th>
								<th>Current Price</th>
								<th>Gain</th>
								<th>% Gain</th>
							</tr>
						</thead>
						<tbody>
							{portfolio.map((stock) => (
								<PortfolioRow key={stock.overview.symbol} stock={stock} />
							))}
						</tbody>
					</table>
					<h2 className='portfolio-heading'>Overview</h2>
					<table className='portfolio-table'>
						<thead>
							<tr>
								<th>Positions</th>
								<th>Shares</th>
								<th>Initial Value</th>
								<th>Current Value</th>
								<th>Gain</th>
								<th>% Gain</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{totalPositions}</td>
								<td>{totalShares}</td>
								<td>$ {totalInitialValue}</td>
								<td>$ {totalCurrentValue}</td>
								<td
									className={
										totalGain === 0
											? ''
											: totalGain > 0
											? 'positive-change'
											: 'negative-change'
									}
								>
									$ {totalGain}
								</td>
								<td
									className={
										totalGain === 0
											? ''
											: totalGain > 0
											? 'positive-change'
											: 'negative-change'
									}
								>
									{totalPercentGain}
								</td>
							</tr>
						</tbody>
					</table>
				</main>
			</div>
		</div>
	);
};

export default FullPortfolio;
