import axios from 'axios';

const ApiService = {
//GET
  get: async (url, headers) => {
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //POST
  post: async (url, data, headers) => {
    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Další metody pro další druhy požadavků (PUT, DELETE, apod.)
};

export default ApiService;
