import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import CustomButton from "../components/CustomButton";
import InputBox from "../components/InputBox";

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Sign in here</Text>
      <Text style={[styles.Text, { color: "#3C3A3A", marginBottom: 30 }]}>
        Welcome back you’ev have been missed!
      </Text>
      <View style={{ marginBottom: 20 }}>
        <InputBox placeholder="Username" />
        <InputBox placeholder="Password" secure={true} />
      </View>
      <CustomButton
        title="Sign up"
        backgroundColor="#77D499"
        color="white"
        height={58}
      />
      <View style={styles.TextContainer}>
        <Text style={[styles.Text, { color: "#BAADAD"}]}>
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
  TextContainer:{
    flexDirection:"row",
    marginTop: 10
  },
  Title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#77D499",
    marginBottom: 10,
  },
  Text: {
    fontSize: 11,
    fontWeight: "regular",
  },
});

export default Login;
