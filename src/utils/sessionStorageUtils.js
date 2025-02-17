
export const setSessionToken = (token) => {
    sessionStorage.setItem('access_token', token);
    console.log(access_token);
  };
  
  export const getSessionToken = () => {
    return sessionStorage.getItem('access_token');
  };
  
  export const removeSessionToken = () => {
    sessionStorage.removeItem('access_token');
  };
  