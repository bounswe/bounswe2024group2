import './gesture-handler';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // You need to install @expo/vector-icons if you're using Expo
import Home from './Home';
import Login from './Login';

export default function App() {
  const Sidebar = createDrawerNavigator();
  
  const CustomHeader = ({ navigation, title }) => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons name="menu" size={25} color="black" />
      </TouchableOpacity>
      
    </View>
  );

  return (
    <NavigationContainer>
      <Sidebar.Navigator>
        {/* <Sidebar.Screen 
          name="Home" 
          component={Home} 
          options={({ navigation }) => ({
            header: () => <CustomHeader navigation={navigation} title="Home" />,
          })}
        /> */}
        <Sidebar.Screen 
          name="Login" 
          component={Login} 
          options={({ navigation }) => ({
            header: () => <CustomHeader navigation={navigation} title="Login" />,
          })}
        />
      </Sidebar.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingTop: 18
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
