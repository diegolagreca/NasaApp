import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { DestinationContext } from '../context/DestinationContext';
import { updateDestination } from '../utils/api';
import styles from '../styles/destinationFormStyles';
import DifficultyPicker from '../components/DifficultyPicker';

const EditDestination = ({ route, navigation }) => {
  const { destination } = route.params;
  const [name, setName] = useState(destination.name);
  const [description, setDescription] = useState(destination.description);
  const [difficulty, setDifficulty] = useState(destination.difficulty);
  const {
    loadDestinations
  } = useContext(DestinationContext);

  const handleSave = async () => {
    const updatedDestination = {
      name,
      description,
      difficulty
    };
    navigation.goBack();

    try {
      await updateDestination(destination.id, updatedDestination);
      loadDestinations();
    } catch (error) {
      console.log(error);
    }
    navigation.goBack();

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

      <DifficultyPicker
        selectedDifficulty={difficulty}
        setSelectedDifficulty={setDifficulty}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditDestination;
