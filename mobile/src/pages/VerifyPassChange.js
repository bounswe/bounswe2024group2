import React, { useState } from "react"; 
import styles from "./styles/VerifyPassChangeStyle";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function VerifyPassChange({navigation}){
    const [code, setCode] = useState("");
    
    
    function changeCode(code){
        setCode(code);
    }
    
    function handleVerification(){
        navigation.navigate("ResetPass");
    }

    return(
        <View style={styles.container}>
            <View style={styles.top_container}>
                <Image source={require('./assets/logo.png')}  style={{ width: '75%', height: '75%', resizeMode: 'contain' }} />
            </View>
            <View style={styles.mid_container}>
                <View style={styles.title_box}>
                    <Text style={styles.mid_title}> Verify Code </Text>
                </View>
                <View style={styles.text_box}>
                    <Text style={styles.mid_text}> We have sent an email to you! Verify the code to proceed. Didn't receive one? </Text>
                </View>
                
            </View>
            <View style={styles.bottom_container}>
                
                <View style={styles.email_input_box}>
                    <View style={styles.icon_box}>
                        <MaterialCommunityIcons name="email-outline" color="black" size={30}/>
                    </View>
                    <TextInput style={styles.input_text} placeholder="Code" onChange={changeCode} value={code} />
                </View>
               
                <View style={styles.verification_view}>
                    <TouchableOpacity onPress={handleVerification} style={styles.verification_button}> 
                        <Text style={styles.verification_text}> Verify </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}

export default VerifyPassChange;