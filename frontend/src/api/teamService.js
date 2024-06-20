import axios from 'axios';  // Ensure axios is imported correctly
const SERVER_URL = "https://true-north-pickleball.vercel.app";
// const SERVER_URL = "http://localhost:4000";

axios.defaults.withCredentials = true;
const getToken = () => localStorage.getItem('token') || null;

const addTeam = async (teamData) => {
  try {
    const response = await axios.post(SERVER_URL + "/api/teams", { teamData: teamData });
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};

const joinTeam = async (teamName, userId) => {
  try {
    const response = await axios.post(SERVER_URL + "/api/teams/join", { teamName: teamName, userId: userId });
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};

const getTeams = async () => {
  try {
    const response = await axios.get(SERVER_URL + "/api/teams");
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};

const getTeam = async (teamId) => {
  try {
    const response = await axios.get(SERVER_URL + `/api/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};

const getPayment = async (teamId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get(SERVER_URL + `/api/teams/${teamId}/payment`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};

const getTeamCaptain = async (teamId) => {
  try {
    const response = await axios.get(SERVER_URL + `/api/teams/${teamId}/captain`);
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};

const getRoster = async (teamId) => {
  try {
    const response = await axios.get(SERVER_URL + `/api/teams/${teamId}/roster`);
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};

const makeTeamPayment = async (teamId, userId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.post(`${SERVER_URL}/api/teams/payment`, { teamId, userId }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error; // Re-throw the error to allow further handling if needed
  }
};

const handlePostPayment = async (teamId, userId, status) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.post(`${SERVER_URL}/api/teams/postpayment`, { teamId, userId, status }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error; // Re-throw the error to allow further handling if needed
  }
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
