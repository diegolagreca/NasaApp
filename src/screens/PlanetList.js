import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { fetchPlanets } from '../utils/api';
import PlanetDetailsModal from '../components/PlanetDetailsModal';
import EditPlanetModal from '../components/EditPlanetModal';
import Banner from '../components/Banner';
import styles from '../styles/planetListStyles';

export default function PlanetList({ refreshList }) {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [bannerMessage, setBannerMessage] = useState('');
  const [bannerType, setBannerType] = useState('success'); // success | error

  useEffect(() => {
    loadPlanets();
  }, [refreshList]);

  const loadPlanets = async () => {
    try {
      const data = await fetchPlanets();
      setPlanets(data);
    } catch (error) {
      setBannerMessage('Failed to load planets');
      setBannerType('error');
    }
  };

  const deletePlanet = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this planet?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await axios.delete(`${BASE_URL}/${id}`);
              loadPlanets(); // Refresca la lista después de eliminar
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

  const handleBannerDismiss = () => {
    setBannerMessage('');
    setBannerType('');
  };

  const openEditModal = (planet) => {
    setSelectedPlanet(planet);
    setEditModalVisible(true);
  };

  const renderPlanet = ({ item }) => (
    <View style={styles.planetContainer}>
      <Text style={styles.nameText} onPress={() => setSelectedPlanet(item) || setDetailsModalVisible(true)}>
        {item.name}
      </Text>
      <View style={styles.buttonGroup}>
        <Pressable style={styles.iconButton} onPress={() => openEditModal(item)}>
          <Ionicons name="pencil" size={24} color="black" />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={() => deletePlanet(item.id)}>
          <Ionicons name="trash" size={24} color="red" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Banner de éxito o error */}
      <Banner message={bannerMessage} type={bannerType} onDismiss={handleBannerDismiss} />

      <FlatList
        data={planets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlanet}
      />
      <PlanetDetailsModal
        visible={detailsModalVisible}
        planet={selectedPlanet}
        onClose={() => setDetailsModalVisible(false)}
      />
      <EditPlanetModal
        visible={editModalVisible}
        planet={selectedPlanet}
        onClose={() => {
          setEditModalVisible(false);
          loadPlanets();
          setBannerMessage('Planet updated successfully');
          setBannerType('success');
        }}
      />
    </View>
  );
}
