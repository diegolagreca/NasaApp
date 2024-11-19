import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants';
import styles from '../styles/modalStyles';

export default function EditPlanetModal({ visible, planet, onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [moons, setMoons] = useState('');
  const [moonNames, setMoonNames] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (planet) {
      setName(planet.name || '');
      setDescription(planet.description || '');
      setMoons(planet.moons?.toString() || '');
      setMoonNames(planet.moon_names?.join(', ') || '');
      setImage(planet.image || '');
    }
  }, [planet]);

  const handleSave = async () => {
    if (!planet) return;

    const updatedPlanet = {
      name,
      description,
      moons: parseInt(moons, 10),
      moon_names: moonNames.split(',').map((moon) => moon.trim()),
      image,
    };

    try {
      await axios.put(`${BASE_URL}/${planet.id}`, updatedPlanet);  
      onClose(); 
    } catch (error) {
      console.error('Failed to update planet:', error);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text>X</Text>
          </Pressable>
          <Text style={styles.modalTitle}>Edit {planet?.name}</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
          <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Description" />
          <TextInput style={styles.input} value={moons} onChangeText={setMoons} placeholder="Number of Moons" keyboardType="numeric" />
          <TextInput style={styles.input} value={moonNames} onChangeText={setMoonNames} placeholder="Moon Names (comma-separated)" />
          <TextInput style={styles.input} value={image} onChangeText={setImage} placeholder="Image URL" />
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
}
