import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import styles from "./styles/MovieStyle";

function Movie({navigation, route}){
    const [movieDetails, setMovieDetails] = useState([{
        castMembers:[],
        description:"",
        directors:[],
        genres:[],
        image:"",
        label:"",
    }]);
    
    
    const movie = route.params;
    console.log(movie.id.split("/")[movie.id.split("/").length-1]);
    const entity_id = movie.id.split("/")[movie.id.split("/").length-1];
    const baseURL = 'http://207.154.242.6:8020';


    async function fetchMovie(){
        const movieURL = baseURL + '/get-film-details/';
        
        try {
    
            const response = await fetch(movieURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    entity_id: entity_id,
                }),
            }).then(response => response.json()) // Step 2: Parse the JSON response
            .then(json => setMovieDetails(json)) // Update state with the parsed data
            .catch(error => console.error(error));
          
            
        }catch (error) {
            console.log(error);
            Alert.alert('hata');
        }

    }

    
    useEffect(() => {
        fetchMovie();
    }, []);

    console.log(movieDetails);
    console.log(movieDetails[0]["description"]);
    const description = movieDetails[0]["description"];
    /* const genres = movieDetails[0]["genres"][0]["label"]; */
    const title = movieDetails[0]["label"];

    return(
        <View style={styles.container}>
            <View style={styles.top_container}>
                <Image source={require("./assets/inception-poster.png")} style={styles.image}/>
            </View>
            <View style={styles.bottom_container}>
                <Text style={styles.title}>
                    {title}
                </Text>
                {/* <Text>
                    {genres}
                </Text> */}
                <Text style={styles.description}>
                    
                    {description}
                </Text>
                <View style={styles.button_container}>
                    <View  style={styles.post_button}>
                        <TouchableOpacity>
                            <Text style={styles.post_text}> Create Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                
            </View>
            
            
        </View>
    )

}


export default Movie;