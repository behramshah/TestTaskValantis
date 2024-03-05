import axios from 'axios';

const MAX_RETRY_ATTEMPTS = 3; 

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    let retryCount = 0;
    while (retryCount < MAX_RETRY_ATTEMPTS) {
      retryCount++;
      console.error(`Error: ${error.message}. Retrying (${retryCount})...`);
      try {
        return await axiosInstance(error.config);
      } catch (retryError) {
        error = retryError;
      }
    }
    return Promise.reject(error);
});

export default axiosInstance;