import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    // Fetch products from the API
    useEffect(() => {
        axios.get('/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    // Delete product
    const deleteProduct = (id) => {
        axios.delete(`/products/${id}`)
            .then(() => {
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the product!', error);
            });
    };

    return (
        <div>
            <h2>Product List</h2>
            <button onClick={() => window.location.href = '/create'}>Create Product</button>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.stock}</td>
                            <td>{product.rating}</td>
                            <td>
                                <button onClick={() => window.location.href = `/edit/${product.id}`}>Edit</button>
                                <button onClick={() => deleteProduct(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
