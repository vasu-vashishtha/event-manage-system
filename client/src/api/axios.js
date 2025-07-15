import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5000/api',
 baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
});

export default instance;