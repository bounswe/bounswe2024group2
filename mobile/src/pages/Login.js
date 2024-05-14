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

function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const baseURL = 'http://207.154.242.6:8020';

  console.log(username, password);

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


  async function handleLogin() {
    const loginURL = baseURL + '/login/';
    
    try {
        console.log(username, password);
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

        console.log(response.headers);
        console.log(response.status)
        if (response.status == 200) {
            navigation.navigate('TabPages');
        } else {
            console.log('response null');
            Alert.alert('Wrong username or password');
            navigation.navigate('TabPages');
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
