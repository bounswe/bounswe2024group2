import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles/SignupStyle';
import axios from 'axios';

function Signup({navigation}) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordA, setPasswordA] = useState('');
  const baseURL = 'http://207.154.242.6:8020';
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  },[isKeyboardOpen]);

  async function handleSignup() {
    const signupURL = baseURL + '/register/';
    try {
      const response = await fetch(signupURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
          isactive:true,
        }),
      });
      /* const response = await axios.post("http://192.168.4.56:8020/register/", {
                email,
                username,
                password,
                first_name: "erkam",
                last_name: "gokcepinar"
            }); */
      console.log(response.status);
      if (response.status == 200 || response.status == 201 ) {
        navigation.navigate('Login');
        Alert.alert("Successful registeration, please verify your account from your email");
      } else {
        console.log('response null');
        Alert.alert('Hata');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('hata');
    }
  }

  function handleLogin() {
    navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.top_container}>
        <Image
          source={require('./assets/logo.png')}
          style={{width: '75%', height: '75%', resizeMode: 'contain'}}
        />
      </View>
      <View style={styles.mid_container}>
        <Text style={styles.mid_text(isKeyboardOpen)}>Create Account</Text>
      </View>

      <View style={styles.bottom_container}>
        <View style={styles.input_box}>
          <View style={styles.icon_box}>
            <MaterialCommunityIcons
              name="email-outline"
              color="black"
              size={30}
            />
          </View>
          <TextInput
            style={styles.input_text}
            value={email}
            placeholder="Email"
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.input_box}>
          <View style={styles.icon_box}>
            <MaterialCommunityIcons
              name="account-outline"
              color="black"
              size={30}
            />
          </View>
          <TextInput
            style={styles.input_text}
            value={username}
            placeholder="Username"
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.input_box}>
          <View style={styles.icon_box}>
            <MaterialCommunityIcons
              name="lock-outline"
              color="black"
              size={30}
            />
          </View>
          <TextInput
            style={styles.input_text}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.input_box}>
          <View style={styles.icon_box}>
            <MaterialCommunityIcons
              name="lock-outline"
              color="black"
              size={30}
            />
          </View>
          <TextInput
            style={styles.input_text}
            value={passwordA}
            placeholder="Password again"
            secureTextEntry={true}
            onChangeText={setPasswordA}
          />
        </View>
        <View style={styles.signup_view}>
          <TouchableOpacity onPress={handleSignup} style={styles.signup_button}>
            <Text style={styles.signup_text}> Sign Up </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.login_view}>
          <Text style={styles.login_text}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.login_text}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Signup;
