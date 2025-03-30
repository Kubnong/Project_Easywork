import React, { useState , useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";
import InputBox from "../components/InputBox";
import Foundation from "@expo/vector-icons/Foundation";
import CustomModal from "../components/CustomModal";
import { getVerify } from "../services/api";
import { saveFreelance } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisFreelance = ({ navigation, route }) => {
  const { user } = route.params; // รับข้อมูล user ที่ส่งมาจากหน้า Profile
  const [modalVisible, setModalVisible] = useState(false);
  const [idVerify, setVerify] = useState(""); //เก็บข้อมูล verify
  const [aboutFreelance, setAboutFreelance] = useState("");
  const handleClose = () => {
    setModalVisible(false);
    navigation.navigate("HomeScreen" )
  };
  
  useEffect(() => {
    const fetchVerify = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId"); // ดึง userId จาก AsyncStorage
            if (userId) {
                const data = await getVerify(userId); // เรียก API เพื่อดึงข้อมูล verify
                console.log("Fetched id_verify:", data); // ตรวจสอบข้อมูลที่ได้จาก API
                if (data && data.id_verify) {
                    setVerify(data.id_verify); // เก็บ id_verify ใน state
                } else {
                    console.error("No id_verify found");
                }
            } else {
                console.error("No userId found in AsyncStorage");
            }
        } catch (error) {
            console.error("Error fetching verify data:", error);
        }
    };

    fetchVerify(); // เรียกฟังก์ชัน async ภายใน useEffect
}, []);


const handleSave = async () => {
  try {
      if (!idVerify) {
          Alert.alert("Error", "ไม่พบข้อมูลการยืนยันตัวตน กรุณาลองใหม่");
          return;
      }

      if (!aboutFreelance.trim()) {
          Alert.alert("Error", "กรุณากรอกข้อมูลเกี่ยวกับฟรีแลนซ์");
          return;
      }

      const result = await saveFreelance(idVerify, aboutFreelance); // ส่งข้อมูลไปที่เซิร์ฟเวอร์
      console.log("Save result:", result); // ตรวจสอบผลลัพธ์จาก API

      if (result && result.id_freelance) {
          // บันทึก id_freelance ลงใน AsyncStorage
          await AsyncStorage.setItem("id_freelance", result.id_freelance.toString());
          const id_freelance = await AsyncStorage.getItem("id_freelance")
          console.log("✅ Stored id_freelance in AsyncStorage:", result.id_freelance);

          setModalVisible(true); // แสดง Modal เมื่อบันทึกสำเร็จ
      } else {
          Alert.alert("Error", "ไม่สามารถบันทึกข้อมูลได้");
      }
  } catch (error) {
      Alert.alert("Error", "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error("Error in handleSave:", error);
  }
};

const handleClose = () => {
  setModalVisible(false);
  navigation.navigate("HomeScreen" )
};

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.Title}>Freelance</Text>

        <Text style={[styles.Title2, { marginRight: 250 }]}>Username</Text>
        <InputBox
          placeholder={user.username}
          borderColor="#D5D5D5"
          editable="false" // ปิดไม่ให้สามารถแก้ไขค่าได้
          pointerEvents="none" // ปิดไม่ให้สามารถโต้ตอบกับ input ได้
          marginBottom={20}
        />

        <Text style={styles.Title2}>
          อธิบายตัวตนของคุณให้ลูกค้ารู้จักมากขึ้น
        </Text>
        <Text style={styles.Text}>
          เล่าประวัติการทำงานของคุณ เช่น ประสบการณ์การทำงาน ประวัติการศึกษา
          ใบรับรองที่เคยได้รับ ฯ
        </Text>

        <View style={styles.adviseContainer}>
          <Foundation
            name="lightbulb"
            size={24}
            color="#757575"
            style={styles.iconlightbulb}
          />
          <Text style={styles.advise}>
            ลูกค้ากว่า 80% อ่านประวัติของคุณ ก่อนตัดสินใจจ้างงาน
          </Text>
        </View>

        <Text style={{ fontSize: 16, marginRight: 220, marginTop: 20 }}>
          เกี่ยวกับฟรีแลนซ์
        </Text>

        <InputBox
          placeholder="อธิบายเกี่ยวกับจุดแข็งของคุณโดยสังเขปเพื่อให้ผู้ว่าจ้างใช้ประกอบการพิจารณา"
          borderColor="#D5D5D5"
          height={"auto"}
          multiline={true}
          marginBottom={25}
          onChangeText={setAboutFreelance}
        />

        <CustomButton
          title="บันทึก"
          color="white"
          backgroundColor="#77D499"
          borderColor="#77D499"
          marginBottom={80}
          onPress={handleSave}
        />

        <CustomModal
          visible={modalVisible}
          onClose={handleClose}
          title="ยินดีด้วย คุณเปิดบัญชีฟรีแลนซ์สำเร็จแล้ว!"
          message="พร้อมให้คุณสัมผัสประสบการณ์ ที่พร้อมเปลี่ยนไอเดียของคุณให้เป็นความจริง พร้อมสิทธิพิเศษของฟรีแลนซ์อีกมากมาย! "
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // จัดตำแหน่งในแนวตั้ง
    justifyContent: "center", // จัดตำแหน่งในแนวนอน
    backgroundColor: "white",
  },
  Title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#77D499",
    marginTop: 20,
    marginLeft: -180,
    marginBottom: 20,
  },
  Title2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4D4C4C",
  },
  Text: {
    fontSize: 14,
    fontWeight: "regular",
    color: "#7E7E7E",
    textAlign: "center",
    marginBottom: 20,
  },
  adviseContainer: {
    flexDirection: "row",
    alignItems: "center", // จัดให้อยู่กึ่งกลางแนวตั้ง
    paddingVertical: 10, // ช่วยให้ข้อความดูสมดุล
    backgroundColor: "#e4f6eb",
    borderColor: "#77D499",
    borderWidth: 1,
    borderRadius: 20,
  },
  advise: {
    fontSize: 16,
    width: 331,
    height: 61,
    color: "#299335",
    textAlignVertical: "center",
    paddingHorizontal: 50,
  },
  iconlightbulb: {
    position: "relative",
    left: 25,
  },
});

export default RegisFreelance;
