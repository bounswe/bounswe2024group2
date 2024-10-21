import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Home from './Home'
import Profile from './Profile';


const Stack = createStackNavigator();
const Sidebar = createDrawerNavigator();

const CustomHeader = ({ navigation }) => (
  <View style={styles.customHeader}>
    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerButton}>
      <MaterialIcons name="menu" size={30} color="white" />
    </TouchableOpacity>
    <Text style={styles.logoText}>Bull&Bear</Text>
    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerButton}>
      <MaterialIcons name="account-circle" size={30} color="white" />
    </TouchableOpacity>
  </View>
);


const App = () => {

    const navigateProfile = (navigation, username) => {
      navigation.navigate("Profile", {username: username});
    };
    const CustomHeader = ({ navigation, username }) => (

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialIcons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.logo}>
          {/* <Image
            source={require('../../assets/IconKitchen-Output/ios/AppIcon~ipad.png')}
            
            
          /> */}
          <Text style={styles.logoText}> Bull&Bear </Text>
        </View>  
        <TouchableOpacity onPress={() => navigateProfile(navigation, username)}>
          <MaterialIcons name="account-circle" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );

    const LoginRelated = () => {
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} ></Stack.Screen>
          <Stack.Screen name="Register" component={Register} ></Stack.Screen>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} ></Stack.Screen>
        </Stack.Navigator>
      )
    }

    const TabBar = (params) =>{
      const username = params.route;
      
      return(
      <Sidebar.Navigator
        screenOptions={{
          headerShown: true, // Enable the custom header globally
          header: ({ navigation }) => <CustomHeader navigation={navigation} />, // Use CustomHeader for all screens
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
          </Sidebar.Navigator>
      )
    }

    return (
        <NavigationContainer>
          <TabBar></TabBar>
        </NavigationContainer>
      );
};

const styles = StyleSheet.create({
  customHeader: {
    height: 60,
    backgroundColor: '#0077B6', // Set to a solid color to make it fully visible
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
