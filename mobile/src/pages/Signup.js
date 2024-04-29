import React, {useState, useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles/SignupStyle"
import axios from "axios";

function Signup({navigation}){
    const [email, setEmail] = useState("aaaa");
    const [username, setUsername] = useState("bbbb");
    const [password, setPassword] = useState("ERKAM.gokcepinar");
    const baseURL = "http://207.154.242.6:8020";
    
    async function handleSignup(){
        const signupURL = baseURL + "/register/"
        try{
            const response = await fetch(signupURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    email,
                    first_name:"erkam",
                    last_name:"gokcepinar"
                }),
            });
            /* const response = await axios.post("http://192.168.4.56:8020/register/", {
                email,
                username,
                password,
                first_name: "erkam",
                last_name: "gokcepinar"
            }); */
            console.log(response.json);
            if (response){

                navigation.navigate("Main");
            }else{
                console.log("response null")
                Alert.alert("Hata");
            }
        }
        catch (error){
            console.log(error)
            Alert.alert("hata")
        }
    }

    function handleLogin(){
        navigation.navigate("Login");
    }

    return(
        <View style={styles.container}>
            <View style={styles.top_container}>
                <Image source={require('./assets/logo.png')}  style={{ width: '75%', height: '75%', resizeMode: 'contain' }} />
            </View>
            <View style={styles.mid_container}>
                <Text style={styles.mid_text}> Create Account </Text>
            </View>

            <View style={styles.bottom_container}>
                <View style={styles.input_box}>
                    <View style={styles.icon_box}>
                        <MaterialCommunityIcons name="email-outline" color="black" size={30}/>
                    </View>
                    <TextInput style={styles.input_text} value={email} placeholder="Email" isHidden={false}/>
                </View>
                <View style={styles.input_box}>
                    <View style={styles.icon_box}>
                        <MaterialCommunityIcons name="account-outline" color="black" size={30}/>
                    </View>
                    <TextInput style={styles.input_text} value={username} placeholder="Username" isHidden={true}/>
                </View>
                <View style={styles.input_box}>
                    <View style={styles.icon_box}>
                        <MaterialCommunityIcons name="lock-outline" color="black" size={30}/>
                    </View>
                    <TextInput style={styles.input_text} value={password} placeholder="Password" isHidden={true}/>
                </View>
                <View style={styles.input_box}>
                    <View style={styles.icon_box}>
                        <MaterialCommunityIcons name="lock-outline" color="black" size={30}/>
                    </View>
                    <TextInput style={styles.input_text} value={password} placeholder="Password again" isHidden={true}/>
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