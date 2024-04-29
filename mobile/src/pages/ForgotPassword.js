import React, {useState, useEffect} from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import styles from "./styles/ForgotPasswordStyle"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function ForgotPassword({navigation}){
    const [email, setEmail] = useState("");

    function changeEmail(email){
        setEmail(email);
    }

    function handleVerification(){
        navigation.navigate("VerifyPassChange");
    }

    return(
        <View style={styles.container}>
            <View style={styles.top_container}>
                <Image source={require('./assets/logo.png')}  style={{ width: '75%', height: '75%', resizeMode: 'contain' }} />
            </View>
            <View style={styles.mid_container}>
                <View style={styles.title_box}>
                    <Text style={styles.mid_title}> Forgot Password </Text>
                </View>
                <View style={styles.text_box}>
                    <Text style={styles.mid_text}> Type your email so that we can send you a verification code to reset your password </Text>
                </View>
                
            </View>
            <View style={styles.bottom_container}>
                
                <View style={styles.email_input_box}>
                    <View style={styles.icon_box}>
                        <MaterialCommunityIcons name="email-outline" color="black" size={30}/>
                    </View>
                    <TextInput style={styles.input_text} placeholder="Email" onChange={changeEmail} value={email} />
                </View>
               
                <View style={styles.verification_view}>
                    <TouchableOpacity onPress={handleVerification} style={styles.verification_button}> 
                        <Text style={styles.verification_text}> Send Verification </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}


export default ForgotPassword;