import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles/LoginStyle';
import config from '../config';
import { SelectList } from 'react-native-dropdown-select-list';

function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const baseURL = 'http://207.154.242.6:8020';
  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Mobiles', disabled:true},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]
  // console.log(username, password);

  function changeUsername(username) {
    setUsername(username);
  }

    function handleSignup(){
        navigation.navigate("Signup");
    }
    
    function handleForgotPassword(){
        navigation.navigate("ForgotMain");
    }


  function changePassword(password) {
    setPassword(password);
  }

  // To be activated
   async function handleLogin() {
     const loginURL = baseURL + '/login/';
    
     try {
         
         const response = await fetch(loginURL, {
             method: 'POST',
             headers: {
             'Content-Type': 'application/json',
             },
             body: JSON.stringify({
             username:username,
             password:password,
             }),
         });
         const status = response.status;

         
        /*  console.log(response.status) */
         if (status == 200) {

              const data = await response.json();
              config.token = data.access;
             navigation.navigate('TabPages', {username: username});
             
         } else {
             console.log('response null');
             Alert.alert('Wrong username or password');
            
         }
     } catch (error) {
       console.log(error);
       Alert.alert('Wrong username or password');
     }
   }



  return (
    
      <View style={styles.container}>
        <View style={styles.top_container}>
        <Image
          source={require('./assets/logo.png')}
          style={{width: '70%', height: '70%', resizeMode: 'contain'}}
        />
        <Text style={styles.welcome}>Welcome!</Text>
      </View>
      {/* <View style={styles.mid_container}>
            </View> */}
      <View style={styles.bottom_container}>
        <View style={styles.username_input_box}>
          <View style={styles.icon_box}>
            <MaterialCommunityIcons
              name="account-outline"
              color="black"
              size={30}
            />
          </View>
          <TextInput
            style={styles.input_text}
            placeholder="Username"
            onChangeText={changeUsername}
            value={username}
            autoCapitalize='none'
          />
        </View>
        <View style={styles.password_input_box}>
          <View style={styles.icon_box}>
            <MaterialCommunityIcons
              name="lock-outline"
              color="black"
              size={30}
            />
          </View>
          <TextInput
            style={styles.input_text}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={changePassword}
            value={password}
            
            autoCapitalize='none'
          />
        </View>
        <View style={styles.chpass_view}>
          <TouchableOpacity onPress={handleForgotPassword} style={styles.chpass_button}>
            <Text style={styles.chpass_text}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.login_view}>
          <TouchableOpacity onPress={handleLogin} style={styles.login_button}>
            <Text style={styles.login_text}>Log In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signup_view}>
          <Text style={styles.signup_text}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignup} style={styles.button}>
            <Text style={styles.signup_text}>Sign Up</Text>
          </TouchableOpacity>

        </View>
      </View>
    
      </View>
      
  );
}

export default Login;
