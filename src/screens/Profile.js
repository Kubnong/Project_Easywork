import React from "react";
import {View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity} from "react-native";
import FunctionBar from "../components/functionbar";

const Profile = () => {
    return(
        <View style={styles.container}>
            <View>
                
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
})
export default Profile;