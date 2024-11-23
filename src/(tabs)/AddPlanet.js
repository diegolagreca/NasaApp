import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { addPlanet } from '../utils/api';
import { PlanetContext } from '../context/PlanetContext';
import styles from '../styles/planetFormStyles';

const AddPlanet = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [moons, setMoons] = useState('');
  const [moonNames, setMoonNames] = useState('');
  const [image, setImage] = useState('');
  const {
    loadPlanets
  } = useContext(PlanetContext);

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
      loadPlanets();

      // Clear form
      setName('');
      setDescription('');
      setMoons('');
      setMoonNames('');
      setImage('');

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
        placeholderTextColor={styles.placeholderGroup.placeholderTextColor}

      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        placeholderTextColor={styles.placeholderGroup.placeholderTextColor}

      />
      <TextInput
        style={styles.input}
        value={moons}
        onChangeText={setMoons}
        placeholder="Number of Moons"
        keyboardType="numeric"
        placeholderTextColor={styles.placeholderGroup.placeholderTextColor}

      />
      <TextInput
        style={styles.input}
        value={moonNames}
        onChangeText={setMoonNames}
        placeholder="Moon Names (comma-separated)"
        placeholderTextColor={styles.placeholderGroup.placeholderTextColor}

      />
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="Image URL"
        placeholderTextColor={styles.placeholderGroup.placeholderTextColor}

      />
      <TouchableOpacity style={styles.button} onPress={handleAddPlanet}>
        <Text style={styles.buttonText}>Add Planet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPlanet;
