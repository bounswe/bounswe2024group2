import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import styles from "./styles/CreatePostStyle";
import config from "../config";


function CreatePost({navigation, route}){
    const [reviewTitle, setreviewTitle] = useState("");
    const [reviewContent, setreviewContent] = useState("");


    const title = route.params;

  
    const baseURL = 'http://207.154.242.6:8020';
    async function postData() {
        const postData = {
            title: reviewTitle,
            content: reviewContent,
            film: title
        };
    
        const postURL = baseURL + '/post/';
    
        try {
            const response = await fetch(postURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.token}`
                },
                body: JSON.stringify(postData)
            });
    
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Response:', jsonResponse);
                navigation.navigate("Movies");
                // İşlemlerinizi burada devam ettirebilirsiniz
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error:', error);
            // Hata durumunda uygun bir işlem yapabilirsiniz
        }
    }
    
    function handlePost(){
        postData();
    }

    
    


    return(
        <View style = {styles.container}>
            <View style={styles.top_container}>
                <Text style={styles.title}> Write A Post On {title}</Text>
            </View>
            <View style={styles.mid_container}>
                <TextInput style={styles.title_box} 
                            placeholder="Title"
                            onChangeText={setreviewTitle}/>
                <TextInput style={styles.review_box} 
                            placeholder="Write your review or comment about the film..."
                            onChangeText={setreviewContent}/>
            </View>
            <View >
                <TouchableOpacity style={styles.submit_box} onPress={handlePost}>
                    <Text style={styles.submit_text}> Submit </Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default CreatePost;