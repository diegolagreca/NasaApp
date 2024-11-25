import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export const fetchDestinations = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
};

export const addDestination = async (destination) => {
  try {
    const response = await axios.post(BASE_URL, destination);
    return response.data;
  } catch (error) {
    console.error('Error adding destination:', error);
    throw error;
  }
};

export const updateDestination = async (id, updatedDestination) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedDestination);
    return response.data;
  } catch (error) {
    console.error('Error updating destination:', error);
    throw error;
  }
};


export const deleteDestination = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting destination:', error);
    throw error;
  }
};


export const likeDestination = async (id, updatedDestination) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedDestination);
    return response.data;
  } catch (error) {
    console.error('Error liking destination:', error);
    throw error;
  }
};

export const unlikeDestination = async (id, updatedDestination) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedDestination);
    return response.data;
  } catch (error) {
    console.error('Error disliking destination:', error);
    throw error;
  }
};