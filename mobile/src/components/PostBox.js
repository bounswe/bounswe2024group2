import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";


const PostBox = (props) => {
   
    return(
        <View style={styles.container}>
            <View style={styles.top_container}>
                <Text style={styles.title}> by @{props.post.author_username} </Text>
            </View>
            <View style={styles.mid_container}>
                <Text style={styles.title}> {props.post.title} </Text>
                <Text style={styles.title}> Film: {props.post.film} </Text>
            </View>
            <View style={styles.bottom_container}>
                <Text style={styles.text}> {props.post.content} </Text>
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        borderRadius:10,
        height:110,
        width:350,
        borderWidth:1,
        padding:5,
  
    },
    
    top_container:{
        
    },
    mid_container:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    bottom_container:{
        
    },
    title:{
        fontWeight:"bold",
        color:"black",
        fontSize:15,
    }, 
    text:{
        fontWeight:"bold",
        color:"black",
        fontSize:13,
    }

})

export default PostBox;