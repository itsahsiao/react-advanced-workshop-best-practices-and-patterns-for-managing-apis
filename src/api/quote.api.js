import api from './api';

export const fetchQuotes = ({ page }, config) => {
  return api.get(`quotes?_page=${page}`, config);
}

export const postQuote = (payload, config) => {
  return api.post(`quotes`, payload, config);
}