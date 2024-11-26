import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/destinationDetailsStyles';
import { likeDestination, unlikeDestination } from '../utils/api';
import { FontAwesome } from '@expo/vector-icons';

export default function DestinationDetails({ route }) {
  const { destination } = route.params;
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const checkLikes = async () => {
      if (destination.favourite == true) {
        setHasLiked(true);
      }
    };
    checkLikes();
  }, []);

  const handleLike = () => {
    try {
      const likedDestination = destination;
      likedDestination.favourite = true;
      likeDestination(destination.id, likedDestination);
      setHasLiked(true);
    } catch (error) {
      console.error('Error liking the destination:', error);
    }
  };

  const handleUnlike = () => {
    try {
      const dislikedDestination = destination;
      destination.favourite = false;
      unlikeDestination(destination.id, dislikedDestination);
      setHasLiked(false);
    } catch (error) {
      console.error('Error disliking:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.name}>{destination.name}</Text>
      <Text style={styles.description}>{destination.description}</Text>
      <Text style={styles.description}>Difficulty: {destination.difficulty}</Text>
      <Text style={styles.description}>Favourite: {destination.favourite}</Text>
      <TouchableOpacity onPress={hasLiked ? handleUnlike : handleLike}>
        <FontAwesome name={hasLiked ? 'heart' : 'heart-o'} size={24} color={hasLiked ? 'red' : 'white'} />
      </TouchableOpacity>

    </View>
  );
};
