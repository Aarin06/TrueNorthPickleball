import axios from 'axios';

// Define the server URL
const SERVER_URL = "https://true-north-pickleball.vercel.app";
// const SERVER_URL = "http://localhost:4000";

// Set axios to include credentials in requests
axios.defaults.withCredentials = true;

const getToken = () => localStorage.getItem('token') || null;


// Need to change for signing multiple waivers
const signWaiver = async (userId, waiverId, checks, signature) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.post(`${SERVER_URL}/api/waivers`, { userId, waiverId, checks, signature}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Get current user function
const getUserWaiver = async (waiverId, userId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get(`${SERVER_URL}/api/waivers/${waiverId}/user/${userId}`, {
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


// Need to change for signing multiple waivers
const getWaiver = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get(`${SERVER_URL}/api/waivers`, {
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
  signWaiver,
  getWaiver,
  getUserWaiver
};
