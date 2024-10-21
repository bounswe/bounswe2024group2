import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
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
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Register" component={Register} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}></Stack.Screen>
        </Stack.Navigator>
      )
    }

    const TabBar = (params) =>{
      const username = params.route;
      
      return(
      <Sidebar.Navigator>
            <Sidebar.Screen 
              name="Home" 
              component={Home} 
              options={({ navigation }) => ({
                header: () => <CustomHeader navigation={navigation} username={username} title="Home" />,
              })}
            />
            <Sidebar.Screen 
              name="Profile" 
              component={Profile} 
              options={({ navigation }) => ({
                header: () => <CustomHeader navigation={navigation} username={username} title="Profile" />,
              })}
            />
            <Sidebar.Screen 
              name="Login&Register" 
              component={LoginRelated} 
              options={({ navigation }) => ({
                header: () => <CustomHeader navigation={navigation} username={username}title="Login" />,
              })}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor:"#0077B6",
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo:{
    flexDirection:"row",
    marginLeft:100,
    marginRight:100,
  },
  logoText:{
    fontSize:18,
    fontWeight:"bold",
    color:"white"
  },
});

export default App;

