import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert, TouchableOpacity, ScrollView, FlatList } from "react-native";
import styles from "./styles/MovieStyle";
import config from "../config";
import FilmBox from "../components/movies/MovieBox";
import CastBox from "../components/CastBox";
import { useFocusEffect } from '@react-navigation/native';

function Movie({navigation, route}){
    const [movieDetails, setMovieDetails] = useState([{
        castMembers:[],
        description:"Loading",
        directors:[],
        genres:[],
        image:"",
        label:"Loading",
    }]);
    
    
    const movie = route.params;
  
    const entity_id = movie.id.split("/")[movie.id.split("/").length-1];
    const baseURL = 'http://207.154.242.6:8020';


    async function fetchMovie(){
        const movieURL = baseURL + '/get-film-details/';
        
        try {
    
            const response = await fetch(movieURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.token}`
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

   
    const description = movieDetails[0]["description"];
    
    const title = movieDetails[0]["label"];
    const directors = movieDetails[0]["directors"];
    const cast = movieDetails[0]["castMembers"];

    useFocusEffect(
        React.useCallback(() => {
          fetchMovie();
        }, [])
      );

    function handleCreatePost(){
        navigation.navigate("CreatePost", title);

    }

    const renderDirectors = ({item}) =>{
        
        function handleDirector(){
            navigation.navigate("Director", item);
        }

        return(
            <View style={styles.movie_box}>
                <TouchableOpacity onPress={handleDirector}>
                    <CastBox film={item}/>
                </TouchableOpacity>
                
            </View>
            
           
            
        )
    }
    const renderCast = ({item}) =>{
       
        function handleActor(){
            navigation.navigate("Actor", item);
        }
        return(
            <View style={styles.movie_box}>
                <TouchableOpacity onPress={handleActor}>
                    <CastBox film={item}/>
                </TouchableOpacity>
                
            </View>
            
           
            
        )
    }
    const itemSeparator = <View style={styles.seperator}/>

    return(
        
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.top_container}>
                {movieDetails[0]["poster"]  ? 
                <Image source={{ uri: movieDetails[0]["poster"]  }} style={styles.image} /> :
                <Image source={require("./assets/movie.png")} style={styles.image} /> }
                    
                </View>
                <View style={styles.mid_container}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    {/* <Text>
                        {genres}
                    </Text> */}
                    <Text style={styles.description}>
                        {description}
                    </Text>
                    <View style={styles.inner_container}>
                        <Text style={styles.subtitle}>Directors </Text>
                        <FlatList 
                            data={directors}
                            renderItem={renderDirectors}
                            horizontal={true}
                            ItemSeparatorComponent={itemSeparator}
                        />
                        <Text style={styles.subtitle}>Cast </Text>
                        <FlatList 
                            data={cast}
                            renderItem={renderCast}
                            horizontal={true}
                            ItemSeparatorComponent={itemSeparator}
                        />
                    </View>
                    
                    
                </View>
                <View style={styles.button_container}>
                    <View  style={styles.post_button}>
                        <TouchableOpacity onPress={handleCreatePost}>
                            <Text style={styles.post_text}> Create Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
        
        
    )

}


export default Movie;