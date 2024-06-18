import axios from 'axios';

// Define the server URL
const SERVER_URL = "https://true-north-pickleball.vercel.app/";

// Set axios to include credentials in requests
axios.defaults.withCredentials = true;

// Helper function to get the token from localStorage
const getToken = () => localStorage.getItem('token');
const getUserId = () => localStorage.getItem('userId');


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

// Sign in function
const signIn = async (userData) => {
  try {
    console.log("here");
    const response = await axios.post(`${SERVER_URL}/api/users/signin`, { userData }, { withCredentials: true });
    const token = response.data.token;
    const userId = response.data.userId;
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

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
  getWaiver
};
