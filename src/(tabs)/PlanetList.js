import React, { useContext } from 'react';
import { View, FlatList, Text, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlanetContext } from '../context/PlanetContext';
import { deletePlanet } from '../utils/api';
import Banner from '../components/Banner';
import styles from '../styles/planetListStyles';

const PlanetList = ({ navigation }) => {
  const {
    planets,
    bannerMessage,
    setBannerMessage,
    bannerType,
    setBannerType,
    loadPlanets,
  } = useContext(PlanetContext);

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
              setBannerMessage('Planet deleted successfully');
              setBannerType('success');
            } catch (error) {
              setBannerMessage('Failed to delete planet');
              setBannerType('error');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Banner */}
      <Banner
        message={bannerMessage}
        type={bannerType}
        onDismiss={() => setBannerMessage('')}
      />

      {/* Lista de planetas */}
      <FlatList
        data={planets}
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
