import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default Home;
