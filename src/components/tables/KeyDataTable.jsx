import React from 'react';

const KeyDataTable = ({ stock }) => {
	return (
		<table id='key-data-table'>
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
					<td>
						{stock.overview.peRatio === 'NaN' ? 'None' : stock.overview.peRatio}
					</td>
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
	);
};

export default KeyDataTable;
