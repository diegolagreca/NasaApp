import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { PlanetProvider } from './src/context/PlanetContext';
import PlanetList from './src/(tabs)/PlanetList';
import AddPlanet from './src/(tabs)/AddPlanet';
import PlanetDetails from './src/(stack)/PlanetDetails';
import EditPlanet from './src/(stack)/EditPlanet';

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function PlanetStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PlanetList" component={PlanetList} options={{ headerShown: false }} />
      <Stack.Screen name="Planet Details" component={PlanetDetails} />
      <Stack.Screen name="Edit Planet" component={EditPlanet} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PlanetProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Planets Tab') {
                return <Ionicons name="planet" size={size} color={color} />;
              } else if (route.name === 'Add Planet') {
                return <Ionicons name="add-circle" size={size} color={color} />;
              }
            },
          })}
        >
          <Tab.Screen name="Planets Tab" component={PlanetStack} />
          <Tab.Screen name="Add Planet" component={AddPlanet} />
        </Tab.Navigator>
      </NavigationContainer>
    </PlanetProvider>
  );
}
