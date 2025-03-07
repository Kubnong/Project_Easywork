import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import InputBox from "../components/InputBox";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";

const RegisFreelance = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Freelance</Text>

      <Text style={[styles.Title2, { marginRight: 250 }]}>Username</Text>
      <InputBox
        placeholder="Username"
        borderColor="#D5D5D5"
        marginBottom={20}
      />

      <Text style={styles.Title2}>อธิบายตัวตนของคุณให้ลูกค้ารู้จักมากขึ้น</Text>
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
        height={175}
        multiline={true}
        marginBottom={25}
      />

      <CustomButton
        title="บันทึก และไปต่อ"
        color="white"
        backgroundColor="#77D499"
        borderColor="#77D499"
        icon={<AntDesign name="arrowright" size={24} color="white" />}
        iconPosition="right"
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
  Title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#77D499",
    marginTop: -30,
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
    left: 25
  }
});

export default RegisFreelance;
