import React from "react";
import {View ,Text ,StyleSheet, Button} from 'react-native';

const StartScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Start Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "row", // จัดคอมโพเนนต์ในแนวนอน
        alignItems: 'center', // จัดตำแหน่งในแนวตั้ง
        justifyContent: 'center' // จัดตำแหน่งในแนวนอน
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default StartScreen;