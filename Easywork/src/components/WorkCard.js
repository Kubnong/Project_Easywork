import React from "react";
import {View, StyleSheet, Text, TouchableOpacity,Image} from "react-native";
import { useNavigation } from "@react-navigation/native"

// อยู่หน้าไหนให้สีของหน้านั้นเปลี่ยนสี
const WorkCard = ({id_work, id_freelance, image,title,price,description,about_freelance,username,user_picture,onPress}) => {
    const navigation = useNavigation();
    console.log("id_freelance in WorkCard:", id_freelance);
    return(
        <TouchableOpacity 
            style={styles.card}
            onPress={onPress ? () => navigation.navigate("DetailScreen",{id_work,id_freelance,image,title,price,description,about_freelance,username,user_picture}) : console.log("sd")}
        >
            <Image
                style={styles.image}
                source={{uri:image}}
            />
            <View>
                <Text style={styles.name_work}>{title}</Text>
                <Text>{description}</Text>
                <Text style={styles.price}>
                    ราคา 
                    <Text style={{color:'#77D499'}}> ฿{price}</Text>
                </Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderColor: '#77D499',
        borderWidth: 3,
        padding: 10, // เพิ่มระยะห่างด้านในของการ์ด
        borderRadius: 10, // มุมของการ์ดโค้งมน 10 หน่วย
        flexDirection: 'row',
        margin: 5
    },
    name_work: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price:{
        fontSize: 12,
        fontWeight: 'bold',
    },
    image: {
        width: 90,
        height: 60,
        resizeMode: 'cover', // ทำให้รูปภาพพอดีกับพื้นที่โดยคงอัตราส่วนเดิม
        borderRadius: 10,
        marginRight: 10
    },
})
export default WorkCard;