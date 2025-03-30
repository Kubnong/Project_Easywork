import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import CustomButton from "../components/CustomButton";
import InputBox from "../components/InputBox";
import { loginUser } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation , setUserToken, setUserId }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // เอาไว้จัดการปุ่มล็อกอิน
    try {
      const response = await loginUser(identifier, password);

      // ตรวจสอบว่า response มีข้อมูลหรือไม่
      if (!response || !response.token || !response.userId) {
        throw new Error("Invalid credentials or no token/userId received");
      }

      // บันทึก Token และ userId ลง AsyncStorage
      // 🔹 บันทึก Token และ userId ลง AsyncStorage
      await AsyncStorage.setItem("userToken", response.token); // ไม่ต้อง JSON.stringify()
      await AsyncStorage.setItem("userId", response.userId.toString()); // เก็บ userId ใน AsyncStorage
      const storedUserId = await AsyncStorage.getItem("userId");
      console.log("✅ Stored userId in AsyncStorage:", storedUserId);

      console.log("Stored userId in AsyncStorage:", response.userId);

      // อัพเดท
      setUserToken(response.token); // ✅ อัปเดต state ใน App.js โดยตรง
      setUserId(response.userId); // ตั้งค่า userId ใน state

      Alert.alert("Login Successful", `Token: ${response.token}`);
      navigation.navigate("HomeScreen")
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Sign in here</Text>
      <Text style={[styles.Text, { color: "#3C3A3A", marginBottom: 30 }]}>
        Welcome back you’ev have been missed!
      </Text>
      <View style={{ marginBottom: 20 }}>
        <InputBox
          placeholder="Username/Email"
          value={identifier}
          onChangeText={setIdentifier}
        />
        <InputBox
          placeholder="Password"
          secure={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <CustomButton
        title="Sign in"
        backgroundColor="#77D499"
        color="white"
        height={58}
        onPress={handleLogin}
      />
      <View style={styles.TextContainer}>
        <Text style={[styles.Text, { color: "#BAADAD" }]}>
          Don’t have an account ?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={{ fontSize: 11, color: "#77D499" }}>Sign Up now</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require("../../assets/11_Success.jpg")}
        style={{ width: 300, height: 300, marginTop: 40, marginBottom: -90 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // จัดตำแหน่งในแนวตั้ง
    justifyContent: "center", // จัดตำแหน่งในแนวนอน
    backgroundColor: "white",
  },
  TextContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  Title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#77D499",
    marginBottom: 10,
  },
  Text: {
    fontSize: 11,
  },
});

export default Login;
