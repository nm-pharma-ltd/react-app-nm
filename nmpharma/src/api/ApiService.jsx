import axios from 'axios';

const API_BASE_URL = 'http://26.230.153.240:51050/api';  

const ApiService = {
  
 //GET
  get: async (endpoint, headers_data) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${endpoint}`, { headers: headers_data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //POST
  post: async (endpoint, data, headers_data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, { headers: headers_data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE
  delete: async (endpoint, headers_data) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${endpoint}`, { headers: headers_data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
};

export default ApiService;
