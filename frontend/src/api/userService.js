import axios from 'axios';  // Ensure axios is imported correctly

const SERVER_URL = "http://localhost:4000";
axios.defaults.withCredentials = true;
const addUser = function (userData) {
  console.log(userData)
  return axios.post(SERVER_URL + "/api/users", { userData: userData })
    .then((res) => res.data)
    .catch((error) => {
      console.error(error.message);
      throw error;
    });
};

const signIn = function (userData) {
  console.log("here")
  return axios.post(SERVER_URL + "/api/users/signin", { userData: userData }, { withCredentials: true })
    .then((res) => {
      console.log(res);
      return res.data})
    .catch((error) => {
      console.error('There was a problem with the axios operation:', error);
      throw error;
    });
};

const signOut = function () {
  return axios.get(SERVER_URL + "/api/users/signout", { withCredentials: true })
    .then((res) => res.data)
    .catch((error) => {
      console.error('There was a problem with the axios operation:', error);
    });
};

const getMe = function () {
  return axios.get(SERVER_URL + "/api/users/me", { withCredentials: true })
    .then((res) => res.data)
    .catch((error) => {
      console.error('There was a problem with the axios operation:', error);
      throw error;
    });
};

export {
  addUser,
  signIn,
  signOut,
  getMe
};
