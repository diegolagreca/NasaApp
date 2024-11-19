import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchPlanets, deletePlanet } from '../utils/api'; // Importar funciones de API
import styles from '../styles/planetListStyles';

export default function PlanetList({ navigation }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    loadPlanets();
  }, []);

  const loadPlanets = async () => {
    try {
      const data = await fetchPlanets();
      setPlanets(data);
    } catch (error) {
      console.error('Failed to load planets:', error);
    }
  };

  const handleDeletePlanet = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this planet?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deletePlanet(id); // Llama a la función de la API
              loadPlanets(); // Actualiza la lista
            } catch (error) {
              console.error('Failed to delete planet:', error);
            }
          },
        },
      ]
    );
  };

  const renderPlanet = ({ item }) => (
    <View style={styles.planetContainer}>
      <Text
        style={styles.nameText}
        onPress={() => navigation.navigate('Planet Details', { planet: item })}
      >
        {item.name}
      </Text>
      <View style={styles.buttonGroup}>
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.navigate('Edit Planet', { planet: item })}
        >
          <Ionicons name="pencil" size={24} color="black" />
        </Pressable>
        <Pressable
          style={styles.iconButton}
          onPress={() => handleDeletePlanet(item.id)} // Llama a la función de borrado
        >
          <Ionicons name="trash" size={24} color="red" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={planets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlanet}
      />
    </View>
  );
}
