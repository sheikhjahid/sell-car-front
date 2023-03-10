import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
};

const backend = axios.create(config);

backend.interceptors.request.use((config) => {
  const localStorageData = JSON.parse(localStorage.getItem("data"));

  if (localStorageData && localStorageData?.token) {
    config.headers.Authorization = "Bearer " + localStorageData.token;
  }

  return config;
});

export default backend;
