import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";
import React from "react"
import StartScreen from "./src/screens/StartScreen"
import HomeScreen from "./src/screens/HomeScreen";
import Profile from "./src/screens/Profile";
import AddDetail from "./src/screens/AddDetail";

const Stack = createStackNavigator()
const App = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddDetail" screenOptions={{
        headerStyle: {backgroundColor: "#77D499"},
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize : 25 , fontWeight: "bold" , color: "white"}
      }}>
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerLeft: () => null }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerLeft: () => null }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerLeft: () => null }} />
        <Stack.Screen name="AddDetail" component={AddDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
