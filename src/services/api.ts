import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Origin': 'https://ramos-automoveis-fe-47a51f7ed71c.herokuapp.com'
  }
});

export default api;