import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from './context/AuthContext'; // Import AuthContext


const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading spinner
  const { login } = useAuth(); // Access the login function from AuthContext

  const handleLogin = async () => {

    const url = 'http://159.223.28.163:30002/login/';

    // Login data
    const loginData = {
      username: username,
      password: password,
    };

    setLoading(true); // Show loading spinner

    try {
      // Make the POST request to the backend
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      // Parse the JSON response
      const data = await response.json();

      // Check for a successful login
      if (response.ok) {
        // Handle successful login
        login(username, data.refresh); // Update the authentication state
        setPassword(''); // Clear the password
        Alert.alert('Login Successful', 'Welcome!');
        navigation.navigate('Home'); // Navigate to the Home screen
      } else {
        // Handle login failure
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Login error:', error.message || error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.length === 0) {
      setShowPassword(false); // Reset to hidden when input is cleared
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/IconKitchen-Output/icon-bare-700.png')}
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
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#999999"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword} // Always start with hidden password
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
        {loading ? ( // Show spinner when loading
          <ActivityIndicator size="large" color="#005AAB" style={styles.spinner} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        )}
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.linkText}>Forgot password?</Text>
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
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#000000',
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
  spinner: {
    marginTop: 10,
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
    justifyContent: 'space-between',
    width: '100%',
  },
  linkText: {
    color: '#005AAB',
    textDecorationLine: 'underline',
  },
});

export default Login;
