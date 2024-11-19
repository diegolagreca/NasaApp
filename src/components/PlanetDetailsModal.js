import React from 'react';
import { View, Text, Modal, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/modalStyles';

export default function PlanetDetailsModal({ visible, planet, onClose }) {
  if (!planet) return null; 

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </Pressable>
          <Text style={styles.modalTitle}>{planet.name}</Text>
          <Image
            source={{
              uri: planet.image || 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
            }}
            style={styles.planetImage}
          />
          <Text style={styles.modalText}>{planet.description}</Text>
          <Text style={styles.modalText}>Moons: {planet.moons}</Text>
          <Text style={styles.modalText}>
            Moon Names: {planet.moon_names.length ? planet.moon_names.join(', ') : 'None'}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
