import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlanetList from './src/screens/PlanetList';
import AddPlanet from './src/screens/AddPlanet';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  const [refreshList, setRefreshList] = useState(false);

  const handlePlanetAdded = () => {
    setRefreshList(prev => !prev); // Cambia el estado para forzar la actualización
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Planets') {
              return <Ionicons name="planet" size={size} color={color} />;
            } else if (route.name === 'Add Planet') {
              return <Ionicons name="add-circle" size={size} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Planets">
          {() => <PlanetList refreshList={refreshList} />}
        </Tab.Screen>
        <Tab.Screen name="Add Planet">
          {() => <AddPlanet onPlanetAdded={handlePlanetAdded} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
