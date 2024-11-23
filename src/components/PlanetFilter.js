import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal, TextInput, Button } from 'react-native';
import styles from '../styles/modalStyles';
import DropdownMenu from './DropdownMenu';

export default function PlanetFilter({ planets, setFilteredPlanets }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [minMoons, setMinMoons] = useState('');
  const [maxMoons, setMaxMoons] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('no_filter'); // Controla el filtro del dropdown

  // Inicializar la lista de planetas filtrados al cargar el componente
  useEffect(() => {
    setFilteredPlanets(planets);
  }, [planets]);

  const handleApplyFilters = () => {
    let filteredPlanets = planets;

    // Filtro por nombre
    if (name) {
      filteredPlanets = filteredPlanets.filter((planet) =>
        planet.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Filtro por número mínimo de lunas
    if (minMoons) {
      filteredPlanets = filteredPlanets.filter((planet) => planet.moons >= parseInt(minMoons, 10));
    }

    // Filtro por número máximo de lunas
    if (maxMoons) {
      filteredPlanets = filteredPlanets.filter((planet) => planet.moons <= parseInt(maxMoons, 10));
    }

    // Filtro del dropdown
    if (selectedFilter === 'no_moons') {
      filteredPlanets = filteredPlanets.filter((planet) => planet.moons === 0);
    } else if (selectedFilter === 'moons') {
      filteredPlanets = filteredPlanets.filter((planet) => planet.moons > 0);
    }

    // Aplica los filtros combinados
    setFilteredPlanets(filteredPlanets);
    setModalVisible(false);
  };

  const handleClearFilters = () => {
    setName('');
    setMinMoons('');
    setMaxMoons('');
    setSelectedFilter('no_filter'); // Resetea el filtro del dropdown
    setFilteredPlanets(planets); // Reinicia la lista de planetas
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Filters</Text>
      </Pressable>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Planets</Text>
            <TextInput
              style={styles.input}
              placeholder="Name contains String..."
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Minimum Moons"
              keyboardType="numeric"
              value={minMoons}
              onChangeText={setMinMoons}
            />
            <TextInput
              style={styles.input}
              placeholder="Maximum Moons"
              keyboardType="numeric"
              value={maxMoons}
              onChangeText={setMaxMoons}
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
