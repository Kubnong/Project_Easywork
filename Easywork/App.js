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
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FunctionBar from "./src/components/FunctionBar";


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

  // 🔹 Stack สำหรับหน้าหลัก (หลังล็อกอิน)
  const MainStack = () => (
    <Stack.Navigator
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
      <Stack.Screen name="HomeScreen" options={{ headerLeft: () => null }}>
        {(props) => (
          <HomeScreen {...props} userId={userId} setUserToken={setUserToken} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Profile">
        {(props) => (
          <Profile {...props} userId={userId} setUserToken={setUserToken} />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="RegisFreelanceScreen"
        component={RegisFreelance}
        options={{ title: "สมัครฟรีแลนซ์" }}
      />

      <Stack.Screen name="AddDetail" component={AddDetail} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen
        name="VerifyScreen"
        component={Verify}
        options={{ title: "ยืนยันตัวตน" }}
      />
    </Stack.Navigator>
  );

  // 🔹 Stack สำหรับล็อกอิน (ก่อนล็อกอิน)
  const AuthStack = () => (
    <Stack.Navigator
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
          <Login {...props} setUserToken={setUserToken} setUserId={setUserId} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );




  return (
    <NavigationContainer>
      {userToken && userId ? <MainStack /> : <AuthStack />}

      {userToken && userId && <FunctionBar />}
    </NavigationContainer>
  );
};

export default App;
