import React, { useEffect } from 'react';
import { Text, Animated } from 'react-native';
import styles from '../styles/bannerStyles';


export default function Banner({ message, type, onDismiss }) {
  const opacity = new Animated.Value(1);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          onDismiss(); 
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