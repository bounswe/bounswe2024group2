import React, { useState, useEffect } from "react";
import { View, Image, Text, FlatList, StyleSheet } from "react-native";
import config from "../config";
import styles from "./styles/ActorStyle"
import { useFocusEffect } from '@react-navigation/native';

function Actor({ route }) {
  const [actorInfo, setActorInfo] = useState({
    name: "",
    description: "",
    image: "",
    films: [],
  });
 
  const actor = route.params;
  const entity_id = actor.id.split("/").pop();
  const baseURL = 'http://207.154.242.6:8020';

  async function fetchActor() {
    const actorURL = baseURL + '/get-actor-details/';

    try {
      const response = await fetch(actorURL, {
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
      setActorInfo(json[0]);
    } catch (error) {
      console.error(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchActor();
    }, [])
  );
  
  return (
    <View style={styles.container}>
        {actorInfo.image ? 
        <Image src={ actorInfo.image } style={styles.image} /> :
        <Image source={require("./assets/male.png")} style={styles.image} /> }
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{actorInfo.name}</Text>
        <Text style={styles.description}>{actorInfo.description}</Text>
        <Text style={styles.header}>Films:</Text>
        <FlatList
          data={actorInfo.films}
          renderItem={({ item }) => <Text style={styles.film}>{item.label}</Text>}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

export default Actor;