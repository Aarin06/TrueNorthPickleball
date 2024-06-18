import axios from 'axios';  // Ensure axios is imported correctly
const SERVER_URL = "http://localhost:4000";
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
  return axios.post(SERVER_URL + "/api/teams/payment", { teamId: teamId, userId: userId })
    .then((res) => res.data)
    .catch((error) => {
      console.error('There was a problem with the axios operation:', error);
    });
};

export {
  addTeam,
  getTeams,
  joinTeam,
  getTeam,
  getTeamCaptain,
  getRoster,
  makeTeamPayment
};
