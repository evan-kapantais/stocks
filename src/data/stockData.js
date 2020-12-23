const formatItem = (data) => {
	let stock;

	data.forEach((piece) => {
		if (piece.hasOwnProperty('Symbol')) {
			stock = {
				...stock,
				symbol: piece.Symbol,
				name: piece.Name,
				bookValue: piece.BookValue,
				yearHigh: piece['52WeekHigh'],
				yearLow: piece['52WeekLow'],
				exchange: piece.Exchange,
				industry: piece.Industry,
				peRatio: piece.PERatio,
				pbRatio: piece.PriceToBookRatio,
				description: piece.Description,
				address: piece.Address,
				employees: piece.FullTimeEmployees,
			};
		} else {
			const dayInfo = piece['Global Quote'];
			stock = {
				...stock,
				high: dayInfo['03. high'],
				low: dayInfo['04. low'],
				price: dayInfo['05. price'],
			};
		}
	});
	return stock;
};

export const getCompanyPhoto = (symbol) => {
	const unsplashApi = `https://api.unsplash.com/search/photos/?query=${symbol}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;

	return fetch(unsplashApi)
		.then((response) => response.json())
		.then((data) => {
			return data.results[0].urls.small;
		});
};

export const getStock = (symbol) => {
	const dayApi = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;
	const infoApi = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

	return Promise.all([fetch(dayApi), fetch(infoApi)])
		.then((responses) =>
			Promise.all(responses.map((response) => response.json()))
		)
		.then((data) => formatItem(data))
		.catch((error) => console.error(error.message));
};
