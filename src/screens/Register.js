import React from "react";
import { View, Text, StyleSheet ,TouchableOpacity } from "react-native";
import CustomButton from "../components/CustomButton";
import InputBox from "../components/InputBox";

const Register = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Create Account</Text>
      <Text style={[styles.Text, { color: "#3C3A3A", marginBottom: 30 }]}>
        Create an account to find the freelance jobs you are interested.
      </Text>
      <View style={{ marginBottom: 25 }}>
        <InputBox placeholder="Username" />
        <InputBox placeholder="Email" />
        <InputBox placeholder="Password" secure={true} />
        <InputBox placeholder="Confirm Password" secure={true} />
      </View>
      <CustomButton
        title="Sign up"
        backgroundColor="#77D499"
        color="white"
        height={58}
      />
      <View style={styles.TextContainer}>
            <Text style={[styles.Text, { color: "#BAADAD"}]}>
            Already have an account ?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={{ fontSize: 11, color: "#77D499" }}>Log in here</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 10,
    marginBottom: 100
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

export default Register;
