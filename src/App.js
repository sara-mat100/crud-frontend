import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

function App() {
    return (
        <div>
            <Routes>
                {/* Define the root route with an element */}
                <Route path="/" element={<ProductList />} />
                <Route path="/create" element={<ProductForm />} />
                <Route path="/edit/:id" element={<ProductForm />} />
            </Routes>
        </div>
           
    );
}

export default App;
