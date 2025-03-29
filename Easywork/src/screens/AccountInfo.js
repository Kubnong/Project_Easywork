import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputBox from "../components/InputBox";
import { getFreelance } from "../services/api";
import * as ImagePicker from "expo-image-picker";

const AccountInfo = ({ navigation, route }) => {
  const { user } = route.params;

  const [freelance, setFreelance] = useState("");
  const [about_freelance, setAbout_freelance] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    const fetchFreelance = async () => {
      try {
        const id_freelance = await AsyncStorage.getItem("id_freelance");
        const data = await getFreelance(id_freelance); // เรียก API เพื่อดึงข้อมูล
        console.log("Freelance data:", data); // ตรวจสอบข้อมูลที่ได้รับจาก API

        if (data && data.length > 0) {
          setFreelance(data[0]); // ถ้ามีข้อมูลในอาร์เรย์ เลือกอ็อบเจ็กต์แรก
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
      if (
        !about_freelance ||
        !username ||
        !about_freelance ||
        !email ||
        !picture
      ) {
        Alert.alert(
          "บันทึกข้อมูลการยืนยันตัวตนผิดพลาด",
          "กรุณากรอกข้อมูลให้ครบถ้วน"
        );
        return;
      }
      const id_freelance = await AsyncStorage.getItem("id_freelance");
      const id_user = await AsyncStorage.getItem("id_user");

      const result = await updateAccount(
        id_freelance,
        about_freelance,
        id_user,
        email,
        username,
        picture
      );

      Alert.alert("สำเร็จ", "อัปเดตข้อมูลเรียบร้อยแล้ว");
    } catch (error) {
      Alert.alert("ข้อผิดพลาด", "ไม่สามารถอัปเดตข้อมูลได้");
    }
  };

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
          <View style={{ alignSelf: "center" }}>
             <Image
                        source={
                          picture ? { uri: picture } : { uri : "https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png"}
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
            placeholder={user?.username || "ไม่พบข้อมูล"}
            borderColor="#D5D5D5"
            width={320}
            height={40}
            onChangeText={setUsername}
          />

          <Text style={[styles.font]}>อีเมล (email)</Text>
          <InputBox
            placeholder={user?.email || "ไม่พบข้อมูล"}
            borderColor="#D5D5D5"
            width={320}
            height={40}
            onChangeText={setEmail}
          />

          <Text style={[styles.font]}>คำอธิบายฟรีแลนซ์</Text>
          <InputBox
            placeholder={freelance?.about_freelance || "ไม่พบข้อมูล"}
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
    textAlign: "center",
    marginTop: 40,
  },
});
export default AccountInfo;
