import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createInvoice, updateInvoice } from '../api/invoiceService';

const InvoiceForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        invoice_number: '',
        customer_name: '',
        date: '',
        details: [{ description: '', quantity: 1, unit_price: 0 }],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleDetailChange = (index, field, value) => {
        const newDetails = [...form.details];
        newDetails[index][field] = value;
        setForm({ ...form, details: newDetails });
    };

    const addDetail = () => {
        setForm({ ...form, details: [...form.details, { description: '', quantity: 1, unit_price: 0 }] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateInvoice(id, form);
            } else {
                await createInvoice(form);
            }
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h1>{id ? 'Edit Invoice' : 'Create Invoice'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Invoice Number</label>
                    <input
                        type="text"
                        name="invoice_number"
                        value={form.invoice_number}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Customer Name</label>
                    <input
                        type="text"
                        name="customer_name"
                        value={form.customer_name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <h4>Invoice Details</h4>
                {form.details.map((detail, index) => (
                    <div key={index} className="row mb-3">
                        <div className="col-md-6">
                            <input
                                type="text"
                                placeholder="Description"
                                value={detail.description}
                                onChange={(e) => handleDetailChange(index, 'description', e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={detail.quantity}
                                onChange={(e) => handleDetailChange(index, 'quantity', e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="number"
                                placeholder="Unit Price"
                                value={detail.unit_price}
                                onChange={(e) => handleDetailChange(index, 'unit_price', e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>
                ))}
                <button type="button" onClick={addDetail} className="btn btn-secondary mb-3">Add Item</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default InvoiceForm;
