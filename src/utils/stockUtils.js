export const formatStockOverview = (stock) => {
	const formatted = {
		assetType: stock.AssetType,
		symbol: stock.Symbol,
		name: stock.Name,
		bookValue: stock.BookValue,
		yearHigh: stock['52WeekHigh'],
		yearLow: stock['52WeekLow'],
		exchange: stock.Exchange,
		industry: stock.Industry,
		peRatio: stock.PERatio,
		pbRatio: stock.PriceToBookRatio,
		description: stock.Description,
		address: stock.Address,
		employees: stock.FullTimeEmployees,
	};

	return formatted;
};

export const formatStockQuote = (stock) => {
	const quote = stock['Global Quote'];

	const formatted = {
		high: Number(quote['03. high']).toFixed(3),
		low: Number(quote['04. low']).toFixed(3),
		price: Number(quote['05. price']).toFixed(3),
		volume: Number(quote['06. volume']).toFixed(3),
		latestTradingDay: quote['07. latest trading day'],
		latestUpdate: new Date(),
		previousClose: Number(quote['08. previous close']).toFixed(3),
		change: Number(quote['09. change']).toFixed(3),
		changePercent: Number(quote['10. change percent'].slice(0, -1)),
	};

	return formatted;
};

export const calculateTotalGain = (stocksArray) => {
	let totalGain = 0;

	stocksArray.forEach((stock) => {
		const gain =
			(stock.quote.price - stock.portfolio.purchasePrice) *
			stock.portfolio.amountHeld;

		totalGain += gain;
	});

	return totalGain;
};

export const calculateTotalPercentGain = (stocksArray) => {
	return (
		((calculateTotalCurrentValue(stocksArray) -
			calculateTotalInitialValue(stocksArray)) /
			calculateTotalCurrentValue(stocksArray)) *
		100
	);
};

export const calculateTotalShares = (stocksArray) => {
	return stocksArray
		.map((stock) => stock.portfolio.amountHeld)
		.reduce((sum, item) => (sum += item), 0);
};

export const calculateTotalInitialValue = (stocksArray) => {
	return stocksArray
		.map((stock) => stock.portfolio.purchasePrice)
		.reduce((sum, item) => (sum += item), 0);
};

export const calculateTotalCurrentValue = (stocksArray) => {
	return stocksArray
		.map((stock) => stock.quote.price)
		.reduce((sum, item) => (sum += item), 0);
};
