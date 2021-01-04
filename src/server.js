import axios from 'axios';

const baseUrl = '/api/stocks';

const getAllStocks = async () => {
	return axios.get(baseUrl).then((res) => res.data);
};

const getStockById = (id) => {
	return axios.get(`${baseUrl}/:id`).then((res) => res.data);
};

const postStock = (stock) => {
	return axios.post(baseUrl, stock).then((res) => res.data);
};

const deleteStock = (id) => {
	return axios.delete(`${baseUrl}/:id`).then((res) => res.data);
};

const updateStock = (id) => {
	return axios.put(`${baseUrl}/:id`).then((res) => res.data);
};

const stocksService = {
	getAllStocks,
	getStockById,
	postStock,
	deleteStock,
};

export default stocksService;
