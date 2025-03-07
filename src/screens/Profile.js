import React, { Component } from "react";
import {View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity} from "react-native";
import FunctionBar from "../components/FunctionBar.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Profile = () => {
    return(
        <View style={styles.container}>
            <View style={styles.headcontaienr}>
                <Ionicons name="person" size={50} color="black" />
                <Text style={styles.title}>ชื่อ Username</Text>
            </View>
            <View style={styles.optioncontainer}>
                <TouchableOpacity style={styles.option}>
                    <FontAwesome5 name="credit-card" size={35} color="grey"/>
                    <Text style={styles.font}>สมัครเป็นฟรีแลนซ์</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Ionicons name="person" size={35} color="grey" />
                    <View>
                        <Text style={[styles.font,{marginLeft:15}]}>ข้อมูลบัญชี</Text>
                        <Text style={{marginLeft:15}}>รายละเอียดบัญชี, ข้อมูลติดต่อ, รหัสผ่าน</Text>
                    </View>
                </TouchableOpacity>
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
    headcontaienr: {
        height:80,
        flexDirection: 'row',
        backgroundColor: '#77D499',
        padding:10,
        alignItems:'center'
    },
    optioncontainer:{
    },
    option:{
        flexDirection:'row',
        borderColor:'grey',
        borderWidth:1,
        padding: 10,
        
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    font: {
        marginLeft:10,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    
})
export default Profile;