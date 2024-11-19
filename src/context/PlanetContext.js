import React, { createContext, useState, useEffect } from 'react';
import { Text } from 'react-native';

import { fetchPlanets } from '../utils/api';

export const PlanetContext = createContext();

export const PlanetProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [bannerMessage, setBannerMessage] = useState('');
  const [bannerType, setBannerType] = useState('success');

  const loadPlanets = async () => {
    try {
      const data = await fetchPlanets();
      setPlanets(data);
    } catch (error) {
      setBannerMessage('Failed to load planets');
      setBannerType('error');
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
        bannerMessage,
        setBannerMessage,
        bannerType,
        setBannerType,
        loadPlanets,
      }}
    >
      {children}
    </PlanetContext.Provider>
  );
};
