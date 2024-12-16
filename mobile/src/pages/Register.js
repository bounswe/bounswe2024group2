import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import config from './config/config';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { baseURL } = config;

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Backend URL for registration
    const registerUrl = `${baseURL}/register/`;

    // Registration data
    const registerData = {
      username: username,
      password: password,
      email: email,
    };

    try {
      // Make the POST request to the backend
      const response = await fetch(registerUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': 'WTyfHMRCB4yI4D5IhdreWdnFDe6skYPyBbenY9Z5F5VWc7lyii9zV0qXKjtEDGRN',
        },
        body: JSON.stringify(registerData),
      });

      // Parse the JSON response
      const data = await response.json();

      // Check for a successful registration
      if (response.ok) {
        Alert.alert(
          'Registration Successful',
          'Please check your email to verify your account before logging in.'
        );
        // Attempt email verification
        await handleEmailVerification();
        // Redirect to Login screen
        navigation.navigate('Login');
      } else {
        // Handle registration failure
        Alert.alert('Registration Failed', data.error || 'An error occurred during registration');
      }
    } catch (error) {
      // Handle network or other errors
      Alert.alert('Error', 'An error occurred. Please try again later.');
      console.error('Registration error:', error);
    }
  };

  const handleEmailVerification = async () => {
    // Backend URL for email verification
    const verifyUrl = `${baseURL}/verify-email/`;

    try {
      // Make the GET request to verify the email
      const response = await fetch(verifyUrl, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'X-CSRFToken': 'WTyfHMRCB4yI4D5IhdreWdnFDe6skYPyBbenY9Z5F5VWc7lyii9zV0qXKjtEDGRN',
        },
      });

      // No need to parse the response if we are not showing any alerts based on it
    } catch (error) {
      // Log the error but don't show it to the user
      console.error('Email verification error:', error);
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.length === 0) {
      setShowPassword(false); // Reset to hidden when input is cleared
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (text.length === 0) {
      setShowConfirmPassword(false); // Reset to hidden when input is cleared
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/IconKitchen-Output/icon-bare-700.png')} // Update this path to your actual logo image
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>BULL&BEAR</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#999999"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
          />
          {password.length > 0 && (
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showPasswordText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            placeholderTextColor="#999999"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry={!showConfirmPassword}
          />
          {confirmPassword.length > 0 && (
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Text style={styles.showPasswordText}>
                {showConfirmPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.linkContainer}>
         <Text > You have an account</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            
            <Text style={styles.linkText}> Sign in</Text>
          </TouchableOpacity>
        </View>
        
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005AAB',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#000000',
    marginBottom: 10,
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#000000',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 15,
    padding: 10,
  },
  showPasswordText: {
    color: '#005AAB',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0A2F44',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  linkText: {
    color: '#005AAB',
    textDecorationLine: 'underline',
  },
});

export default Register;
