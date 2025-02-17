import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

export const signUpApi = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { username, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup failed.');
  }
};
