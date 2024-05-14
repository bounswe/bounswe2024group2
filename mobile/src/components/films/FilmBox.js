import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";


const FilmBox = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.inner_box}>
                <Image source={require("../../pages/assets/movie.png")}
                        style={styles.image}
                />
                <Text>
                    {props.film.label}
                </Text>
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor:"white",
        borderWidth:1,
        borderRadius:5,
        borderColor:"#f8f8ff",
    },
    inner_box:{

    },
    image:{
        width:70,
        height:70,
        resizeMode:"contain"
        
    },

})

export default FilmBox;