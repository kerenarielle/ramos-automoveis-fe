import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Origin': process.env.REACT_APP_FRONTEND
  }
});

export default api;