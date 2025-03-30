import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import HomeScreen from "./src/screens/HomeScreen";
import Profile from "./src/screens/Profile";
import AddDetail from "./src/screens/AddDetail";
import StartScreen from "./src/screens/StartScreen";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import RegisFreelance from "./src/screens/RegisFreelance";
import Verify from "./src/screens/Verify";
import DetailScreen from "./src/screens/DetailScreen";
import WorkScreen from "./src/screens/WorkScreen";
import EmploymentScreen from "./src/screens/EmploymenScreen";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AccountInfo from "./src/screens/AccountInfo";
import { LogBox } from "react-native";

const Stack = createStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const userId = await AsyncStorage.getItem("userId");
        LogBox.ignoreLogs(['The action "RESET" with payload', "Warning: ..."]);
        setUserToken(token);
        setUserId(userId);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
      setLoading(false);
    };
    loadUserData();
  }, []);

  if (loading) return null; // แสดงหน้าโหลด

  // // 🔹 Stack สำหรับหน้าหลัก (หลังล็อกอิน)
  // const MainStack = () => (

  // );

  // // 🔹 Stack สำหรับล็อกอิน (ก่อนล็อกอิน)
  // const AuthStack = () => (

  // );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userToken && userId ? "HomeScreen" : "StartScreen"}
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
            name="StartScreen"
            component={StartScreen}
            options={{ headerLeft: () => null }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={Register}
            options={{ title: "สมัครสมาชิก" }}
          />
          <Stack.Screen
            name="LoginScreen"
            options={{ title: "เข้าสู่ระบบ", headerLeft: () => null }}
          >
            {(props) => (
              <Login
                {...props}
                setUserToken={setUserToken}
                setUserId={setUserId}
              />
            )}
          </Stack.Screen>
       
        <Stack.Screen
          name="HomeScreen"
          options={{ headerLeft: () => null, headerShown: false }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              userId={userId}
              setUserToken={setUserToken}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Profile" options={{ headerShown: false }}>
          {(props) => (
            <Profile {...props} userId={userId} setUserToken={setUserToken} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="AccountInfoScreen"
          component={AccountInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyScreen"
          component={Verify}
          options={{ title: "ยืนยันตัวตน" }}
        />
        <Stack.Screen
          name="RegisFreelanceScreen"
          component={RegisFreelance}
          options={{ title: "สมัครฟรีแลนซ์" }}
        />
        <Stack.Screen name="AddDetail" component={AddDetail} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="WorkScreen" component={WorkScreen} />
        <Stack.Screen name="EmploymentScreen" component={EmploymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
