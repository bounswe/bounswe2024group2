import React, {useState, useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles/SignupStyle"

function Signup({navigation}){
    
    function handleSignup(){
    }

    function handleLogin(){
        navigation.navigate("Login");
    }

    return(
        <View style={styles.container}>
            <View style={styles.top_container}>
                <Text> LOGO </Text>
            </View>

            <View style={styles.bottom_container}>
                <Text > Create Account </Text>
                <View style={styles.input_box}>
                    {/* <MaterialCommunityIcons name="home" size={40}/> */}
                    <TextInput style={styles.input_text} placeholder="Email" isHidden={false}/>
                </View>
                <View style={styles.input_box}>
                    <TextInput style={styles.input_text} placeholder="Username" isHidden={true}/>
                </View>
                <View style={styles.input_box}>
                    <TextInput style={styles.input_text} placeholder="Password" isHidden={true}/>
                </View>
                <View style={styles.input_box}>
                    <TextInput style={styles.input_text} placeholder="Password again" isHidden={true}/>
                </View>
                <View style={styles.signup_view}>
                    <TouchableOpacity onPress={handleSignup} style={styles.signup_button}> 
                        <Text style={styles.signup_text}> Sign Up </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.login_view}>
                    <Text style={styles.login_text}> Already have an account? </Text>
                    <TouchableOpacity onPress={handleLogin} style={styles.button} >
                        <Text style={styles.login_text}> Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Signup;