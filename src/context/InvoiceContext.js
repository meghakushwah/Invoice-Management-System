import React, { createContext, useReducer } from 'react';
import { getInvoices, createInvoice, updateInvoice, deleteInvoice } from '../api/invoiceService';

const InvoiceContext = createContext();

const initialState = { invoices: [], loading: false, error: null };

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return { ...state, invoices: action.payload, loading: false };
        case 'FETCH_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'LOADING':
            return { ...state, loading: true };
        default:
            return state;
    }
};

export const InvoiceProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchInvoices = async () => {
        dispatch({ type: 'LOADING' });
        try {
            const response = await getInvoices();
            dispatch({ type: 'FETCH_SUCCESS', payload: response.data.results });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
    };

    return (
        <InvoiceContext.Provider value={{ ...state, fetchInvoices }}>
            {children}
        </InvoiceContext.Provider>
    );
};

export default InvoiceContext;
