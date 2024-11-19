import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { PlanetContext } from '../context/PlanetContext';
import { updatePlanet } from '../utils/api';
import styles from '../styles/planetFormStyles';

const EditPlanet = ({ route, navigation }) => {
  const { planet } = route.params;
  const [name, setName] = useState(planet.name);
  const [description, setDescription] = useState(planet.description);
  const [moons, setMoons] = useState(planet.moons.toString());
  const [moonNames, setMoonNames] = useState(planet.moon_names.join(', '));
  const [image, setImage] = useState(planet.image);
  const {
    loadPlanets
  } = useContext(PlanetContext);

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
      loadPlanets();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <TextInput
        style={styles.input}
        value={moons}
        onChangeText={setMoons}
        placeholder="Number of Moons"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={moonNames}
        onChangeText={setMoonNames}
        placeholder="Moon Names (comma-separated)"
      />
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="Image URL"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditPlanet;
