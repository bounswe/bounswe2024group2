import React, { useState, useEffect } from "react";
import { View, Image, Text, FlatList, StyleSheet } from "react-native";
import config from "../config";
import styles from "./styles/DirectorStyle"


function Director({ route }) {
  const [directorInfo, setDirectorInfo] = useState({
    name: "",
    description: "",
    image: "",
    films: [],
  });

  const director = route.params;
  const entity_id = director.id.split("/").pop();
  const baseURL = 'http://207.154.242.6:8020';

  async function fetchDirector() {
    const directorURL = baseURL + '/get-director-details/';

    try {
      const response = await fetch(directorURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.token}`
        },
        body: JSON.stringify({
          entity_id: entity_id,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const json = await response.json();
      setDirectorInfo(json[0]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDirector();
  }, []);


  return (
    <View style={styles.container}>
        {directorInfo.image ? 
        <Image source={{ uri: directorInfo.image  }} style={styles.image} /> :
        <Image source={require("./assets/male.png")} style={styles.image} /> }
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{directorInfo.name}</Text>
        <Text style={styles.description}>{directorInfo.description}</Text>
        <Text style={styles.header}>Films:</Text>
        <FlatList
          data={directorInfo.films}
          renderItem={({ item }) => <Text style={styles.film}>{item.label}</Text>}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

export default Director;