import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";
import React from "react"
import StartScreen from "./src/screens/StartScreen"
import HomeScreen from "./src/screens/HomeScreen";
import Profile from "./src/screens/Profile";

const Stack = createStackNavigator()
const App = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="StartScreen" component={StartScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
