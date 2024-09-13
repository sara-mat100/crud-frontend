import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace this with your actual API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
