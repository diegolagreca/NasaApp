import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { addPlanet } from '../utils/api';
import styles from '../styles/planetFormStyles';

export default function AddPlanet({ onPlanetAdded, setBannerMessage, setBannerType }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [moons, setMoons] = useState('');
  const [moonNames, setMoonNames] = useState('');
  const [image, setImage] = useState('');

  const handleAddPlanet = async () => {
    const newPlanet = {
      name,
      description,
      moons: parseInt(moons, 10) || 0,
      moon_names: moonNames.split(',').map((moon) => moon.trim()),
      image: image || 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
    };

    try {
      await addPlanet(newPlanet);
      setBannerMessage('Planet added successfully');
      setBannerType('success');
      onPlanetAdded(); 
    } catch (error) {
      setBannerMessage('Failed to add planet');
      setBannerType('error');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Description" />
      <TextInput style={styles.input} value={moons} onChangeText={setMoons} keyboardType="numeric" placeholder="Number of Moons" />
      <TextInput style={styles.input} value={moonNames} onChangeText={setMoonNames} placeholder="Moon Names (comma-separated)" />
      <TextInput style={styles.input} value={image} onChangeText={setImage} placeholder="Image URL" />
      <Button title="Add Planet" onPress={handleAddPlanet} />
    </View>
  );
}
