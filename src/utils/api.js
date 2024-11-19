import axios from 'axios';
import { BASE_URL } from '../constants';

// Obtener todos los planetas
export const fetchPlanets = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch planets:', error);
    throw error;
  }
};

// Eliminar un planeta por ID
export const deletePlanet = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Failed to delete planet:', error);
    throw error;
  }
};

// Agregar un nuevo planeta
export const addPlanet = async (planet) => {
  try {
    await axios.post(BASE_URL, planet);
  } catch (error) {
    console.error('Failed to add planet:', error);
    throw error;
  }
};

// Actualizar un planeta existente
export const updatePlanet = async (id, planet) => {
  try {
    await axios.put(`${BASE_URL}/${id}`, planet);
  } catch (error) {
    console.error('Failed to update planet:', error);
    throw error;
  }
};
