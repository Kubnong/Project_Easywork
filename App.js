import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StartScreen from "./src/screens/StartScreen";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import LinearGradient from 'react-native-linear-gradient';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
         <Stack.Navigator initialRouteName="StartScreen" screenOptions={{
        headerStyle: {backgroundColor: "#77D499"},
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize : 25 , fontWeight: "bold" , color: "white"}
      }}>
      
        <Stack.Screen name="StartScreen" component={StartScreen} options={{title:"" , headerStyle:{backgroundColor:"white"}}}/>
        <Stack.Screen name="RegisterScreen" component={Register} options={{title:"สมัครสมาชิก"}}/>
        <Stack.Screen name="LoginScreen" component={Login} options={{title:"เข้าสู่ระบบ"  , headerLeft: () => null}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
