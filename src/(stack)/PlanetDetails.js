import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/planetDetailsStyles';

export default function PlanetDetails({ route }) {
  const { planet } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{planet.name}</Text>
      <Image
        source={{ uri: planet.image }}
        style={styles.image}
      />
      <Text>{planet.description}</Text>
      <Text>Moons: {planet.moons}</Text>
      <Text>Moon Names: {planet.moon_names.join(', ')}</Text>
    </View>
  );
}