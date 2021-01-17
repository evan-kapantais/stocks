const PortfolioRow = ({ stock }) => {
	const gain =
		(stock.quote.price - stock.portfolio.purchasePrice) *
		stock.portfolio.amountHeld;

	const percentGain =
		((stock.quote.price - stock.portfolio.purchasePrice) /
			stock.portfolio.purchasePrice) *
		100;

	return (
		<tr>
			<th>{stock.overview.symbol}</th>
			<td>{stock.portfolio.amountHeld}</td>
			<td>$ {stock.portfolio.purchasePrice}</td>
			<td>$ {stock.quote.price}</td>
			<td
				className={
					gain > 0 ? 'positive-change' : gain === 0 ? '' : 'negative-change'
				}
			>
				$ {gain.toFixed(2)}
			</td>
			<td
				className={
					gain > 0 ? 'positive-change' : gain === 0 ? '' : 'negative-change'
				}
			>
				{percentGain.toFixed(2)} %
			</td>
		</tr>
	);
};

export default PortfolioRow;
