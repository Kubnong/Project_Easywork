import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import FunctionBar from "../components/FunctionBar";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Profile = ({ navigation, setUserToken, userId }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  console.log("Received userId:", userId); // ตรวจสอบค่าของ userId ที่ได้รับ

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("🟡 Fetching profile for userId:", userId); // Debug log

      if (!userId) {
        console.warn("Skipping API call: userId is null or undefined");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://192.168.1.125:5000/profile/${userId}`
        );
        setUser(response.data); // เก็บข้อมูลผู้ใช้ที่ดึงมา
      } catch (error) {
        if (error.response) {
          // ถ้าเกิด error กับ API
          if (error.response.status === 404) {
            setError("User not found"); // แสดงข้อความถ้าเป็น 404
          } else {
            setError("An error occurred"); // แสดงข้อความถ้าเกิด error อื่น
          }
        } else {
          // ถ้าไม่มีการตอบกลับจาก server
          setError("Network error");
        }
      } finally {
        setLoading(false); // เมื่อโหลดเสร็จแล้ว เปลี่ยนสถานะเป็น false
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // แสดง ActivityIndicator ขณะกำลังโหลด
  }

  if (!user) {
    return <Text>User not found</Text>;
  }

  const logout = async () => {
    try {

      // ลบ token และ userId ออกจาก AsyncStorage
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");

      // กำหนด userId เป็น null ใน state หรือให้ค่าที่เหมาะสม
      setUserToken(null); // ปรับสถานะการล็อกอินของผู้ใช้

      // นำทางไปยังหน้า LoginScreen
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headcontaienr}>
        {/* <Ionicons name="person" size={50} color="black" /> */}
        <Image
          source={{
            uri:
              user.picture ||
              "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.title}>ชื่อ : {user.username}</Text>
      </View>
      <View style={styles.optioncontainer}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("VerifyScreen" , {user})}>
          <FontAwesome5 name="credit-card" size={35} color="grey" />
          <Text style={styles.font}>สมัครเป็นฟรีแลนซ์</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="person" size={35} color="grey" />
          <View>
            <Text style={[styles.font, { marginLeft: 15 }]}>ข้อมูลบัญชี</Text>
            <Text style={{ marginLeft: 15 }}>
              รายละเอียดบัญชี, ข้อมูลติดต่อ, รหัสผ่าน
            </Text>
          </View>
        </TouchableOpacity>
        <CustomButton title="Logout" backgroundColor="red" onPress={logout} />
      </View>
      <FunctionBar />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headcontaienr: {
    height: 80,
    flexDirection: "row",
    backgroundColor: "#77D499",
    padding: 10,
    alignItems: "center",
  },
  optioncontainer: {},
  option: {
    flexDirection: "row",
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  font: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 75,
    marginRight: 10,
  },
});
export default Profile;
