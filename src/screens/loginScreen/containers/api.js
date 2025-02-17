import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

export const signInApi = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/authenticate`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed.');
  }
};
