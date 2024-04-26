import React from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function App(){
  const Stack = createNativeStackNavigator();
  
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name ="Signup" component={Signup} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;