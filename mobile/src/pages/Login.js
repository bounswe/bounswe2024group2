import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles/LoginStyle"

function Login({navigation}){
    
    
    function handleSignup(){
        navigation.navigate("Signup");
    }

    return(
        <View style={styles.container}>
            <View style={styles.top_container}>
                <Text> LOGO </Text>
            </View>

            <View style={styles.bottom_container}>
              
                <View style={styles.username_input_box}>
                    {/* <MaterialCommunityIcons name="home" size={40}/> */}
                    <TextInput style={styles.input_text} placeholder="Username" isHidden={false}/>
                </View>
                <View style={styles.password_input_box}>
                    <TextInput style={styles.input_text} placeholder="Password" isHidden={true}/>
                </View>
                <View style={styles.chpass_view}>
                    <TouchableOpacity style={styles.chpass_button}> 
                        <Text style={styles.chpass_text}> Forgot Password? </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.login_view}>
                    <TouchableOpacity style={styles.login_button}> 
                        <Text style={styles.login_text}> Login </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signup_view}>
                    <Text style={styles.signup_text}> Don't have an account? </Text>
                    <TouchableOpacity onPress={handleSignup} style={styles.button} >
                        <Text style={styles.signup_text}> Sign Up </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login;