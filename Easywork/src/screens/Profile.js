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
  const [userToken, setUsertoken] = useState("");

  console.log("Received userId:", userId); // ตรวจสอบค่าของ userId ที่ได้รับ

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("🟡 Fetching profile for userId:", userId); // Debug log
      const userToken = await AsyncStorage.getItem("userToken");
      setUsertoken(userToken);

      if (!userId) {
        console.warn("Skipping API call: userId is null or undefined");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://192.168.0.16:5000/profile/${userId}`
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
      navigation.navigate("LoginScreen");
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
              "https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png",
          }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.title}>{user.username}</Text>
          <Text style={{marginLeft: 5, color: "white" ,}}>user id : {userId}</Text>
        </View>
      </View>
      <View style={styles.optioncontainer}>
        <TouchableOpacity
          style={[styles.option, { marginTop: 15 }]}
          onPress={() => navigation.navigate("VerifyScreen", { user })}
        >
          <FontAwesome5 name="credit-card" size={35} color="grey" />
          <Text style={[styles.font, { textAlignVertical: "center" }]}>
            สมัครเป็นฟรีแลนซ์
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("AccountInfoScreen", { user })}
        >
          <Ionicons name="person" size={35} color="grey" />
          <View>
            <Text style={[styles.font, { marginLeft: 15 }]}>ข้อมูลบัญชี</Text>
            <Text style={{ marginLeft: 15, color: "#7E7E7E" }}>
              รายละเอียดบัญชี, ข้อมูลติดต่อ, รหัสผ่าน
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="book" size={35} color="grey" />
          <View>
            <Text style={[styles.font, { marginLeft: 15 }]}>
              เพิ่มงานของฉัน
            </Text>
            <Text style={{ marginLeft: 15, color: "#7E7E7E" }}>
              เพิ่มรายละเอียดงาน
            </Text>
          </View>
        </TouchableOpacity>

        <CustomButton
          title="Logout"
          backgroundColor="red"
          color="white"
          marginTop={"75%"}
          onPress={logout}
        />
      </View>
      <FunctionBar />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7adf9f",
  },
  headcontaienr: {
    flexDirection: "row",
    backgroundColor: "#7adf9f",
    padding: 10,
    alignItems: "center",
  },
  optioncontainer: {
    backgroundColor: "white",
    height: "100%",
    marginTop: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    shadowColor: "black",
    // เงาสำหรับ iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // เงาสำหรับ Android
    elevation: 8,
  },
  option: {
    flexDirection: "row",
    backgroundColor: "#aefcdd",
    borderColor: "#7E7E7E",
    borderWidth: 0.6,
    padding: 15,
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
    marginVertical: 5,
    shadowColor: "black",
    // เงาสำหรับ iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // เงาสำหรับ Android
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 45,
    marginLeft: 5,
  },
  font: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "brown",
    marginRight: 10,
    marginTop: 50,
    shadowColor: "black",
    // เงาสำหรับ iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // เงาสำหรับ Android
    elevation: 9,
  },
});
export default Profile;
