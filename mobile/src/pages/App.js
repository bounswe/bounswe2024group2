import React from "react";
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./Login";

const App = () => {
    const Sidebar = createDrawerNavigator();
    const CustomHeader = ({ navigation, title }) => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Text>Icon</Text>
                {/* <Ionicons name="menu" size={25} color="black" /> */}
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

export default App;