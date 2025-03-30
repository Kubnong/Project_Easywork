import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputBox from "../components/InputBox";
import { getFreelance, updateAccount } from "../services/api";
import * as ImagePicker from "expo-image-picker";

const AccountInfo = ({ navigation, route }) => {
  const { user } = route.params;

  const [freelance, setFreelance] = useState("");
  const [about_freelance, setAbout_freelance] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [picture, setPicture] = useState("");
  const [id_freelance, setIdFreelance] = useState(null);
  const [id_user, setIdUser] = useState("");

  useEffect(() => {
    const fetchFreelance = async () => {
      try {
        const id_freelance = await AsyncStorage.getItem("id_freelance");

        const stored_id_freelance = await AsyncStorage.getItem("id_freelance");
        const stored_id_user = await AsyncStorage.getItem("userId");

        setIdFreelance(stored_id_freelance);
        setIdUser(stored_id_user);

        const data = await getFreelance(id_freelance); // เรียก API เพื่อดึงข้อมูล
        console.log("Freelance data:", data); // ตรวจสอบข้อมูลที่ได้รับจาก API

        if (data && data.length > 0) {
          const freelanceInfo = data[0];
          setAbout_freelance(freelanceInfo.about_freelance || "");
          setEmail(freelanceInfo.email || "");
          setUsername(freelanceInfo.username || "");
          setPicture(freelanceInfo.picture || null);
        }
      } catch (error) {
        Alert.alert("Error", "ไม่สามารถดึงข้อมูลได้");
      }
    };

    fetchFreelance();
  }, []);

  const pickNewImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    try {
      // ตรวจสอบว่า user มีข้อมูลครบถ้วนหรือไม่
      if (!picture || !username || !email || !about_freelance) {
        Alert.alert("ข้อผิดพลาด", "กรุณากรอกข้อมูลทั้งหมด");
        navigation.navigate("Profile"); // ถ้าไม่มีข้อมูลครบถ้วน ไปที่หน้า Profile
        return;
      }
      console.log(
        about_freelance,
        username,
        picture,
        email,
        id_freelance,
        id_user
      );

      // ตรวจสอบว่า email เป็นรูปแบบที่ถูกต้องหรือไม่
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        Alert.alert("ข้อผิดพลาด", "กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง");
        return;
      }

      // เรียกใช้ updateAccount จาก api.js
      const response = await updateAccount(
        id_freelance,
        about_freelance,
        id_user,
        email,
        username,
        picture
      );

      // ตรวจสอบการตอบกลับจาก API
      if (response.success) {
        // ถ้าการอัปเดตสำเร็จ แสดงข้อความสำเร็จ

        const userId = id_user;
        navigation.navigate("Profile", { userId });
      } else {
        // ถ้าการอัปเดตไม่สำเร็จ แสดงข้อความข้อผิดพลาด
        Alert.alert("ข้อผิดพลาด", response.message);
      }
    } catch (error) {
      // ถ้ามีข้อผิดพลาดในการเชื่อมต่อหรือส่งข้อมูล
      Alert.alert("ข้อผิดพลาด", "ไม่สามารถอัปเดตข้อมูลได้");
      console.error("Error updating account:", error); // แสดงข้อผิดพลาดใน console เพื่อการดีบัก
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => { navigation.goBack()}}><Ionicons
          name="arrow-back-circle-sharp"
          size={40}
          color="white"
          style={{position:"relative" , left:20 , bottom:1}}
        /></TouchableOpacity>
        <Text style={styles.Textheader}>รายละเอียดบัญชี</Text>
      </View>

     
      <View style={styles.optioncontainer}>
        <View style={styles.Viewcontainer}>
          <View style={{ alignSelf: "center" }}>
            <Image
              source={
                picture
                  ? { uri: picture }
                  : {
                      uri: "https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png",
                    }
              }
              style={styles.profileImage2}
            />
            <TouchableOpacity onPress={pickNewImage}>
              <Text
                style={{
                  color: "#7E7E7E",
                  textAlign: "center",
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                แก้ไข
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.font]}>ชื่อผู้ใช้ (username)</Text>
          <InputBox
            placeholder={username || "ไม่พบข้อมูล"}
            borderColor="#D5D5D5"
            width={320}
            height={40}
            onChangeText={setUsername}
          />

          <Text style={[styles.font]}>อีเมล (email)</Text>
          <InputBox
            placeholder={email || "ไม่พบข้อมูล"}
            borderColor="#D5D5D5"
            width={320}
            height={40}
            onChangeText={setEmail}
          />

          <Text style={[styles.font]}>คำอธิบายฟรีแลนซ์</Text>
          <InputBox
            placeholder={about_freelance || "ไม่พบข้อมูล"}
            borderColor="#D5D5D5"
            width={320}
            height={"auto"}
            multiline={true}
            onChangeText={setAbout_freelance}
          />
        </View>
        <CustomButton
          title="บันทึก"
          color="white"
          backgroundColor="#77D499"
          borderColor="#77D499"
          width={290}
          marginTop={20}
          marginBottom={80}
          onPress={handleUpdate}
        />
      </View>
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
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    marginTop: 15,
    marginLeft: 15,
  },
  font: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginTop: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 75,
    marginRight: 10,
    marginTop: 20,
  },
  profileImage2: {
    width: 100,
    height: 100,
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
    marginLeft: 30,
  },
  headerView: {
    marginTop: 70,
    flexDirection: "row",
    marginBottom:20,

  },
});
export default AccountInfo;
