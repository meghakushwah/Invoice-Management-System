import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/invoices/';

export const getInvoices = (page = 1) => axios.get(`${API_URL}?page=${page}`);
export const createInvoice = (data) => axios.post(API_URL, data);
export const updateInvoice = (id, data) => axios.put(`${API_URL}${id}/`, data);
export const deleteInvoice = (id) => axios.delete(`${API_URL}${id}/`);
