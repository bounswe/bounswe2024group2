import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import { ThemeProvider } from '../themes/ThemeProvider';

import Profile from './ProfilePage';
import News from './News';

import Markets from './Markets';
import Community from './Community';
import Post from './Post';
import CreatePost from './CreatePost';
import { AuthProvider, useAuth } from './context/AuthContext';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Custom Header
const CustomHeader = ({ navigation }) => {
  const { user } = useAuth();


  const handleProfileNavigation = () => {
    if (user) {
      navigation.navigate('Profile', { username: user.username });
    } else {
      navigation.navigate('Login&Register');
    }
  };

  return (
    <View style={styles.customHeader}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerButton}>
        <MaterialIcons name="menu" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.logoText}>Bull&Bear</Text>
      <TouchableOpacity onPress={handleProfileNavigation} style={styles.headerButton}>
        <MaterialIcons name="account-circle" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

// Login & Register Stack Navigator
const LoginStack = () => (
  <Stack.Navigator >
    <Stack.Screen name="Login" component={Login} options={{header: ({ navigation }) => <CustomHeader navigation={navigation} />}} />
    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const PostStack = () => {
  return (
    <ThemeProvider>
      <Stack.Navigator>
        <Stack.Screen name="CommunityPage" component={Community} options={{ header: ({ navigation }) => <CustomHeader navigation={navigation} />, }}></Stack.Screen>
        <Stack.Screen name="Post" component={Post} options={{ headerShown: true }} ></Stack.Screen>
        <Stack.Screen name="CreatePost" component={CreatePost} options={{ headerShown: true, title:"Create a post" }}></Stack.Screen>
      </Stack.Navigator>
    </ThemeProvider>
    
  )
}
const DrawerNavigator = () => {
  const { user } = useAuth();



    return (
        <Drawer.Navigator
        
        screenOptions={{
          header: ({ navigation }) => <CustomHeader navigation={navigation} />
        }}
          
        >
            <Drawer.Screen 
              name="Home" 
              component={Home}  
                       
            />
            { user  ? (
              <Drawer.Screen 
                name="Profile" 
                component={Profile} 
                
              />
              ) : (
              <Drawer.Screen 
                name="Login&Register" 
                component={LoginStack} 
                options={{ headerShown: false }}   
              />
            )}
            <Drawer.Screen
              name="Markets"
              component={Markets}
              
            />
            <Drawer.Screen
              name="Community"
              component={PostStack}
              options={{ headerShown: false }}   
            />
            <Drawer.Screen
              name="News"
              component={News}
              options={{ headerShown: false }}   
            />
            
          </Drawer.Navigator>
      );

};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
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