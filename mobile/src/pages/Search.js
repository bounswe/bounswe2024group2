import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Text, View } from "react-native";
import styles from "./styles/SearchStyle"

function Search({navigation, route}) {
    const {searchInput} = route.params;
    const limit = 10;
    console.log(searchInput)

    const [result, setResult] = useState(null);

    const baseURL = 'http://207.154.242.6:8020';
    async function handleSearch() {
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
          
          
          console.log(result);
          
        } catch (error) {
          console.log(error);
          Alert.alert('hata');
        }
      }

    useEffect(() => {
        handleSearch();
    }, []);

    const renderFilm  = ({item}) => {

        return(
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
        )
    }

    /* const a = [
        {
          "id": "http://www.wikidata.org/entity/Q121290006",
          "label": "Alex/October"
        },
        {
          "id": "http://www.wikidata.org/entity/Q104876373",
          "label": "Above the Knee"
        },
        {
          "id": "http://www.wikidata.org/entity/Q117475163",
          "label": "Ang Tipo Kong Lalake"
        },
        {
          "id": "http://www.wikidata.org/entity/Q11354489",
          "label": "A Tale of Archery at the Sanjusangendo"
        },
        {
          "id": "http://www.wikidata.org/entity/Q104876233",
          "label": "A Gentleman's Game"
        },
        {
          "id": "http://www.wikidata.org/entity/Q110099675",
          "label": "Armugan"
        },
        {
          "id": "http://www.wikidata.org/entity/Q116051203",
          "label": "Autumn Beat"
        },
        {
          "id": "http://www.wikidata.org/entity/Q1129547",
          "label": "And God Created Woman"
        },
        {
          "id": "http://www.wikidata.org/entity/Q123303460",
          "label": "Awkward Customers"
        },
        {
          "id": "http://www.wikidata.org/entity/Q114220980",
          "label": "A Woman from Cairo"
        }
      ]; */
    return (
        <View style={styles.container}>
            <FlatList data={result}
                renderItem={renderFilm}
            />
        </View>
        
    )
}

export default Search;