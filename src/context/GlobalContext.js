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
		stocksService
			.getAllStocks()
			.then((stocks) => {
				dispatch({
					type: 'GET_DB_STOCKS',
					payload: stocks,
				});
			})
			.catch((error) => console.error(error.message));
	};

	const fetchSymbolMatches = async (symbol) => {
		const matchesApi = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

		try {
			const response = await fetch(matchesApi);
			return response.json();
		} catch (error) {
			console.error(error.message);
		}
	};

	const fetchStockOverview = (symbol) => {
		console.log(`Context: Fetching ${symbol} overview.`);
		const infoApi = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

		return fetch(infoApi)
			.then((response) => response.json())
			.then((quote) => formatStockOverview(quote))
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

	const addToWatchlist = (symbol) => {
		fetchStockOverview(symbol)
			.then((stock) => {
				const newStock = {
					overview: {
						...stock,
					},
				};
				return stocksService.postStock(newStock);
			})
			.then((storedStock) =>
				dispatch({ type: 'ADD_TO_WATCHLIST', payload: storedStock })
			)
			.catch((error) => console.error(error.message));
	};

	const addToPortfolio = (symbol, amount, price) => {
		fetchStockOverview(symbol)
			.then((response) => {
				return stocksService.postStock({
					overview: {
						...response,
					},
					portfolio: {
						amountHeld: amount,
						purchasePrice: price,
					},
				});
			})
			.then((storedStock) => {
				dispatch({
					type: 'ADD_TO_WATCHLIST',
					payload: storedStock,
				});
			})
			.catch((error) => console.error(error.message));
	};

	const deleteDbStock = (id) => {
		console.log(`Deleting stock with id ${id}...`);
		stocksService
			.deleteStock(id)
			.then((result) => {
				dispatch({
					type: 'DELETE_DB_STOCK',
					payload: id,
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
				setDisplay,
				fetchSymbolMatches,
				fetchStockOverview,
				fetchStockQuote,
				addToWatchlist,
				addToPortfolio,
				deleteDbStock,
				setMessage,
				getDbStocks,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
