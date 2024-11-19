import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function Banner({ message, type, onDismiss }) {
  const opacity = new Animated.Value(1);

  useEffect(() => {
    if (message) {
      // Ocultar automáticamente el banner después de 3 segundos
      const timeout = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          onDismiss(); // Llamar a la función para eliminar el mensaje
        });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  if (!message) return null;

  return (
    <Animated.View style={[styles.banner, styles[type], { opacity }]}>
      <Text style={styles.bannerText}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 10,
  },
  success: {
    backgroundColor: 'green',
  },
  error: {
    backgroundColor: 'red',
  },
  bannerText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
