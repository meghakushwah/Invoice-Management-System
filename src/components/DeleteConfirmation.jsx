import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteInvoice } from '../api/invoiceService';

const DeleteConfirmation = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await deleteInvoice(id);
            navigate('/'); // Redirect to the invoice list after deletion
        } catch (error) {
            console.error('Error deleting invoice:', error);
            alert('Failed to delete the invoice. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/'); // Redirect back to the invoice list
    };

    return (
        <div className="container text-center mt-5">
            <h1>Confirm Deletion</h1>
            <p>Are you sure you want to delete this invoice?</p>
            <div>
                <button className="btn btn-danger me-3" onClick={handleDelete}>
                    Yes, Delete
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
