import axios from "axios";

const axiosParams = {
  baseURL: "http://localhost:4000/",
};

const axiosInstance = axios.create(axiosParams);

// calling withAbort with method (get, post), then with the args (url, config, ...)
const withAbort = (fn) => {
  return async (...args) => {
    // const originalConfig = args[args.length - 1]
    const originalConfig = args.at(-1);
    const { abort, ...config } = originalConfig;

    if (typeof abort === "function") {
      const controller = new AbortController();
      config.signal = controller.signal;
      abort(controller.abort.bind(controller));
    }

    try {
      if (args.length > 2) {
        const [url, body] = args;
        // need await so that the error is caught in the try/catch context
        return await fn(url, body, config);
      } else {
        const [url] = args;
        // need await so that the error is caught in the try/catch context
        return await fn(url, config);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        error.aborted = true;
      } else {
        error.aborted = false;
      }

      throw error;
    }
  };
};

const api = (client) => {
  return {
    get: (url, config) => withAbort(client.get)(url, config),
    post: (url, body, config) => withAbort(client.post)(url, body, config),
  };
};

export default api(axiosInstance);
