import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import React from "react";
import HomeScreen from "./src/screens/HomeScreen";
import Profile from "./src/screens/Profile";
import AddDetail from "./src/screens/AddDetail";
import StartScreen from "./src/screens/StartScreen";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import RegisFreelance from "./src/screens/RegisFreelance";
import Verify from "./src/screens/Verify";
import DetailScreen from "./src/screens/DetailScreen";
import LinearGradient from "react-native-linear-gradient";

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="RegisFreelanceScreen"
        screenOptions={{
          headerStyle: { backgroundColor: "#77D499" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
          },
        }}
      >
        <Stack.Screen
          name="RegisterScreen"
          component={Register}
          options={{ title: "สมัครสมาชิก" }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={Login}
          options={{ title: "เข้าสู่ระบบ", headerLeft: () => null }}
        />
        <Stack.Screen
          name="RegisFreelanceScreen"
          component={RegisFreelance}
          options={{ title: "สมัครฟรีแลนซ์" }}
        />
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen name="AddDetail" component={AddDetail} />
        <Stack.Screen name="VerifyScreen" component={Verify} options={{ title: "ยืนยันตัวตน" }}/>
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
