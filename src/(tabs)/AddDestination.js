import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { addDestination } from '../utils/api';
import { DestinationContext } from '../context/DestinationContext';
import styles from '../styles/destinationFormStyles';
import DifficultyPicker from '../components/DifficultyPicker';

const AddDestination = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [favourite, setFavourite] = useState('');

  const {
    loadDestinations
  } = useContext(DestinationContext);


  const handleAddDestination = async () => {
    const newDestination = {
      name,
      description,
      difficulty,
      favourite,
    };

    try {
      await addDestination(newDestination);
      loadDestinations();

      // Clear form
      setName('');
      setDescription('');
      setDifficulty('');
      setFavourite('');

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

      <DifficultyPicker
        selectedDifficulty={difficulty}
        setSelectedDifficulty={setDifficulty}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddDestination}>
        <Text style={styles.buttonText}>Add Destination</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddDestination;
