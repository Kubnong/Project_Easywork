import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import InputBox from "../components/InputBox";
import { registerUser } from "../services/api";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const validateField = (field, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    } else {
      if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
        //ตรวจว่าเป็นรูปแบบอีเมลที่ถูกต้องไหม
        error = "Invalid email address";
      } else if (field === "password" && value.length < 8) {
        error = "Please enter a password with at least 8 characters.";
      } else if (field === "confirmpassword" && value.length < 8) {
        error = "Please enter a password with at least 8 characters.";
      } else if (
        field === "password" &&
        field === "confirmpassword" &&
        !(password === confirmpassword)
      ) {
      }
    }
    setErrors((preErrors) => ({ ...preErrors, [field]: error }));
    return error;
  };

  const handleRegister = async () => {
    // เช็คว่ารหัสผ่านและยืนยันรหัสผ่านตรงกันไหม
    if (password !== confirmpassword) {
      return Alert.alert("Error", "Passwords do not match");
    }

    const errors = {
      username: validateField("username", username),
      email: validateField("email", email),
      password: validateField("password", password),
      confirmpassword: validateField("confirmpassword", confirmpassword),
    };

    // ตรวจสอบว่าผลการ validate ทั้งหมดไม่มี error และรหัสผ่านตรงกัน
    if (
      Object.values(errors).every((error) => !error) &&
      password === confirmpassword
    ) {
      // ล้างค่าฟอร์มและ errors
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmpassword("");
      setErrors({ username: "", email: "", password: "", confirmpassword: "" });

      const profilePicURL =
        "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg";

      try {
        console.log("Sending request:", {
          username,
          email,
          password,
          profilePicURL,
        });
        await registerUser(username, email, password);
        Alert.alert("Registration Successful");
        navigation.navigate("LoginScreen");
      } catch (error) {
        Alert.alert("Register Failed", error.message);
      }
    } else {
      // กรณีที่มี error หรือรหัสผ่านไม่ตรงกัน
      setErrors({
        ...errors,
        confirmpassword:
          password !== confirmpassword
            ? "รหัสผ่านไม่ตรงกัน"
            : errors.confirmpassword,
      });
    }
  };

  return (
    <View>
      <View style={styles.Viewcontainer}>
        <Text style={styles.Title}>Create Account</Text>
        <Text style={[styles.Text, { color: "#3C3A3A", marginBottom: 30 }]}>
          Create an account to find the freelance jobs you are interested.
        </Text>

        <View style={styles.container}>
          <View style={{ marginBottom: 25 }}>
            <InputBox
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            {errors.username ? (
              <Text style={styles.errorText}>{errors.username}</Text>
            ) : null}

            <InputBox
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}

            <InputBox
              placeholder="Password"
              secure={true}
              value={password}
              onChangeText={setPassword}
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}

            <InputBox
              placeholder="Confirm Password"
              secure={true}
              value={confirmpassword}
              onChangeText={setConfirmpassword}
            />
            {errors.confirmpassword ? (
              <Text style={styles.errorText}>{errors.confirmpassword}</Text>
            ) : null}
          </View>
        </View>

        <CustomButton
          title="Sign up"
          backgroundColor="#77D499"
          color="white"
          height={58}
          onPress={handleRegister}
        />
        <View style={styles.TextContainer}>
          <Text style={[styles.Text, { color: "#BAADAD" }]}>
            Already have an account ?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={{ fontSize: 11, color: "#77D499" }}>Log in here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center", // จัดตำแหน่งในแนวตั้ง
    justifyContent: "center", // จัดตำแหน่งในแนวนอน
  },
  Viewcontainer: {
    alignItems: "center", // จัดตำแหน่งในแนวตั้ง
    justifyContent: "center", // จัดตำแหน่งในแนวนอน
    marginTop: 30,
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
    fontWeight: "regular",
  },

  errorText: {
    color: "red",
  },
});

export default Register;
