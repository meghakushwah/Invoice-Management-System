import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';
import DeleteConfirmation from './components/DeleteConfirmation';
import { InvoiceProvider } from './context/InvoiceContext';

function App() {
    return (
        <InvoiceProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<InvoiceList />} />
                    <Route path="/create" element={<InvoiceForm />} />
                    <Route path="/edit/:id" element={<InvoiceForm />} />
                    <Route path="/delete/:id" element={<DeleteConfirmation />} />
                </Routes>
            </Router>
        </InvoiceProvider>
    );
}

export default App;
