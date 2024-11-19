import React, { createContext, useState, useEffect } from 'react';

import { fetchPlanets } from '../utils/api';

export const PlanetContext = createContext();

export const PlanetProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);

  const loadPlanets = async () => {
    try {
      const data = await fetchPlanets();
      setPlanets(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPlanets();
  }, []);

  return (
    <PlanetContext.Provider
      value={{
        planets,
        setPlanets,
        loadPlanets,
      }}
    >
      {children}
    </PlanetContext.Provider>
  );
};
