import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export const fetchPlanets = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching planets:', error);
    throw error;
  }
};

export const addPlanet = async (planet) => {
  try {
    const response = await axios.post(BASE_URL, planet);
    return response.data;
  } catch (error) {
    console.error('Error adding planet:', error);
    throw error;
  }
};

export const updatePlanet = async (id, updatedPlanet) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedPlanet);
    return response.data;
  } catch (error) {
    console.error('Error updating planet:', error);
    throw error;
  }
};

export const deletePlanet = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting planet:', error);
    throw error;
  }
};
