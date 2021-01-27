import React from 'react';

const QuoteTable = ({ stock }) => {
	return (
		<table id='quote-table'>
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
	);
};

export default QuoteTable;
