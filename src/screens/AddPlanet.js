import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants';
import Banner from '../components/banner';

export default function AddPlanet({ onPlanetAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [moons, setMoons] = useState('');
  const [moonNames, setMoonNames] = useState('');
  const [image, setImage] = useState('');
  const [bannerMessage, setBannerMessage] = useState('');
  const [bannerType, setBannerType] = useState('success');

  const handleAddPlanet = async () => {
    const newPlanet = {
      name,
      description,
      moons: parseInt(moons, 10) || 0,
      moon_names: moonNames.split(',').map((moon) => moon.trim()),
      image: image || 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
    };

    try {
      await axios.post(BASE_URL, newPlanet);
      onPlanetAdded(); // Notifica al padre
      setBannerMessage('Planet added successfully');
      setBannerType('success');
      clearForm();
    } catch (error) {
      setBannerMessage('Failed to add planet');
      setBannerType('error');
    }
  };

  const clearForm = () => {
    setName('');
    setDescription('');
    setMoons('');
    setMoonNames('');
    setImage('');
  };

  return (
    <View style={styles.container}>
      <Banner message={bannerMessage} type={bannerType} onDismiss={() => setBannerMessage('')} />
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Number of Moons" value={moons} onChangeText={setMoons} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Moon Names (comma-separated)" value={moonNames} onChangeText={setMoonNames} />
      <TextInput style={styles.input} placeholder="Image URL" value={image} onChangeText={setImage} />
      <Button title="Add Planet" onPress={handleAddPlanet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 16, borderRadius: 8 },
});
