import axios from 'axios';

const baseUrl = '/api/stocks';

const getAllStocks = () => {
	return axios.get(baseUrl).then((res) => res.data);
};

const getStockById = (id) => {
	return axios.get(`${baseUrl}/:id`).then((res) => res.data);
};

const postStock = (stock) => {
	return axios.post(baseUrl).then((res) => res.data);
};

const stocksService = {
	getAllStocks,
	getStockById,
	postStock,
};

export default stocksService;
