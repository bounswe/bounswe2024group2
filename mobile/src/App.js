import React from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Main from "./pages/Main"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from "./pages/ForgotPassword"
import VerifyPassChange from "./pages/VerifyPassChange"
import ResetPass from "./pages/ResetPass"

function App(){
  const Stack = createNativeStackNavigator();
  
  const ForgotMain = () => {
    return(
      <Stack.Navigator>
        <Stack.Screen name ="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}/>
        <Stack.Screen name ="VerifyPassChange" component={VerifyPassChange} options={{headerShown:false}}/>
        <Stack.Screen name ="ResetPass" component={ResetPass} options={{headerShown:false}}/>
      </Stack.Navigator>
    )
  }

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name ="Signup" component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name ="Main" component={Main} options={{headerShown:true}}/>
        <Stack.Screen name ="ForgotMain" component={ForgotMain} options={{headerShown:true, headerTitle:"", headerStyle:{backgroundColor:"white"}, headerShadowVisible:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;