const formatItem = (data) => {
	let stock;

	data.forEach((piece) => {
		if (piece.hasOwnProperty('Symbol')) {
			stock = {
				...stock,
				symbol: piece.Symbol,
				name: piece.Name,
				bookValue: Number(piece.BookValue).toFixed(3),
				yearHigh: Number(piece['52WeekHigh']).toFixed(3),
				yearLow: Number(piece['52WeekLow']).toFixed(3),
				exchange: piece.Exchange,
				industry: piece.Industry,
				peRatio: Number(piece.PERatio).toFixed(3),
				pbRatio: Number(piece.PriceToBookRatio).toFixed(3),
				description: piece.Description,
				address: piece.Address,
				employees: piece.FullTimeEmployees,
			};
		} else {
			const dayInfo = piece['Global Quote'];
			stock = {
				...stock,
				high: Number(dayInfo['03. high']).toFixed(3),
				low: Number(dayInfo['04. low']).toFixed(3),
				price: Number(dayInfo['05. price']).toFixed(3),
				volume: Number(dayInfo['06. volume']).toFixed(3),
				latestTradingDay: dayInfo['07. latest trading day'],
				previousClose: Number(dayInfo['08. previous close']).toFixed(3),
				change: Number(dayInfo['09. change']).toFixed(3),
				changePercent: dayInfo['10. change percent'],
			};
		}
	});
	return stock;
};

const getStock = (symbol) => {
	const dayApi = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;
	const infoApi = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

	return Promise.all([fetch(dayApi), fetch(infoApi)])
		.then((responses) =>
			Promise.all(responses.map((response) => response.json()))
		)
		.then((data) => formatItem(data))
		.catch((error) => console.error(error.message));
};

export default getStock;
