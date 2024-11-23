import React, { useState, useContext } from 'react';
import { View, FlatList, Text, Pressable, Alert, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlanetContext } from '../context/PlanetContext';
import { deletePlanet } from '../utils/api';
import PlanetFilter from '../components/PlanetFilter';
import CameraModal from '../components/CameraModal';
import styles from '../styles/planetListStyles';

const PlanetList = ({ navigation }) => {
  const { planets, loadPlanets } = useContext(PlanetContext);
  const [filteredPlanets, setFilteredPlanets] = useState(planets);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);

  const handleDeletePlanet = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this planet?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deletePlanet(id);
              loadPlanets();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <PlanetFilter planets={planets} setFilteredPlanets={setFilteredPlanets} />

      <Button title="Camera" onPress={() => setIsCameraModalVisible(true)} />

      <CameraModal
        visible={isCameraModalVisible}
        onClose={() => setIsCameraModalVisible(false)}
      />

      <FlatList
        data={filteredPlanets}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
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
                onPress={() => handleDeletePlanet(item.id)}
              >
                <Ionicons name="trash" size={24} color="red" />
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PlanetList;
