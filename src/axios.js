import axios from "axios";

console.log(process.env.REACT_APP_BACKEND_URL)

const config = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
};

const backend = axios.create(config);

export default backend;
