import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomButton = ({ title, onPress, backgroundColor ,  color , borderColor , width , height , borderRadius }) => {

  return (
    
    <TouchableOpacity
      style={[styles.Button, { backgroundColor , borderColor: borderColor || "white" , width:width || 331 , height , borderRadius: borderRadius || 20}]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: "gold",
    padding: 10,
    alignContent: "center",
    justifyContent:"center",
    height: 45,
    margin: 5,
    borderWidth:1,
    marginHorizontal: 10,
  },
  text: {
    fontWeight:"bold",
    fontSize: 15,
    textAlign: "center"
  },
});

export default CustomButton;
