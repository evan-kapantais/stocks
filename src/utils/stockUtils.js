export const formatStockOverview = (stock) => {
	const formatted = {
		symbol: stock.Symbol,
		name: stock.Name,
		bookValue: Number(stock.BookValue).toFixed(3),
		yearHigh: Number(stock['52WeekHigh']).toFixed(3),
		yearLow: Number(stock['52WeekLow']).toFixed(3),
		exchange: stock.Exchange,
		industry: stock.Industry,
		peRatio: Number(stock.PERatio).toFixed(3),
		pbRatio: Number(stock.PriceToBookRatio).toFixed(3),
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
		previousClose: Number(quote['08. previous close']).toFixed(3),
		change: Number(quote['09. change']).toFixed(3),
		changePercent: Number(quote['10. change percent'].slice(0, -1)),
	};

	return formatted;
};
