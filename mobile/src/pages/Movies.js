import React, {useState, useEffect} from "react";
import { Text, View, TouchableOpacity, TextInput, ScrollView, FlatList} from "react-native";
import styles from "./styles/MoviesStyle"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MovieBox from "../components/movies/MovieBox";
import { Alert } from "react-native";

function Movies({navigation}){
    const [searchInput, setSearchInput] = useState("");
    const [recentMovies, setRecentMovies] = useState([]);

    const limit = 50;

    function handleSearch(){
        if(searchInput == ""){
            Alert.alert("Please write what you want to search.")
        }
        else{
            navigation.navigate("Search", {searchInput: searchInput});
        }
        
    }

    const baseURL = 'http://207.154.242.6:8020';
    async function fetchRecentMovies() {
        const recentURL = baseURL + '/recently-release-films/';
        
        try {
    
          const response = await fetch(recentURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              limit: limit,
            }),
          }).then(response => response.json()) // Step 2: Parse the JSON response
          .then(json => setRecentMovies(json)) // Update state with the parsed data
          .catch(error => console.error(error));
          
          
          console.log(recentMovies);
          
        } catch (error) {
          console.log(error);
          Alert.alert('hata');
        }
      }

    useEffect(() => {
      fetchRecentMovies();
    }, []);

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
      ];
 */

    const renderFilm = ({item}) =>{
        
        function handleMovie(){
          navigation.navigate("Movie", item);
        }

        return(
            <View style={styles.movie_box}>
              <TouchableOpacity onPress={handleMovie}>
                <MovieBox film={item} />
              </TouchableOpacity> 
            </View>
            
           
            
        )
    }
    const itemSeparator = <View style={styles.seperator}/>

    return(
        <View style={styles.container}>
            <View style={styles.top_container}>
                <View style={styles.search_bar_container}>
                    <TouchableOpacity onPress={handleSearch}>
                        <MaterialCommunityIcons name="magnify" size={20} color="rgb(9,33,74)" />
                    </TouchableOpacity>
                    <TextInput style={styles.search_input_style} placeholder="Search" value={searchInput} onChangeText={setSearchInput}/>
                </View>
            </View>
            <View>
        
                <FlatList data={recentMovies}
                    renderItem={renderFilm}
                    numColumns={3}
                    ItemSeparatorComponent={itemSeparator}
                    columnWrapperStyle={{}}
                />
            
            </View>
            
        </View>
    )
}

export default Movies;