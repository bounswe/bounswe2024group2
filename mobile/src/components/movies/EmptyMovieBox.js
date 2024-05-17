import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";


const FilmBox = ({name}) => {

    return(
        <View style={styles.container}>
            <View style={styles.image_box}>
                <Image source={require("../../pages/assets/movie.png")}
                        style={styles.image}
                />
            </View>
            <View style={styles.text_box}>
                <Text style={styles.title}>
                    {name}
                </Text>
            </View>
                
            
            
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        borderRadius:5,
        height:190,
        width:112,
  
    },
    image_box:{

        height:170,
        borderWidth:1,
        borderRadius:10,
    },
    image:{
        width:111,
        height:170,
        resizeMode:"contain"
        
    },
    text_box:{
     
    },
    title:{
        fontWeight:"bold",
        color:"black"
    }

})

export default FilmBox;