import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import Feather from "@expo/vector-icons/Feather";
import InputBox from "../components/InputBox";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { addVerify } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Verify = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [Idcard, setIdcard] = useState("");
  const [Birthdate, setBirthdate] = useState("");
  const [Address, setAddress] = useState("");
  const [Selfieimage, setSelfieimage] = useState(null);

  const { user } = route.params; // รับข้อมูล user ที่ส่งมาจากหน้า Profile

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickSelfieimage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setSelfieimage(result.assets[0].uri);
    }
  };

  const handleVerify = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        Alert.alert("Error", "ไม่พบข้อมูลผู้ใช้ กรุณาล็อกอินใหม่");
        return;
      }

      if (
        (!Name || !Surname || !Birthdate || !Address || !Idcard || !Selfieimage || !image)
      ) {
        Alert.alert("บันทึกข้อมูลการยืนยันตัวตนผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }

      console.log(
        Name,
        Surname,
        Idcard,
        Birthdate,
        Address,
        Selfieimage,
        image,
        userId
      );
      await addVerify(
        Name,
        Surname,
        Idcard,
        Birthdate,
        Address,
        Selfieimage,
        image,
        userId
      );
      navigation.navigate("RegisFreelanceScreen", { user });
      Alert.alert("Addverify Successful");
    } catch (error) {
      Alert.alert("Addverify Failed", error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.Title}>ยืนยันตัวตนว่าคุณคือใคร</Text>

        <View style={styles.ViewContainer}>
          <Text style={styles.Text}>รูปคู่บัตรประชาชน</Text>
          <Text style={styles.Text2}>
            เห็นรายละเอียดชัดเจนและเจ้าของบัตรถือบัตรประชาชนของตนเองเท่านั้น
          </Text>
          <Image
            source={
              image ? { uri: image } : require("../../assets/girl-smile.jpg")
            }
            style={{
              width: 310,
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
            onPress={pickImage}
          />
        </View>

        <View style={styles.ViewContainer}>
          <Text style={styles.Text}>รูปเห็นบัตรประชาชน</Text>
          <Text style={styles.Text2}>เห็นรายละเอียดครบถ้วนชัดเจน</Text>
          <Image
            source={Selfieimage ? { uri: Selfieimage } : require("../../assets/idcard.png")}
            style={{
              width: 310,
              height: 150,
              alignSelf: "center",
              borderRadius: 20,
              marginTop: 5,
              marginBottom: 5,
            }}
          />
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <CustomButton
              title="อัปโหลดรูปภาพ"
              color="#299335"
              backgroundColor="white"
              borderColor="#D5D5D5"
              width={259}
              icon={<Feather name="upload-cloud" size={24} color="#299335" />}
              iconPosition="right"
              onPress={pickSelfieimage}
            />
          </View>
        </View>

        <View style={styles.ViewContainer}>
          <Text style={styles.Text}>ข้อมูลบัตรประชาชน</Text>
          <Text style={styles.Text2}>ใช้เพื่อยืนยันตัวตน</Text>

          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <View>
                <Text style={styles.Text}>ชื่อ (ภาษาไทย)</Text>
                <InputBox
                  placeholder="ชื่อ"
                  borderColor="#D5D5D5"
                  width={150}
                  height={40}
                  onChangeText={setName}
                />
              </View>

              <View>
                <View>
                  <Text style={styles.Text}>นามสกุล (ภาษาไทย)</Text>
                  <InputBox
                    placeholder="ชื่อ"
                    borderColor="#D5D5D5"
                    width={150}
                    height={40}
                    onChangeText={setSurname}
                  />
                </View>
              </View>
            </View>

            <View>
              <Text style={styles.Text}>หมายเลขบัตรประชาชน</Text>
              <View style={{ alignSelf: "center" }}>
                <InputBox
                  placeholder="หมายเลข 13 หลัก"
                  borderColor="#D5D5D5"
                  width={320}
                  height={40}
                  onChangeText={setIdcard}
                />
              </View>

              <Text style={styles.Text}>วันเกิด (ปี ค.ศ.)</Text>
              <View style={{ alignSelf: "center" }}>
                <InputBox
                  placeholder="เช่น 2 พฤศจิกายน 2005"
                  borderColor="#D5D5D5"
                  width={320}
                  height={40}
                  onChangeText={setBirthdate}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.ViewContainer}>
          <Text style={styles.Text}>ที่อยู่บัตรประชาชน</Text>
          <Text style={styles.Text2}>
            กรุณากรอกข้อมูลให้ตรงกับบัตรประชาชนของคุณ
          </Text>

          <View style={{ flexDirection: "column" }}>
            <View>
              <Text style={styles.Text}>รายละเอียดที่อยู่</Text>
              <View style={{ alignSelf: "center" }}>
                <InputBox
                  placeholder="เช่น 102/6 ตำบล อำเภอ จังหวัด ไปรษณีย์"
                  borderColor="#D5D5D5"
                  width={320}
                  height="auto"
                  multiline={true}
                  onChangeText={setAddress}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <CustomButton
            title="บันทึก และไปต่อ"
            color="white"
            backgroundColor="#77D499"
            borderColor="#77D499"
            width={290}
            marginBottom={80}
            icon={<AntDesign name="arrowright" size={24} color="white" />}
            iconPosition="right"
            onPress={handleVerify}
          />
        </View>
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#4D4C4C",
    marginTop: 25,
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
    marginBottom: 5,
  },
  ViewContainer: {
    borderColor: "#D5D5D5",
    borderWidth: 2,
    borderRadius: 20,
    width: 350,
    height: "auto",
    marginVertical: 10,
    paddingVertical: 10,
  },
});

export default Verify;
