const ContextReducer = (state, action) => {
	switch (action.type) {
		case 'SET_DISPLAY':
			return {
				...state,
				display: { type: action.payload.display, stock: action.payload.stock },
			};
		case 'SET_MESSAGE':
			return {
				...state,
				message: {
					isActive: true,
					type: action.payload.type,
					text: action.payload.text,
				},
			};

		case 'RESET_MESSAGE':
			return {
				...state,
				message: {
					isActive: false,
					type: '',
					text: '',
				},
			};

		case 'ADD_TO_WATCHLIST':
			return {
				...state,
				stocks: [...state.stocks, action.payload],
			};
		case 'GET_DB_STOCKS':
			return {
				...state,
				stocks: [...action.payload],
			};
		case 'DELETE_DB_STOCK':
			console.log(action.payload);
			return {
				...state,
				stocks: state.stocks.filter((stock) => stock.id !== action.payload),
			};
		default:
			return state;
	}
};

export default ContextReducer;
