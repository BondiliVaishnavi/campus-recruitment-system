import axios from "axios";

const api = axios.create({
  baseURL: "https://campus-recruitment-system-aij7.onrender.com"
});

export default api;