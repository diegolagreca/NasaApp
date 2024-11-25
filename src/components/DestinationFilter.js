import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal, TextInput, Button } from 'react-native';
import styles from '../styles/modalStyles';
import DropdownMenu from './DropdownMenu';

export default function DestinationFilter({ destinations, setFilteredDestinations }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('no_filter');

  useEffect(() => {
    setFilteredDestinations(destinations);
  }, [destinations]);

  const handleApplyFilters = () => {
    let filteredDestinations = destinations;

    if (name) {
      filteredDestinations = filteredDestinations.filter((destination) =>
        destination.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (selectedFilter === 'no_favs') {
      filteredDestinations = filteredDestinations.filter((destination) => destination.favourite === 0);
    } else if (selectedFilter === 'favs') {
      filteredDestinations = filteredDestinations.filter((destination) => destination.favourite > 0);
    }

    setFilteredDestinations(filteredDestinations);
    setModalVisible(false);
  };

  const handleClearFilters = () => {
    setName('');
    setSelectedFilter('no_filter');
    setFilteredDestinations(destinations);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Filters</Text>
      </Pressable>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Destinations</Text>
            <TextInput
              style={styles.input}
              placeholder="Name contains String..."
              value={name}
              onChangeText={setName}
            />

            {/* Dropdown Menu */}
            <DropdownMenu
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />

            <View style={styles.buttonGroup}>
              <Button title="Clear Filters" onPress={handleClearFilters} />
              <Button title="Apply Filters" onPress={handleApplyFilters} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
