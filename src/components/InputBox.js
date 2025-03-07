import React from "react";
import { View , Text , StyleSheet ,TextInput } from "react-native";


const InputBox = ({placeholder , value , onChangeText , secure}) => {
    return (
        <View style={styles.Container}>
            <TextInput 
            style={styles.Input}
            placeholder={placeholder}
            placeholderTextColor="#BAADAD"
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
        height : 58,
        width: 331,
        shadowColor: "#000",
        shadowOffset: {width: 0 , height : 2},
        shadowOpacity: 0.2 ,
        shadowRadius: 4,
        elevation: 3,
        borderRadius: 10,
        borderColor: "#77D499",
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