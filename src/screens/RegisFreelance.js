import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import InputBox from "../components/InputBox";
import Foundation from '@expo/vector-icons/Foundation';

const RegisFreelance = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Freelance</Text>
      <Text style={styles.Title2}>Username</Text>
      <InputBox placeholder="Username" />
      <Text style={styles.Title2}>อธิบายตัวตนของคุณให้ลูกค้ารู้จักมากขึ้น</Text>
      <Text style={styles.Text}>
        เล่าประวัติการทำงานของคุณ เช่น ประสบการณ์การทำงาน ประวัติการศึกษา
        ใบรับรองที่เคยได้รับ ฯ
      </Text>
      <View style={styles.adviseContainer}>
        <Text style={styles.advise}>
        <Foundation name="lightbulb" size={24} color="#757575" />
          ลูกค้ากว่า 80% อ่านประวัติของคุณ ก่อนตัดสินใจจ้างงาน
        </Text>
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
  Title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#77D499",
  },
  Title2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4D4C4C",
  },
  Text: {
    fontSize: 14,
    fontWeight: "regular",
    color: "#7E7E7E",
    textAlign: "center",
  },
  adviseContainer : {
    textAlign: "center"
  },
  advise: {
    fontSize: 16,
    width: 331,
    height: 61,
    backgroundColor: "#e4f6eb",
    color: "#299335",
    borderColor: "#77D499",
    borderWidth: 1,
    borderRadius: 20,
    textAlignVertical: "center",
    paddingHorizontal: 50,
  },
});

export default RegisFreelance;
