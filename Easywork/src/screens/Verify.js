import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";
import Feather from "@expo/vector-icons/Feather";
import InputBox from "../components/InputBox";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";

const Verify = ({ navigation , route}) => {

  const [imageUri, setImageUri] = useState(null); // เก็บ URL ของรูปที่อัปโหลด
  const { user } = route.params; // รับข้อมูล user ที่ส่งมาจากหน้า Profile

  
  const handleUploadImage = async () => {
    // ขออนุญาติเข้าถึงรูปภาพในแกลอรี่
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("การเข้าถึงถูกปฏิเสธ", "โปรดให้สิทธิ์ในการเข้าถึงแกลอรี่");
      return;
    }

    // เปิดการเลือกรูปภาพจากแกลเลอรี
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      const file = result.uri; // ได้ URI ของรูปที่เลือก
      const formData = new FormData();
      formData.append("file", {
        uri: file,
        name: "image.jpg", // หรือเปลี่ยนชื่อไฟล์ตามต้องการ
        type: "image/jpeg", // หรือเปลี่ยนเป็น type ที่ตรงกับไฟล์ที่อัปโหลด
      });

      try {
        const response = await fetch("http://172.20.10.7:5000/upload", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setImageUri(data.imageUrl); // ใช้ URL ที่ได้จาก server
          Alert.alert("อัปโหลดสำเร็จ!", "ไฟล์ของคุณถูกอัปโหลดแล้ว");
        } else {
          throw new Error(data.error || "Upload failed");
        }
      } catch (error) {
        console.error("Upload Error:", error);
        Alert.alert("เกิดข้อผิดพลาด", "อัปโหลดไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      }
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
              imageUri
                ? { uri: imageUri }
                : require("../../assets/girl-smile.jpg")
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
            onPress={handleUploadImage}
          />
        </View>

        <View style={styles.ViewContainer}>
          <Text style={styles.Text}>รูปเห็นบัตรประชาชน</Text>
          <Text style={styles.Text2}>เห็นรายละเอียดครบถ้วนชัดเจน</Text>
          <Image
            source={
              imageUri ? { uri: imageUri } : require("../../assets/idcard.png")
            }
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
              onPress={handleUploadImage}
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
                />
              </View>

              <Text style={styles.Text}>วันเกิด (ปี ค.ศ.)</Text>
              <View style={{ alignSelf: "center" }}>
                <InputBox
                  placeholder="เช่น 2 พฤศจิกายน 2005"
                  borderColor="#D5D5D5"
                  width={320}
                  height={40}
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
                  placeholder="เช่น 102/6 ถนนประชาอุทิศ"
                  borderColor="#D5D5D5"
                  width={320}
                  height={40}
                />
              </View>

              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <View>
                  <Text style={styles.Text}>รหัสไปรษณีย์</Text>
                  <InputBox
                    placeholder="เช่น 60140"
                    borderColor="#D5D5D5"
                    width={150}
                    height={40}
                  />
                </View>

                <View>
                  <View>
                    <Text style={styles.Text}>ตำบล/แขวง</Text>
                    <InputBox
                      placeholder="เช่น หนองหม้อ"
                      borderColor="#D5D5D5"
                      width={150}
                      height={40}
                    />
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <View>
                  <Text style={styles.Text}>อำเภอ/เขต</Text>
                  <InputBox
                    placeholder="เช่น ตาคลี"
                    borderColor="#D5D5D5"
                    width={150}
                    height={40}
                  />
                </View>

                <View>
                  <View>
                    <Text style={styles.Text}>จังหวัด</Text>
                    <InputBox
                      placeholder="เช่น นครสวรรค์"
                      borderColor="#D5D5D5"
                      width={150}
                      height={40}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginVertical : 10}}>
          <CustomButton
            title="บันทึก และไปต่อ"
            color="white"
            backgroundColor="#77D499"
            borderColor="#77D499"
            width={290}
            marginBottom={80}
            icon={<AntDesign name="arrowright" size={24} color="white" />}
            iconPosition="right"
            onPress={() => {
              navigation.navigate("RegisFreelanceScreen" , {user})
            }}
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
