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

	const getDbStocks = async () => {
		try {
			const dbStocks = await stocksService.getAllStocks();

			dispatch({
				type: 'GET_DB_STOCKS',
				payload: dbStocks,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const fetchSymbolMatches = async (symbol) => {
		const matchesApi = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

		try {
			const response = await fetch(matchesApi);
			return response.json();
		} catch (error) {
			console.error(error);
		}
	};

	const fetchStockOverview = (symbol) => {
		const infoApi = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

		fetch(infoApi)
			.then((response) => response.json())
			.then((quote) => formatStockOverview(quote))
			.catch((error) => console.error(error));
	};

	const fetchStockQuote = (symbol) => {
		const quoteApi = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

		return fetch(quoteApi)
			.then((response) => response.json())
			.then((quote) => formatStockQuote(quote))
			.catch((error) => console.error(error));
	};

	const addToWatchlist = async (symbol) => {
		try {
			const stockOverview = await fetchStockOverview(symbol);
			const formattedStockOverview = formatStockOverview(stockOverview);

			const storedStock = await stocksService.postStock(formattedStockOverview);

			dispatch({
				type: 'ADD_TO_WATCHLIST',
				payload: storedStock,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const addToPortfolio = async (symbol, amount, price) => {
		try {
			const stockOverview = await fetchStockOverview(symbol);
			const formattedStockOverview = formatStockOverview(stockOverview);
			const shareholderStock = {
				...formattedStockOverview,
				amountHeld: amount,
				purchasePrice: price,
			};

			const storedStock = await stocksService.postStock(shareholderStock);

			dispatch({
				type: 'ADD_TO_WATCHLIST',
				payload: storedStock,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const deleteDbStock = async (id) => {
		try {
			await stocksService.deleteStock(id);

			dispatch({
				type: 'DELETE_DB_STOCK',
				payload: id,
			});
		} catch (error) {
			console.error(error);
		}
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
