import React from "react";
import {View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity, Image} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FunctionBar from "../components/FunctionBar.js";

const categories = [
    { id: '1', name: 'แนะนำ'},
    { id: '2', name: 'ออกแบบกราฟิก'},
    { id: '3', name: 'เว็บไซต์และเทคโนโลยี'},
    { id: '4', name: 'สถาปัตย์และวิศวกรรม'},
    { id: '5', name: 'เขียนและแปลภาษา'},
];
const worktype = [
    { id: '1', name: 'ทำ SEO', category:'เว็บไซต์และเทคโนโลยี' , pic:'https://img.freepik.com/free-photo/searching-engine-optimizing-seo-browsing-concept_53876-64993.jpg?ga=GA1.1.1495959679.1741193136&semt=ais_hybridO'},
    { id: '2', name: 'Logo', category:'ออกแบบกราฟิก', pic:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFVPcHGroySXhQpz_2eB-C9pmYwLtDQ4e6lQ&s'}, 
    { id: '3', name: 'Web Development', category:'เว็บไซต์และเทคโนโลยี', pic:'https://miro.medium.com/v2/resize:fit:1400/1*hn1UA__pO2b0k520Ac1ApQ.jpeg'},
    { id: '4', name: 'เขียนและออกแบบโครงสร้าง', category:'สถาปัตย์และวิศวกรรม', pic:'https://as2.ftcdn.net/jpg/00/81/89/57/1000_F_81895775_3lTXjWKjZtw4kx0kGpOrF33UmpQ6q50j.jpg'},
    { id: '5', name: 'แปลภาษา', category:'เขียนและแปลภาษา', pic:'https://play-lh.googleusercontent.com/C1y3UJXvJ36YgI1DiFbOm92YPJRQBgFjAeaBb5HNR5OCk_6rOHKnCOiUBCdDmCT1WpH-'},
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
            <View>
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
            </View>
            <View style={{padding:10}}>
                <FlatList
                    data={worktype}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.worktypecontainer}>
                            <Image
                                style={styles.tinyLogo}
                                source={{ uri : item.pic}}
                            />
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
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
    tinyLogo: {
        width: '100%',
        height: '80%',
        borderRadius:8
    },
    worktypecontainer:{
        width: 190,
        height: 150,
        backgroundColor: 'white',
        borderColor: '#3674B5', 
        borderWidth: 2, // เพิ่มระยะห่างด้านในของการ์ด
        borderRadius: 10, // มุมของการ์ดโค้งมน 10 หน่วย
        marginBottom:10
    }
})
export default HomeScreen;