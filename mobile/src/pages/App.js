import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Profile from './Profile';
import News from './News';
import Markets from './Markets';

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
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);
const DrawerNavigator = () => {
  
  const { user } = useAuth();
  
  return (
  <Drawer.Navigator
          screenOptions={{
            headerShown: true,
            header: ({ navigation }) => <CustomHeader navigation={navigation} />,
          }}
        >
          <Drawer.Screen name="Home" component={Home} />
          { user  ? (
            <Drawer.Screen name="Profile" component={Profile} />
          ) : (
            <Drawer.Screen name="Login&Register" component={LoginStack} />
          )}
          <Drawer.Screen name="News" component={News} />
          <Drawer.Screen name="Markets" component={Markets} />
        </Drawer.Navigator>
  );
};
const App = () => {
   // Access authentication state

  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
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