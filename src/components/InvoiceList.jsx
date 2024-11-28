import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import InvoiceContext from '../context/InvoiceContext';

const InvoiceList = () => {
    const { invoices, loading, error, fetchInvoices } = useContext(InvoiceContext);

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container">
            <h1>Invoice List</h1>
            <Link to="/create" className="btn btn-primary mb-3">Create Invoice</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Invoice #</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td>{invoice.invoice_number}</td>
                            <td>{invoice.customer_name}</td>
                            <td>{invoice.date}</td>
                            <td>${invoice.total_amount}</td>
                            <td>
                                <Link to={`/edit/${invoice.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <Link to={`/delete/${invoice.id}`} className="btn btn-danger btn-sm">Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceList;
