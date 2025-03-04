import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

// อยู่หน้าไหนให้สีของหน้านั้นเปลี่ยนสี
const FunctionBar = () => {
    return(
        <View style={styles.functionContainer}>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}}>
                <Feather name="home" size={30} color="white" />
                <Text style={styles.fontfunction}>หน้าแรก</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}}>
                <Entypo name="briefcase" size={30} color="white" />
                <Text style={styles.fontfunction}>การจ้างงาน</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}}>
                <Ionicons name="person" size={30} color="white" />
                <Text style={styles.fontfunction}>โปรไฟล์</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    functionContainer: {
        height:65,
        flexDirection: 'row',
        backgroundColor: '#77D499',
        justifyContent: 'space-around',
    },
    fontfunction:{
        marginTop: 3,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4D4C4C',
    }
})
export default FunctionBar;