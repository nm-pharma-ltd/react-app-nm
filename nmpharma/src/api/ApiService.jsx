import axios from 'axios';

//Olas
const API_BASE_URL = 'http://26.199.200.45:51050/api';

//Roman
//const API_BASE_URL = 'http://26.230.153.240:51050/api';


// Create an Axios instance
const apiInstance = axios.create({
  baseURL: API_BASE_URL
});

// // Add a request interceptor
// apiInstance.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// apiInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       error.status = error.response.status; // Attach the status code to the error
//     }
//     return Promise.reject(error);
//   }
// );

const ApiService = {
  
  // GET
  get: async (endpoint, headers_data) => {
    try {
      const response = await apiInstance.get(endpoint, { headers: headers_data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST
  post: async (endpoint, data, headers_data) => {
    try {
      const response = await apiInstance.post(endpoint, data, { headers: headers_data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE
  delete: async (endpoint, headers_data) => {
    try {
      const response = await apiInstance.delete(endpoint, { headers: headers_data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT
  put: async (endpoint, data, headers_data) => {
    try {
      const response = await apiInstance.put(endpoint, data, { headers: headers_data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ApiService;
