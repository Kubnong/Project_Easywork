import React, {useState,useEffect} from "react";
import {View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity, Image  } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FunctionBar from "../components/FunctionBar.js";
import { categories } from "../services/api.js";
import { getTypeWork } from "../services/api.js";

const HomeScreen = ({navigation}) => {
    const [categoriesData, setCategories] = useState([]); // เก็บข้อมูล categories
    const [typeworkData, setTypeWork] = useState([]); // เก็บข้อมูล typework
    const [searchCategory, setSearchCategory] = useState("");
    const [searchText, setSearchText] = useState("");

    const filteredResults = typeworkData.filter((typework) => {
        const matchesSearchText = searchText
            ? typework.name_typework && typework.name_typework.toLowerCase().includes(searchText.toLowerCase())
            : true; // ถ้า searchText ว่าง ให้ผ่านเงื่อนไขนี้
        const matchesCategory = searchCategory
            ? typework.id_category && typework.id_category === searchCategory
            : true; // ถ้า searchCategory ว่าง ให้ผ่านเงื่อนไขนี้
        return matchesSearchText && matchesCategory; // ต้องตรงทั้งสองเงื่อนไข
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataCategories = await categories(); // ดึงข้อมูล categories
                const dataTypework = await getTypeWork(); // ดึงข้อมูล typework
                console.log("Fetched categoriesData:", dataCategories);
                console.log("--------------------------")
                console.log("Fetched typeworkData:", dataTypework);
                setCategories(dataCategories); // เก็บ categories ใน state
                setTypeWork(dataTypework); // เก็บ typework ใน state
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // ปิดสถานะการโหลด
            }
        };
        fetchData();
    }, []);

    return(
        <View style={styles.container}>
            <View style={{backgroundColor : "#7adf9f"}}>
                <Text style={styles.title}>ค้นหาฟรีแลนซ์ที่คุณสนใจ</Text>
                <View style={styles.searchContainer}>
                    <Feather name="search" size={26} color="#7E7E7E" style={styles.icon}/>
                    <TextInput
                        style = {styles.font}
                        placeholder="Search"
                        placeholderTextColor="#7E7E7E"
                        onChangeText={setSearchText}
                    />
                </View>
            </View>
            <Text style={[styles.font , {fontSize : 16 , marginLeft : 20 , fontWeight : "bold" , color: "#1c3d2f"}]}>หมวดหมู่ทั้งหมด</Text>
            <TouchableOpacity 
                style={styles.test}
                onPress={() => navigation.navigate("AddDetail")}
            > 
                <Text>Test Add Work</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.test}
                onPress={() => navigation.navigate("WorkScreen")}
            > 
                <Text>Test WorkScreen</Text>
            </TouchableOpacity>
            <View>
                <FlatList
                    data={categoriesData}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => `${item.id_category}-${index}`}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            style={styles.categoryItem}
                            onPress={() => setSearchCategory(item.id_category === searchCategory ? "" : item.id_category)}
                        >
                            <Text style={{fontWeight : "bold" , color : "#1a3c30" }}>{item.name_category}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={{padding:10 , marginTop :10 , marginBottom : 70 , flex : 1}}>
                <FlatList
                    data={filteredResults}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    numColumns={2}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.worktypecontainer}>
                            <Image
                                style={styles.tinyLogo}
                                source={{ uri : item.pic}}
                            />
                            <Text style={{padding : 5}}>{item.name_typework}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <FunctionBar />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white',
    },
    title:{
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginLeft : 20,
        marginTop : 10
    },
    searchContainer: {
        alignItems:'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor:'#77D499',
        borderWidth: 3,
        borderRadius: 20,
        paddingHorizontal: 10,
        margin: 10,
    },
    font: {
        fontSize: 14,
        color: 'black',
    },
    categoryItem: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#9af8d3',
        borderColor:'#77D499', //#77D499
        padding: 10,
        marginHorizontal: 5,
        borderWidth:3,
        borderRadius: 20,
        marginTop:5,
        width:160,
        height:60,
        shadowColor: "black",
        // เงาสำหรับ iOS
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        // เงาสำหรับ Android
        elevation: 8,
    },
    tinyLogo: {
        width: '100%',
        height: '80%',
        borderRadius:8
    },
    worktypecontainer:{
        width: 180,
        height: 180 ,
        backgroundColor: 'white',
        borderColor: '#77D499', //#3674B5
        borderWidth: 2, // เพิ่มระยะห่างด้านในของการ์ด
        borderRadius: 20, // มุมของการ์ดโค้งมน 10 หน่วย
        marginBottom:10,
        padding : 10,
        shadowColor: "black",
        // เงาสำหรับ iOS
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        // เงาสำหรับ Android
        elevation: 8,
    },
    test:{
        width: 100,
        height: 30,
        backgroundColor: 'white',
        borderColor: '#3674B5', 
        borderWidth: 2, // เพิ่มระยะห่างด้านในของการ์ด
        borderRadius: 10, // มุมของการ์ดโค้งมน 10 หน่วย
        marginBottom:10
    }
})
export default HomeScreen;