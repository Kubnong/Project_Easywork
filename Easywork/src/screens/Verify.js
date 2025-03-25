import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import Feather from "@expo/vector-icons/Feather";
import CustomModal from "../components/CustomModal";

const Verify = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleClose = () => {
    setModalVisible(false);
  };

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
            width: 259,
            height: 127,
            alignSelf: "center",
            borderRadius: 20,
            marginTop: 5,
            marginBottom: 5,
          }}
        />
        <CustomButton
          title="อัปโหลดรูปภาพ"
          color="#299335"
          backgroundColor="white"
          borderColor="#D5D5D5"
          width={259}
          icon={<Feather name="upload-cloud" size={24} color="#299335" />}
          iconPosition="right"
          onPress={() => navigation.navigate("VerifyScreen")}
        />
      </View>

      <View style={styles.ViewContainer}>
        <Text style={styles.Text}>รูปเห็นบัตรประชาชน</Text>
        <Text style={styles.Text2}>เห็นรายละเอียดครบถ้วนชัดเจน</Text>
        <Image
          source={require("../../assets/idcard.png")}
          style={{
            width: 259,
            height: 150,
            alignSelf: "center",
            borderRadius: 20,
            marginTop: 5,
            marginBottom: 5,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <CustomButton
            title="อัปโหลดรูปภาพ"
            color="#299335"
            backgroundColor="white"
            borderColor="#D5D5D5"
            width={259}
            icon={<Feather name="upload-cloud" size={24} color="#299335" />}
            iconPosition="right"
            onPress={() => navigation.navigate("VerifyScreen")}
          />
        </View>
      </View>

      <CustomButton
        title="บันทึก"
        color="white"
        backgroundColor="#77D499"
        borderColor="#77D499"
        width={290}
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <CustomModal
        visible={modalVisible}
        onClose={handleClose}
        title="ยินดีด้วย คุณเปิดบัญชีฟรีแลนซ์สำเร็จแล้ว!"
        message="พร้อมให้คุณสัมผัสประสบการณ์ ที่พร้อมเปลี่ยนไอเดียของคุณให้เป็นความจริง พร้อมสิทธิพิเศษของฟรีแลนซ์อีกมากมาย! "
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
    marginBottom: 10,
  },

  Text: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#4D4C4C",
    paddingHorizontal: 20, // ความกว้างภายในเท่าๆกัน
    marginTop: 10,
    marginBottom: 5,
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
    width: 300,
    height: 280,
    marginBottom: 10,
    marginVertical: 5,
  },
});

export default Verify;
