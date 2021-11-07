import axios from 'axios';

const ENDPOINT_BASE = 'https://crudcrud.com/api/e0a4727da7b048aaad2a0222e2a2dcf3/items';

export const getItems = async () => axios.get(ENDPOINT_BASE);

export const updateItem = async (id, payload) => (
  axios.put(`${ENDPOINT_BASE}/${id}`, payload)
);

export const deleteItem = async (id) => axios.delete(`${ENDPOINT_BASE}/${id}`);

export const newItem = async (payload) => axios.post(ENDPOINT_BASE, payload);

export const getItem = async (id) => axios.get(`${ENDPOINT_BASE}/${id}`);
