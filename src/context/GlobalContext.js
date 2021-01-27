import React, { createContext, useReducer } from 'react';
import ContextReducer from './ContextReducer';
import stocksService from '../server';
import { formatStockOverview, formatStockQuote } from '../utils/stockUtils';

const initialState = {
	stocks: [],
	message: {
		isActive: false,
		type: '',
		text: '',
	},
	display: { type: 'form', stock: {} },
	apiCalls: 0,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(ContextReducer, initialState);

	const setDisplay = (display = 'form', stock = {}) => {
		dispatch({
			type: 'SET_DISPLAY',
			payload: { display, stock },
		});
	};

	const getDbStocks = () => {
		console.log(`Context: Fetching DB stocks...`);

		return stocksService
			.getAllStocks()
			.then((stocks) => {
				dispatch({
					type: 'GET_DB_STOCKS',
					payload: stocks,
				});
			})
			.catch((error) => console.error(error.message));
	};

	const fetchSymbolMatches = (symbol) => {
		const matchesApi = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

		return fetch(matchesApi)
			.then((response) => response.json())
			.catch((error) => console.error(error.message));
	};

	const fetchStockOverview = (symbol) => {
		console.log(`Context: Fetching ${symbol} overview.`);
		const infoApi = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

		return fetch(infoApi)
			.then((response) => response.json())
			.then((overview) => formatStockOverview(overview))
			.catch((error) => console.error(error.message));
	};

	const fetchStockQuote = (symbol) => {
		console.log(`Context: Fetching ${symbol} quote.`);

		const quoteApi = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

		const foundStock = state.stocks.find(
			(item) => item.overview.symbol === symbol
		);

		return fetch(quoteApi)
			.then((response) => response.json())
			.then((quote) => {
				const formattedQuote = formatStockQuote(quote);
				const updatedStock = { ...foundStock, quote: { ...formattedQuote } };
				return stocksService.updateStock(foundStock.id, updatedStock);
			})
			.catch((error) => console.error(error.message));
	};

	const addFundToWatchlist = (symbol, name, type, amount, price) => {
		console.log(`Context: Fetching ${symbol}(fund) quote.`);

		const quoteApi = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

		return fetch(quoteApi)
			.then((res) => res.json())
			.then((quote) => formatStockQuote(quote))
			.then((formatted) => {
				const fund = {
					overview: {
						assetType: type,
						symbol,
						name,
					},
					quote: { ...formatted },
				};

				if (amount > 0 && price > 0) {
					fund.portfolio = { amountHeld: amount, purchasePrice: price };
				}

				return stocksService.postStock(fund);
			})
			.then((storedFund) => {
				dispatch({ type: 'ADD_TO_WATCHLIST', payload: storedFund });
			})
			.catch((error) => console.error(error));
	};

	const addStockToWatchlist = (symbol, amount, price) => {
		fetchStockOverview(symbol)
			.then((overview) => {
				const newStock = {
					overview: { ...overview },
				};

				if (amount) {
					newStock.portfolio = {
						amountHeld: amount,
						purchasePrice: price,
					};
				}

				return stocksService.postStock(newStock);
			})
			.then((storedStock) =>
				dispatch({ type: 'ADD_TO_WATCHLIST', payload: storedStock })
			)
			.catch((error) => console.error(error.message));
	};

	const addToWatchlist = (symbol, name, type, amount, price) => {
		if (state.stocks.find((stock) => stock.overview.symbol === symbol)) {
			return setMessage('error', 'Stock already in your watchlist');
		}

		switch (type) {
			case 'Mutual Fund':
			case 'ETF':
				addFundToWatchlist(symbol, name, type, amount, price);
				break;
			case 'Equity':
			default:
				addStockToWatchlist(symbol, amount, price);
		}
	};

	const deleteDbStock = (id) => {
		stocksService
			.deleteStock(id)
			.then((result) => {
				dispatch({
					type: 'DELETE_DB_STOCK',
					payload: result.removedStock.id,
				});
			})
			.catch((error) => console.error(error));
	};

	const setMessage = (type, text) => {
		dispatch({
			type: 'SET_MESSAGE',
			payload: { type, text },
		});

		setTimeout(() => {
			dispatch({
				type: 'RESET_MESSAGE',
			});
		}, 4000);
	};

	return (
		<GlobalContext.Provider
			value={{
				stocks: state.stocks,
				message: state.message,
				display: state.display,
				apiCalls: state.apiCalls,
				setDisplay,
				fetchSymbolMatches,
				fetchStockOverview,
				fetchStockQuote,
				addToWatchlist,
				deleteDbStock,
				setMessage,
				getDbStocks,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
