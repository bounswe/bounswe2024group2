import React from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Main from "./pages/Main"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from "./pages/Profile"
import Movies from "./pages/Movies"
import ForgotPassword from "./pages/ForgotPassword"
import VerifyPassChange from "./pages/VerifyPassChange"
import ResetPass from "./pages/ResetPass"
import Search from "./pages/Search"
import EditProfile from "./pages/EditProfile"

import Movie from "./pages/Movie"
import CreatePost from "./pages/CreatePost"
import Actor from "./pages/Actor"
import Director from "./pages/Director"
import { ApplicationProvider } from "@ui-kitten/components"


function App(){
  const Stack = createNativeStackNavigator();

  const BottomTab = createMaterialBottomTabNavigator();
  
  const ForgotMain = () => {
    return(
      <Stack.Navigator>
        <Stack.Screen name ="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}/>
        <Stack.Screen name ="VerifyPassChange" component={VerifyPassChange} options={{headerShown:false}}/>
        <Stack.Screen name ="ResetPass" component={ResetPass} options={{headerShown:true}}/>
      </Stack.Navigator>
    )
  }
  const MovieRelated = () => {
    return(
      <Stack.Navigator>
        <Stack.Screen name ="Movies" component={Movies} options={{headerShown:false}}/>
        <Stack.Screen name ="Movie" component={Movie} options={{headerShadowVisible:false}}/>
        <Stack.Screen name ="Actor" component={Actor} options={{headerShadowVisible:false}}/>
        <Stack.Screen name ="Director" component={Director} options={{headerShadowVisible:false}}/>
        <Stack.Screen name ="CreatePost" component={CreatePost} options={{headerShadowVisible:false, headerTitle:""}}/>
        <Stack.Screen name ="Search" component={Search} options={{headerShown:true, headerTitle:"Results", headerStyle:{backgroundColor:"white"}, headerShadowVisible:false}}/>
      </Stack.Navigator>
    )
  }

  const TabPages = (params) => {
    
    const username = params.route.params;
  
    return(
      <BottomTab.Navigator barStyle={{ backgroundColor: '#DC143C' }}
                            activeColor="white"
                            inactiveColor="white"
                            >
        <BottomTab.Screen name ="Main" 
                          component={Main} 
                          options={{tabBarLabel:'Home', 
                                    tabBarIcon:() => (<MaterialCommunityIcons name="home" color="white" size={25} />),
                                    headerShown: false

                                  }}
                          initialParams={username}
                          />
        <BottomTab.Screen name ="MovieRelated" 
                          component={MovieRelated} 
                          options={{tabBarLabel:'Movies', 
                                    tabBarIcon:() => (<MaterialCommunityIcons name="movie-open" color="white" size={25} />),
                                    headerShown: false
                                  }}/>
        <BottomTab.Screen name ="Profile" 
                          component={Profile} 
                          options={{tabBarLabel:'Profile', 
                                    tabBarIcon:() => (<MaterialCommunityIcons name="account" color="white" size={25} />),
                                    headerShown: false
                                  }}/>
      </BottomTab.Navigator>
    )
  }

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name ="Signup" component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name ="TabPages" component={TabPages} options={{headerShown:false}}/>
        <Stack.Screen name ="Search" component={Search} options={{headerShown:true, headerTitle:"Results", headerStyle:{backgroundColor:"white"}, headerShadowVisible:false}}/>
        <Stack.Screen name ="ForgotMain" component={ForgotMain} options={{headerShown:true, headerTitle:"", headerStyle:{backgroundColor:"white"}, headerShadowVisible:false}}/>
        <Stack.Screen name='EditProfile' component={EditProfile} options={{headerShown:false}}/>
    
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
