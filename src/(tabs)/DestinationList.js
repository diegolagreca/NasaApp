import React, { useState, useContext } from 'react';
import { View, FlatList, Text, Pressable, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DestinationContext } from '../context/DestinationContext';
import { deleteDestination } from '../utils/api';
import DestinationFilter from '../components/DestinationFilter';
import styles from '../styles/destinationListStyles';

const DestinationList = ({ navigation }) => {
  const { destinations, loadDestinations } = useContext(DestinationContext);
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);


  const handleDeleteDestination = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this destination?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteDestination(id);
              loadDestinations();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <DestinationFilter destinations={destinations} setFilteredDestinations={setFilteredDestinations} />

      <FlatList
        data={filteredDestinations}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.destinationContainer}>
            <Text
              style={styles.nameText}
              onPress={() => navigation.navigate('Destination Details', { destination: item })}
            >
              {item.name}
            </Text>
            <Text> {console.log(item)} </Text>
          
            <View style={styles.buttonGroup}>


              <Pressable
                style={styles.iconButton}
                onPress={() => navigation.navigate('Edit Destination', { destination: item })}
              >
                <Ionicons name="pencil" size={24} color="black" />
              </Pressable>
              <Pressable
                style={styles.iconButton}
                onPress={() => handleDeleteDestination(item.id)}
              >
                <Ionicons name="trash" size={24} color="red" />
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default DestinationList;
