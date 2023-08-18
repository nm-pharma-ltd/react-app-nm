import axios from 'axios';

const API_BASE_URL = 'http://26.230.153.240:51050/api';  

const ApiService = {
  
 //GET
  get: async (endpoint, headers) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${endpoint}`, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //POST
  post: async (endpoint, data, headers) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Další metody pro další druhy požadavků (PUT, DELETE, apod.)
};

export default ApiService;
