import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";


const CastBox = (props) => {


    return(
        
        <View style={styles.container}>
            <View style={styles.image_box}>
                <Image source={require("../pages/assets/male.png")}
                        style={styles.image}
                />
            </View>
            <View style={styles.text_box}>
                <Text style={styles.title}>
                    {props.film.label}
                </Text>
            </View>
    
        </View>
    
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        borderRadius:10,
        height:235,
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

export default CastBox;