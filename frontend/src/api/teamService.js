import axios from 'axios';  // Ensure axios is imported correctly
const SERVER_URL = "https://true-north-pickleball.vercel.app";
axios.defaults.withCredentials = true;

const addTeam = function (teamData) {
  console.log(teamData)
  return axios.post(SERVER_URL + "/api/teams", { teamData: teamData })
    .then((res) => res.data)
    .catch((error) => {
      console.error('There was a problem with the axios operation:', error);
    });
};

const joinTeam = function (teamName, userId) {
  return axios.post(SERVER_URL + "/api/teams/join", { teamName: teamName, userId: userId })
    .then((res) => res.data)
    .catch((error) => {
      console.error('There was a problem with the axios operation:', error);
    });
};

const getTeams = function () {
  return axios.get(SERVER_URL + "/api/teams")
    .then((res) => res.data)
    .catch((error) => {
      console.error('There was a problem with the axios operation:', error);
    });
};

const getTeam = function (teamId) {
  return axios.get(SERVER_URL + `/api/teams/${teamId}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error('There was a problem with the axios operation:', error);
    });
};

const getPayment = function (teamId) {
  return axios.get(SERVER_URL + `/api/teams/${teamId}/payment`)
    .then((res) => res.data)
    .catch((error) => {
      console.error('There was a problem with the axios operation:', error);
      throw error;
    });
};

const getTeamCaptain = function (teamId) {
  return axios.get(SERVER_URL + `/api/teams/${teamId}/captain`)
    .then((res) => res.data)
    .catch((error) => {
      console.error('There was a problem with the axios operation:', error);
    });
};

const getRoster = function (teamId) {
  return axios.get(SERVER_URL + `/api/teams/${teamId}/roster`)
    .then((res) => res.data)
    .catch((error) => {
      console.error('There was a problem with the axios operation:', error);
    });
};

const makeTeamPayment = function (teamId, userId) {
  return axios.post(`${SERVER_URL}/api/teams/payment`, { teamId, userId })
    .then((res) => res.data)
    .catch((error) => {
      console.error('There was a problem with the axios operation:', error);
      throw error; // Re-throw the error to allow further handling if needed
    });
};

const handlePostPayment = function (teamId, userId, status) {
  return axios.post(`${SERVER_URL}/api/teams/postpayment`, { teamId, userId, status })
    .then((res) => res.data)
    .catch((error) => {
      console.error('There was a problem with the axios operation:', error);
      throw error; // Re-throw the error to allow further handling if needed
    });
};

export {
  addTeam,
  getTeams,
  joinTeam,
  getTeam,
  getTeamCaptain,
  getRoster,
  makeTeamPayment,
  handlePostPayment,
  getPayment
};
