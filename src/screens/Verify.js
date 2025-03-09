import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "../components/CustomButton";
// import InputBox from "../components/InputBox";
// import Foundation from "@expo/vector-icons/Foundation";
// import AntDesign from "@expo/vector-icons/AntDesign";

const Verify = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>ยืนยันตัวตนว่าคุณคือใคร</Text>

      <View style={styles.ViewContainer}>
        <Text style={styles.Text}>รูปคู่บัตรประชาชน</Text>
        <Text style={styles.Text2}>
          เห็นรายละเอียดชัดเจนและเจ้าของบัตรถือบัตรประชาชนของตนเองเท่านั้น
        </Text>
        <Image
          source={require("../../assets/girl-smile.jpg")}
          style={{
            width: 290,
            height: 156,
            alignSelf: "center",
            borderRadius: 20,
            marginTop: 10,
            marginBottom: 10
          }}
        />
        <CustomButton
          title="อัปโหลดรูปภาพ"
          color="#299335"
          backgroundColor="white"
          borderColor="#D5D5D5"
          width={290}
          height={46}
        />
      </View>

      <CustomButton
        title="บันทึก และไปต่อ"
        color="white"
        backgroundColor="#77D499"
        borderColor="#77D499"
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#4D4C4C",
    marginTop: -250,
    marginBottom: 20
  },

  Text: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#4D4C4C",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  Text2: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#BAADAD",
    paddingHorizontal: 20,
    
  },
  ViewContainer: {
    borderColor: "#D5D5D5",
    borderWidth: 2,
    borderRadius: 20,
    width: 331,
    height: 331,
  },
});

export default Verify;
