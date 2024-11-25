import React, { createContext, useState, useEffect } from 'react';

import { fetchDestinations } from '../utils/api';

export const DestinationContext = createContext();

export const DestinationProvider = ({ children }) => {
  const [destinations, setDestinations] = useState([]);

  const loadDestinations = async () => {
    try {
      const data = await fetchDestinations();
      setDestinations(data);
     // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  return (
    <DestinationContext.Provider
      value={{
        destinations,
        setDestinations,
        loadDestinations,
      }}
    >
      {children}
    </DestinationContext.Provider>
  );
};
