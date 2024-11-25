import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Profile from './Profile';
import News from './News';
import LoadingScreen from './LoadingScreen'; // Import LoadingScreen
import { ThemeProvider } from '../themes/ThemeProvider';


const Stack = createStackNavigator();
const Sidebar = createDrawerNavigator();

const navigateProfile = (navigation, username) => {
  navigation.navigate("Profile", { username });
};

const CustomHeader = ({ navigation }) => (
  <View style={styles.customHeader}>
    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerButton}>
      <MaterialIcons name="menu" size={30} color="white" />
    </TouchableOpacity>
    <Text style={styles.logoText}>Bull&Bear</Text>
    <TouchableOpacity onPress={() => navigateProfile(navigation)} style={styles.headerButton}>
      <MaterialIcons name="account-circle" size={30} color="white" />
    </TouchableOpacity>
  </View>
);

const App = () => {
  const [loading, setLoading] = useState(true);
    const LoginRelated = () => {
      return (
        <ThemeProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} ></Stack.Screen>
            <Stack.Screen name="Register" component={Register} ></Stack.Screen>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} ></Stack.Screen>
          </Stack.Navigator>
        </ThemeProvider>
        
      )
    }

  useEffect(() => {
    const loadData = async () => {
      try {
        // Replace with real data fetching logic
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false); // Set loading to false once data is loaded
      }
    };
    loadData();
  }, []);


  if (loading) {
    return <LoadingScreen message="Loading..." />; // Use LoadingScreen
  }

    return (
      <ThemeProvider>
        <NavigationContainer>
          <Sidebar.Navigator
        screenOptions={{
          headerShown: true,
          header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        }}
        >
            <Sidebar.Screen 
              name="Home" 
              component={Home}              
            />
            <Sidebar.Screen 
              name="Profile" 
              component={Profile}               
            />
            <Sidebar.Screen 
              name="Login&Register" 
              component={LoginRelated} 
            />
            <Sidebar.Screen 
              name="News" 
              component={News} 
            />
          </Sidebar.Navigator>
        </NavigationContainer>
        </ThemeProvider>
      );
};

const styles = StyleSheet.create({
  customHeader: {
    height: 60,
    backgroundColor: '#0077B6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerButton: {
    padding: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
});

export default App;
