import axios from 'axios';

const API_BASE = 'https://localhost:7077/api/student'; // adjust port to match your backend api 

const getAll = () => axios.get(API_BASE);
const get = (id) => axios.get(`${API_BASE}/${id}`);
const create = (data) => axios.post(API_BASE, data);
const update = (id, data) => axios.put(`${API_BASE}/${id}`, data);
const remove = (id) => axios.delete(`${API_BASE}/${id}`);

export default { getAll, get, create, update, remove };