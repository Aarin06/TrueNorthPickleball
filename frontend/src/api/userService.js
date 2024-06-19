import axios from 'axios';

// Define the server URL
const SERVER_URL = "https://true-north-pickleball.vercel.app";
// const SERVER_URL = "http://localhost:4000";

// Set axios to include credentials in requests
axios.defaults.withCredentials = true;

// Helper function to get the token from localStorage
const getToken = () => localStorage.getItem('token') || null;
const getUserId = () => localStorage.getItem('userId') || null;
const getTeamId = () => localStorage.getItem('teamId') || null;


// Add a user function
const addUser = async (userData) => {
  try {
    console.log(userData);
    const response = await axios.post(`${SERVER_URL}/api/users`, { userData });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Add a user function
const signWaiver = async (userId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.post(`${SERVER_URL}/api/users/waiver`, { userId });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Get current user function
const getWaiver = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/users/waiver/${getUserId()}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};

const getUser = async (userId) => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/users/${userId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};

// Sign in function
const signIn = async (userData) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/users/signin`, { userData }, { withCredentials: true });
    console.log(response.data);

    const token = response.data.token;
    const userId = response.data.userId;
    const teamId = response.data.teamId;
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('teamId', teamId);
    }
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};

// Sign out function
const signOut = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/users/signout`, { withCredentials: true });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('teamId');


    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};

// Get current user function
const getMe = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get(`${SERVER_URL}/api/users/me`, {
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

export {
  addUser,
  signIn,
  signOut,
  getMe,
  getToken,
  getUserId,
  signWaiver,
  getWaiver,
  getTeamId,
  getUser
};
