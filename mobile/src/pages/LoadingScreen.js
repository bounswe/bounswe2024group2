// LoadingScreen.js
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = ({ message = "Loading..." }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0077B6" />
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#0077B6',
  },
});

export default LoadingScreen;
