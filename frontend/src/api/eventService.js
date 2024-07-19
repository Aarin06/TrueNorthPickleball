import axios from 'axios';  // Ensure axios is imported correctly
const SERVER_URL = "https://true-north-pickleball.vercel.app";
// const SERVER_URL = "http://localhost:4000";

axios.defaults.withCredentials = true;
const getToken = () => localStorage.getItem('token') || null;

const getEvents = async () => {
  try {
    const response = await axios.get(SERVER_URL + "/api/events");
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};

const getEvent = async (eventId) => {
  try {
    const response = await axios.get(SERVER_URL + `/api/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};

const isRegistered = async (teamId, eventId) => {
  try {
    const response = await axios.get(SERVER_URL + `/api/events/${eventId}/registered/${teamId}`);
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
};


export {
  getEvents,
  getEvent,
  isRegistered
};
