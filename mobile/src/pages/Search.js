import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles/SearchStyle"
import { useFocusEffect } from '@react-navigation/native';

function Search({navigation, route}) {
    const {searchInput} = route.params;
    const limit = 10;
   

    const [result, setResult] = useState(null);

    const baseURL = 'http://207.154.242.6:8020';
    async function fetchSearch() {
        const searchURL = baseURL + '/query-film-pattern/';
        
        try {
    
          const response = await fetch(searchURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pattern: searchInput,
              limit: limit,
            }),
          }).then(response => response.json()) // Step 2: Parse the JSON response
          .then(json => setResult(json)) // Update state with the parsed data
          .catch(error => console.error(error));
          
          
        /*   console.log(result); */
          
        } catch (error) {
          console.log(error);
          Alert.alert('hata');
        }
      }


      useFocusEffect(
        React.useCallback(() => {
          fetchSearch();
        }, [])
      );


    const renderFilm  = ({item}) => {
        function handleMovie(){
          navigation.navigate("Movie", item);
        }
        return(
          <TouchableOpacity onPress={handleMovie}>
            <View style={styles.item_container}>
                <View style={styles.image_box}>
                    <Image source={require("./assets/movie.png")}
                     style={styles.image}/>
                </View>
                <View style={styles.text_box}>
                    <Text style={styles.item_title} > {item.label}  </Text>
                    <Text style={styles.item_title}> Rating: -/10 </Text>
                </View>
            </View>
          </TouchableOpacity>
        )
    }

    
    return (
        <View style={styles.container}>
            <FlatList data={result}
                renderItem={renderFilm}
            />
        </View>
        
    )
}

export default Search;