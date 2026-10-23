export const getApiUrl = () => {
  if (process.env.REACT_APP_API_URL !== undefined && process.env.REACT_APP_API_URL !== '') {
    return process.env.REACT_APP_API_URL;
  }
  if (process.env.REACT_APP_BACKEND_URL !== undefined && process.env.REACT_APP_BACKEND_URL !== '') {
    return process.env.REACT_APP_BACKEND_URL;
  }
  // In production or when accessed via real domain (e.g. spacexio.com), use relative path
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return '';
  }
  if (process.env.NODE_ENV === 'production') {
    return '';
  }
  return 'http://localhost:8080';
};

export const API_URL = getApiUrl();
export default API_URL;
