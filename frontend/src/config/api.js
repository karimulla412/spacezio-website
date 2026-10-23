export const getApiUrl = () => {
  // If running in browser on a production domain (anything other than localhost/127.0.0.1)
  if (typeof window !== 'undefined' && window.location.hostname) {
    const host = window.location.hostname;
    if (host !== 'localhost' && host !== '127.0.0.1') {
      return '';
    }
  }

  // In production builds (NODE_ENV=production), ALWAYS use relative URL ""
  if (process.env.NODE_ENV === 'production') {
    return '';
  }

  // Explicit non-localhost API override if provided
  if (process.env.REACT_APP_API_URL && !process.env.REACT_APP_API_URL.includes('localhost')) {
    return process.env.REACT_APP_API_URL;
  }

  // Local development only: connect to local Node backend
  return process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
};

export const API_URL = getApiUrl();
export default API_URL;
