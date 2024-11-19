import axios from 'axios';
import { BASE_URL } from '../constants';

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
    await axios.post(BASE_URL, planet);
  } catch (error) {
    console.error('Error adding planet:', error);
    throw error;
  }
};
