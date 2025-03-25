import React from "react";
import { View , Text , StyleSheet ,TextInput } from "react-native";


const InputBox = ({placeholder , value , onChangeText , secure , borderColor , width , height , multiline , marginBottom}) => {
    return (
        <View style={[styles.Container , {borderColor: borderColor || "#77D499" , width:width || 331 , height:height || 58 , marginBottom:marginBottom || 10}]}>
            <TextInput 
            style={styles.Input}
            placeholder={placeholder}
            placeholderTextColor="#BAADAD"
            multiline={multiline} //สามารถกรอกได้หลายบรรทัด
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secure}
            />
        </View>
    );
}
 
const styles = StyleSheet.create({
    Container : {
        marginBottom : 10,
        flexDirection :"row",
        alignItems:"center",
        backgroundColor:"white",
        paddingHorizontal: 12,
        shadowColor: "#000",
        shadowOffset: {width: 0 , height : 2},
        shadowOpacity: 0.2 ,
        shadowRadius: 4,
        elevation: 3,
        borderRadius: 10,
        borderWidth: 1,
        margin: 10,
    } ,
    Input : {
        padding: 10 ,
        width : 270,
        height: 100,
    }
})

export default InputBox;