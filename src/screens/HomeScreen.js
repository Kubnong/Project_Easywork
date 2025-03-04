import React from "react";
import {View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FunctionBar from "../components/functionbar";

const categories = [
    { id: '1', name: 'แนะนำ'},
    { id: '2', name: 'ออกแบบกราฟิก'},
    { id: '3', name: 'เว็บไซต์และเทคโนโลยี'},
    { id: '4', name: 'สถาปัตย์และวิศวกรรม'},
    { id: '5', name: 'เขียนและแปลภาษา'},
];
const worktype = [
    { id: '1', name: 'ทำ SEO', category:'เว็บไซต์และเทคโนโลยี'},
    { id: '2', name: 'Logo', category:'ออกแบบกราฟิก'}, 
    { id: '3', name: 'Web Development', category:'เว็บไซต์และเทคโนโลยี'},
    { id: '4', name: 'เขียนและออกแบบโครงสร้าง', category:'สถาปัตย์และวิศวกรรม'},
    { id: '5', name: 'แปลภาษา', category:'เขียนและแปลภาษา'},
]
const HomeScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>ค้นหาฟรีแลนซ์ที่คุณสนใจ</Text>
            <View style={styles.searchContainer}>
                <Feather name="search" size={26} color="#888" style={styles.icon}/>
                <TextInput
                    style = {styles.font}
                    placeholder="Search"
                />
            </View>
            <Text>หมวดหมู่ทั้งหมด</Text>
            <FlatList
                data={categories}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.categoryItem}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <FunctionBar/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#77D499',
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
        fontWeight: 'bold',
        color: 'white',
    },
    categoryItem: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'white',
        borderColor:'#77D499',
        padding: 10,
        marginHorizontal: 5,
        borderWidth:3,
        borderRadius: 5,
        marginTop:5,
        width:160,
        height:60
    },
})
export default HomeScreen;