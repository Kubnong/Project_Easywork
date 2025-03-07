import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "../components/CustomButton";

const StartScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Easywork</Text>
      <Text style={styles.texttop}>มั่นใจทุกการจ้างงาน Easywork</Text>
      <Text style={[styles.texttop]}>
        เราช่วยให้การหางาน และจ้างงานเป็นเรื่องง่าย
      </Text>
      <Image
        source={require("../../assets/men-homepage.jpg")}
        style={{ width: 200, height: 200, marginTop: 60 }}
      />
      <Text style={[styles.textbottom, { marginTop: 10 }]}>Discover Your</Text>
      <Text style={styles.textbottom}>Dream Job here</Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="สมัครสมาชิก"
          color="#77D499"
          backgroundColor="white"
          borderColor="#D4D4D4"
          width={156}
          borderRadius={10}
          onPress={() => navigation.navigate("RegisterScreen")}
        />
        <CustomButton
          title="เข้าสู่ระบบ"
          color="#77D499"
          backgroundColor="white"
          borderColor="#D4D4D4"
          borderRadius={10}
          width={156}
          onPress={() => navigation.navigate("LoginScreen")}
        />
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#77D499",
    marginBottom: 10,
  },
  texttop: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#77D499",
  },
  textbottom: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#77D499",
  },
  buttonContainer : {
    flexDirection: "row",
    justifyContent:"space-between",
    
    marginTop: 20,
    marginBottom: 50
  }
});

export default StartScreen;
