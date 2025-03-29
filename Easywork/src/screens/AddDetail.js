import React, { useState , useEffect} from "react";
import {View, StyleSheet, Text, Image, Alert, ScrollView} from "react-native";
import InputBox from "../components/InputBox";
import CustomButton from "../components/CustomButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from 'expo-image-picker';
import { categories as fetchCategories } from "../services/api";
import { selectType } from "../services/api";
import { addWork } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddDetail = () => {
    const [opencategory, setOpenCategory] = useState(false);
    const [opentypework, setOpenTypework] = useState(false);
    const [selectedcategory, setSelectedcategory] = useState('');
    const [selectedtypework, setSelectedtypework] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [finishtime, setFinishtime] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [typeworks, setTypeworks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                const data = await fetchCategories();
                console.log("Categories Data:", data);
                const categoryArray = Array.isArray(data) ? data : data.categories;
                const formattedCategories = categoryArray.map((category) => ({
                    label: category.name_category || "Unknown",
                    value: category.name_category || "Unknown",
                }));
                setCategories(formattedCategories);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                Alert.alert("Error", "ไม่สามารถดึงข้อมูลได้");
            }
        };
    
        fetchCategoriesData();
    }, []);

    const handleTextChange = (input, field) => {
        // เช็คให้แน่ใจว่าเป็นตัวเลขหรือค่าว่าง
        if (/^\d*$/.test(input)) {
            // อัปเดตค่าในฟิลด์ที่ตรงกัน
            if (field === 'price') {
                setPrice(input);
            } else if (field === 'finishtime') {
                setFinishtime(input);
            }
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images', 'videos'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

    const handleSelect = async () => {
        if (!selectedcategory) {
            return;
        }
        try {
            const data = await selectType(selectedcategory);
            console.log("Typework Data:", data); // ตรวจสอบข้อมูลที่ได้จาก API
            setTypeworks(data); // บันทึกข้อมูลที่ได้จาก API โดยตรง
        } catch (error) {
            Alert.alert("Select Failed", error.message);
            console.error("Error fetching typework:", error);
        }
    };

    const handleAddwork = async () => {
        try {
            const idFreelance = await AsyncStorage.getItem("id_freelance");
            if (!idFreelance) {
                Alert.alert("Error", "ไม่พบข้อมูลฟรีแลนซ์ ");
                return;
            }

            if (!name || !description || !price || !finishtime || !selectedtypework) {
                Alert.alert("Error", "กรุณากรอกข้อมูลให้ครบถ้วน");
                return;
            }
            console.log(name,description,price,finishtime,image,selectedtypework,idFreelance)
            await addWork(name,description,price,finishtime,image,selectedtypework,idFreelance);
            Alert.alert("Addwork Successful");
        }
        catch (error) {
            Alert.alert("Addwork Failed",error.message)
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.textTitle}>หมวดหมู่ของงาน</Text>
                <View style={styles.containerdropdown}>
                    <DropDownPicker
                        open={opencategory}
                        value={selectedcategory}
                        items={categories}
                        setOpen={setOpenCategory}
                        setValue={setSelectedcategory}
                        setItems={setCategories}
                        placeholder="เลือกหมวดหมู่"
                        style={[styles.dropdown, { zIndex: opencategory ? 1 : 0 }]}
                        textStyle={styles.text}
                        dropDownContainerStyle={styles.dropdownContainer}
                        placeholderStyle={{fontSize:13,color:'grey'}}
                        onOpen={() => setOpenTypework(false)}
                        onChangeValue={handleSelect}
                    />
                </View>
                <Text style={styles.textTitle}>ประเภทของงาน</Text>
                <View style={styles.containerdropdown}>
                    <DropDownPicker
                        open={opentypework}
                        value={selectedtypework}
                        items={typeworks}
                        setOpen={setOpenTypework}
                        setValue={setSelectedtypework}
                        setItems={setTypeworks}
                        placeholder="เลือกประเภทงาน"
                        style={[styles.dropdown, { zIndex: opencategory ? 1 : 0 }]}
                        textStyle={styles.text}
                        dropDownContainerStyle={styles.dropdownContainer}
                        placeholderStyle={{fontSize:13,color:'grey'}}
                        onOpen={() => setOpenCategory(false)}
                    />
                </View>
                <Text style={styles.textTitle}>ชื่องาน</Text>
                <InputBox
                    placeholder={'ชื่องาน'}
                    width={370}
                    height={50}
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.textTitle}>คำอธิบายงาน</Text>
                <InputBox
                    placeholder={'คำอธิบายงาน'}
                    width={370}
                    height={50}
                    value={description}
                    onChangeText={setDescription}
                />
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.textTitle}>ราคางานของคุณ</Text>
                        <InputBox
                            placeholder={'ราคา'}
                            width={180}
                            height={40}
                            value={price}
                            onChangeText={(input) => handleTextChange(input, 'price')}
                            keyboardType="numeric"
                        />
                    </View>
                    <View>
                        <Text style={styles.textTitle}>ใช้เวลาทำ</Text>
                        <InputBox
                            placeholder={'เวลาที่ทำงาน'}
                            width={171}
                            height={40}
                            value={finishtime}
                            onChangeText={(input) => handleTextChange(input, 'finishtime')}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={styles.imagecontainer}>
                    {image ? (
                        <Image style={styles.image} source={{ uri: image }} />
                    ) : (
                        <View style={styles.imageUploadContainer}>
                            <AntDesign name="clouduploado" size={120} color="#1D6CE2"/>
                            <Text style={styles.textimage}>
                                อัปโหลดรูปผลงานในขนาด 16:9 ขนาดที่{"\n"}
                                แนะนำ 1280*720px ไม่เกิน 10MB
                            </Text>
                        </View>
                    )}
                    <CustomButton
                        iconPosition={'top'}
                        title={'อัปโหลดภาพหน้าปก'}
                        backgroundColor={'white'}
                        borderColor={'grey'}
                        color={'#1D6CE2'}
                        width={250}
                        height={50}
                        borderRadius={5}
                        onPress={pickImage} // ใช้ pickImage แทน
                    />
                </View>
                <CustomButton
                    title={'บันทึกข้อมูล'}
                    backgroundColor={'#77D499'}
                    color={'white'}
                    width={370}
                    height={50}
                    onPress={handleAddwork}
                />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 50, // เพิ่มพื้นที่ด้านล่าง
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "white",
        justifyContent: "center",
    },
    textTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    image: {
        width: 180,
        height: 180,
    },
    containerdropdown: {
        flex: 1,
    },
    dropdown: {
        width: 370,
        height: 50,
        borderColor: "#77D499",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        margin: 10,
    },
    dropdownContainer: {
        width: 370,
        height: 200,
        margin: 10,
        borderRadius: 10,
        borderColor: "#77D499",
        borderWidth: 1,
        backgroundColor: "#fff",
        elevation: 5,
    },
    text: {
        fontSize: 16,
        color: "#333",
    },
    textimage:{
        fontSize: 12,
        color: "grey",
        textAlign: 'center',
        marginBottom: 20,
    },
    imagecontainer: {
        width: 300,
        height: 270,
        marginHorizontal: 45,
        alignItems: 'center',
        flexDirection: 'column',
        padding: 20,
        borderWidth: 1,
        borderRadius: 20
    },
    imageUploadContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default AddDetail;