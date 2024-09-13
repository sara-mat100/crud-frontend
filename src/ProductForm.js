import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';  // Import Axios instance
import { useParams, useNavigate } from 'react-router-dom';  // For route parameters and navigation

const ProductForm = () => {
    const { id } = useParams();  // Get product ID from the URL (if editing)
    const navigate = useNavigate();  // For navigation after form submission or deletion

    // State for managing product form fields
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        rating: ''
    });

    const [loading, setLoading] = useState(true);

    // Fetch product data if editing
    useEffect(() => {
        if (id) {
            // Fetch product if an ID exists (edit mode)
            axios.get(`/products/${id}`)
                .then(response => {
                    setProduct(response.data);  // Populate form with product data
                    setLoading(false);  // Loading finished
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                    setLoading(false);  // Loading finished even if there's an error
                });
        } else {
            setLoading(false);  // No need to fetch if creating new product
        }
    }, [id]);

    // Handle form submission for both creating and updating a product
    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            // Update product if we're editing
            axios.put(`/products/${id}`, product)
                .then(() => {
                    navigate('/');  // Redirect to product list after successful update
                })
                .catch(error => {
                    console.error('Error updating product:', error);
                });
        } else {
            // Create a new product if we're not editing
            axios.post('/products', product)
                .then(() => {
                    navigate('/');  // Redirect to product list after successful creation
                })
                .catch(error => {
                    console.error('Error creating product:', error);
                });
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // Handle product deletion
    const handleDelete = () => {
        if (id) {
            axios.delete(`/products/${id}`)
                .then(() => {
                    navigate('/');  // Redirect to product list after successful deletion
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
                });
        }
    };

    if (loading) return <div>Loading...</div>;  // Show loading state while fetching data

    return (
        <div>
            <h2>{id ? 'Edit Product' : 'Create Product'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={product.rating}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{id ? 'Update Product' : 'Create Product'}</button>
                {id && (
                    <button type="button" onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                        Delete Product
                    </button>
                )}
            </form>
        </div>
    );
};

export default ProductForm;
