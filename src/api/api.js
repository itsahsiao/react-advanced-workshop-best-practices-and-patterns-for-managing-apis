import axios from "axios";

// create a wrapper to enhance logic around axios client

const axiosParams = {
  baseURL: "http://localhost:4000/",
};

const axiosInstance = axios.create(axiosParams);

const api = (axiosInstance) => {
  return {
    get: (url, config) => axiosInstance.get(url, config),
    post: (url, body, config) => axiosInstance.post(url, body, config),
    // put: (url, body) => client.put(url, body),
    // delete: url => client.delete(url)
  };
};

export default api(axiosInstance);
