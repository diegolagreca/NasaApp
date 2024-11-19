import React from 'react';
import { View, Text, Image, SectionList } from 'react-native';
import styles from '../styles/planetDetailsStyles';

export default function PlanetDetails({ route }) {
  const { planet } = route.params;

  const sections = [
    {
      title: 'Moons',
      data: planet.moon_names.length ? planet.moon_names : ['No moons'],
    },
  ];

  return (
    <View style={styles.container}>
      <Image source={{ uri: planet.image }} style={styles.image} />
      <Text style={styles.name}>{planet.name}</Text>
      <Text style={styles.description}>{planet.description}</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title} ({planet.moons}) </Text>
        )}
      />
    </View>
  );
};
