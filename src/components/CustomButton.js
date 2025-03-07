import React from "react";
import { Text, StyleSheet, TouchableOpacity , View} from "react-native";

const CustomButton = ({ title, onPress, backgroundColor ,  color , borderColor , width , height , borderRadius , icon , iconPosition}) => {

  return (
    
    <TouchableOpacity
      style={[styles.Button, { backgroundColor:backgroundColor || "gold" , borderColor: borderColor || "white" , width:width || 331 , height:height || 45 , borderRadius: borderRadius || 20}]}
      onPress={onPress}
    >
      {icon && iconPosition === 'top' && (
        <View style={styles.iconWrapper}>
          {icon}
        </View>
      )}
      {icon && iconPosition === "left" && (
        <View style={styles.iconWrapper}>{icon}</View>
      )}
      <Text style={[styles.text, { color }]}>{title}</Text>
      {icon && iconPosition === 'bottom' && (
        <View style={styles.iconWrapper}>
          {icon}
        </View>
      )}
        {icon && iconPosition === "right" && (
        <View style={styles.iconWrapper}>{icon}</View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    padding: 10,
    alignContent: "center",
    justifyContent:"center",
    margin: 5,
    borderWidth:1,
    marginHorizontal: 10,
    alignItems: "center",
    flexDirection: 'row',  // ให้ปุ่มใช้ flexDirection: row
  },
  text: {
    fontWeight:"bold",
    fontSize: 15,
    textAlign: "center"
  },
  iconWrapper: {
    marginLeft: 20, // เว้นระยะห่างไอคอนจากข้อความ
  },
});

export default CustomButton;
