import axios from 'axios';

let baseURL = 'http://localhost:8080/api/v1';

const api = axios.create({
	baseURL,
});

export default api;
