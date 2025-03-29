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
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import InputBox from "../components/InputBox";
import { getFreelance } from "../services/api";

const AccountInfo = ({ navigation, route }) => {
  
  const { user } = route.params; // รับข้อมูล user ที่ส่งมาจากหน้า Profile
  const [freelance , setFreelance] = useState("")

  useEffect(() => {
    const fetchFreelance = async () => {
      try {
        const idFreelance = await AsyncStorage.getItem("id_freelance"); // ดึง id_freelance จาก AsyncStorage
        if (!idFreelance) {
          console.warn("🚨 ไม่พบ id_freelance ใน AsyncStorage");
          return;
        }
  
        const data = await getFreelance(idFreelance); // เรียก API โดยใช้ id
        setFreelance(data);
      } catch (error) {
        console.error("⚠️ Error fetching freelance data:", error);
      }
    };
  
    fetchFreelance();
  }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.Textheader}>รายละเอียดบัญชี</Text>
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
        <Text style={styles.title}>{user.username}</Text>
      </View>
      <View style={styles.optioncontainer}>
        <View style={styles.Viewcontainer}>
          <Text style={[styles.font]}>ชื่อผู้ใช้ (username)</Text>
          <InputBox
            placeholder={`${user.username}`}
            borderColor="#D5D5D5"
            width={320}
            height={40}
          />

          <Text style={[styles.font]}>เบอร์โทรศัพท์ (phone)</Text>
          <InputBox
            placeholder={`${user.email}`}
            borderColor="#D5D5D5"
            width={320}
            height={40}
          />

          <Text style={[styles.font]}>คำอธิบายฟรีแลนซ์</Text>
          <InputBox
            placeholder={`${freelance.about_freelance}`}
            borderColor="#D5D5D5"
            width={320}
            height={40}
          />
        </View>
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
    color: "black",
    marginTop: 15,
  },
  font: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 75,
    marginRight: 10,
    marginTop: 20,
  },
  Viewcontainer: {
    alignSelf: "center",
  },
  Textheader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 40,
  },
});
export default AccountInfo;
