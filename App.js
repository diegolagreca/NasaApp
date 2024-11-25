import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { DestinationProvider } from './src/context/DestinationContext';
import DestinationList from './src/(tabs)/DestinationList';
import AddDestination from './src/(tabs)/AddDestination';
import DestinationDetails from './src/(stack)/DestinationDetails';
import EditDestination from './src/(stack)/EditDestination';

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DestinationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DestinationList" component={DestinationList} options={{ headerShown: false }} />
      <Stack.Screen name="Destination Details" component={DestinationDetails} />
      <Stack.Screen name="Edit Destination" component={EditDestination} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <DestinationProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Destinations Tab') {
                return <Ionicons name="earth" size={size} color={color} />;
              } else if (route.name === 'Add Destination') {
                return <Ionicons name="add-circle" size={size} color={color} />;
              }
            },
          })}
        >
          <Tab.Screen name="Destinations Tab" component={DestinationStack} />
          <Tab.Screen name="Add Destination" component={AddDestination} />
        </Tab.Navigator>
      </NavigationContainer>
    </DestinationProvider>
  );
}
