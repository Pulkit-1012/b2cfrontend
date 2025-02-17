import axios from 'axios';

export const getUserDetails = async (userId, token) => {
  const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
    headers: { Authorization: token }
  });
  return response.data;
};

export const getUserIndividuals = async (userId, token) => {
  const response = await axios.get(`http://localhost:8080/api/users/${userId}/individuals`, {
    headers: { Authorization: token }
  });
  return response.data;
};


export const addIndividual = async (userId, token, individualData) => {
  const response = await axios.post(`http://localhost:8080/api/users/${userId}/individuals`, individualData, {
    headers: { Authorization: token } //i think idhar content yyoe applicatoin.json bhi aayega
  });
  return response.data;
};