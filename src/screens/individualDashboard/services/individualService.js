import axios from "axios";

export const getIndividualDetails = async (userId, individualId, token) => {
  const response = await axios.get(`http://localhost:8080/api/users/${userId}/individuals/${individualId}`, {
    headers: { Authorization: token }
  });
  return response.data;
};

export const onboardIndividual = async (userId, individualId, token) => {
  const response = await axios.post(`http://localhost:8080/api/users/${userId}/individuals/${individualId}/onboard-individual`,{}, {
    headers: { Authorization: token }
  });
  return response.data;//contains the individualId(jo onboard hone ke baad milti hai)
};

export const verifyGDC = async (userId, individualId, token) => {
  const response = await axios.post(`http://localhost:8080/api/users/${userId}/individuals/${individualId}/verify-gdc`, {}, {
    headers: { Authorization: token }
  });
  return response.data; //return the requestID (gdc verification ki request id)
};

export const checkStatus = async (userId, individualId, token, id) => {
  const response = await axios.get(`http://localhost:8080/api/users/${userId}/individuals/${individualId}/verify-gdc/${id}`, {
    headers: { Authorization: token }
  });
  return response.data;
};


export const deleteIndividual = async (userId, token, individualId) => {
  console.log(token);
  
  await axios.delete(`http://localhost:8080/api/users/${userId}/individuals/${individualId}/delete`,{}, {
    headers: { Authorization: token }
  });
  return;
}


export const getVerificationList = async (userId, individualId, token) => {
  const response = await axios.get(`http://localhost:8080/api/users/${userId}/individuals/${individualId}/verifications`, {
    headers: { Authorization: token}
  });

  return response.data;
}