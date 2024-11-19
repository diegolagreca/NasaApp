import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { updatePlanet } from '../utils/api'; 
import Banner from '../components/Banner';
import styles from '../styles/planetFormStyles';

export default function EditPlanet({ route, navigation }) {
  const { planet } = route.params;
  const [name, setName] = useState(planet.name);
  const [description, setDescription] = useState(planet.description);
  const [moons, setMoons] = useState(planet.moons.toString());
  const [moonNames, setMoonNames] = useState(planet.moon_names.join(', '));
  const [image, setImage] = useState(planet.image);
  const [bannerMessage, setBannerMessage] = useState('');
  const [bannerType, setBannerType] = useState('success');

  const handleSave = async () => {
    const updatedPlanet = {
      name,
      description,
      moons: parseInt(moons, 10),
      moon_names: moonNames.split(',').map((moon) => moon.trim()),
      image,
    };

    try {
      await updatePlanet(planet.id, updatedPlanet); 
      setBannerMessage('Planet updated successfully');
      setBannerType('success');
      navigation.navigate('Planets'); 
    } catch (error) {
      setBannerMessage('Failed to update planet');
      setBannerType('error');
    }
  };

  return (
    <View style={styles.container}>
      <Banner message={bannerMessage} type={bannerType} onDismiss={() => setBannerMessage('')} />
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Description" />
      <TextInput style={styles.input} value={moons} onChangeText={setMoons} keyboardType="numeric" placeholder="Number of Moons" />
      <TextInput style={styles.input} value={moonNames} onChangeText={setMoonNames} placeholder="Moon Names (comma-separated)" />
      <TextInput style={styles.input} value={image} onChangeText={setImage} placeholder="Image URL" />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}