import React from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Main from "./pages/Main"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from "./pages/Profile"

function App(){
  const Stack = createNativeStackNavigator();

    
  return(
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name ="Signup" component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name ="Main" component={Main} options={{headerShown:false}}/>
        <Stack.Screen name ="Profile" component={Profile} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}

export default App;