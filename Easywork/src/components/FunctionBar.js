import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import { useNavigation , useRoute} from "@react-navigation/native"
import Feather from "@expo/vector-icons/Feather";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

// อยู่หน้าไหนให้สีของหน้านั้นเปลี่ยนสี
const FunctionBar = () => {
    const navigation = useNavigation();
    
    return(
        <View style={styles.functionContainer}>
            <TouchableOpacity 
                style={{alignItems:'center',justifyContent:'center'}}
                onPress={() => navigation.navigate("HomeScreen")}
            >
                <Feather name="home" size={30} color="white" />
                <Text style={styles.fontfunction}>หน้าแรก</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{alignItems:'center',justifyContent:'center'}}
                onPress={() => navigation.navigate("EmploymentScreen")}
            >
                <Entypo name="briefcase" size={30} color="white" />
                <Text style={styles.fontfunction}>การจ้างงาน</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{alignItems:'center',justifyContent:'center'}}
                onPress={() => navigation.navigate("Profile")}
            >
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
        backgroundColor: '#3a8464',
        justifyContent: 'space-around',
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        borderTopStartRadius : 30,
        borderTopEndRadius : 30,
        paddingTop: 5
    },
    fontfunction:{
        marginTop: 3,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    }
})
export default FunctionBar;