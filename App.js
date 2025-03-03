import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";
import React from "react"
import StartScreen from "./src/screens/StartScreen"

const Stack = createStackNavigator()
const App = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
