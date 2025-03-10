import React from "react";
import {View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity, Image} from "react-native";
import FunctionBar from "../components/FunctionBar.js";
import InputBox from "../components/InputBox";
import CustomButton from "../components/CustomButton";
import Feather from '@expo/vector-icons/Feather';

const AddDetail = () => {
    return(
        <View style={styles.container}>
            
            <Text style={styles.textTitle}>หมวดหมู่ของงาน</Text>
            <InputBox
                placeholder={'หมวดหมู่ของงาน'}
                width={370}
                height={50}
            />
            <Text style={styles.textTitle}>ประเภทของงาน</Text>
            <InputBox
                placeholder={'ประเภทของงาน'}
                width={370}
                height={50}
            />
            <Text style={styles.textTitle}>ชื่องาน</Text>
            <InputBox
                placeholder={'ชื่องาน'}
                width={370}
                height={50}
            />
            <Text style={styles.textTitle}>คำอธิบายงาน</Text>
            <InputBox
                placeholder={'คำอธิบายงาน'}
                width={370}
                height={50}
            />
            <View style={{flexDirection:'row'}}>
                <View>
                    <Text style={styles.textTitle}>ราคางานของคุณ</Text>
                    <InputBox
                        placeholder={'ราคา'}
                        width={180}
                        height={50}
                    />
                </View>
                <View>
                    <Text style={styles.textTitle}>ใช้เวลาทำ</Text>
                    <InputBox
                        placeholder={'เวลาที่ทำงาน'}
                        width={171}
                        height={50}
                    />
                </View>
            </View>
            <View style={{alignItems:'center',borderWidth:1}}>
                <Text>อัปโหลดรูปผลงาน</Text>
                <Image
                    style={styles.image}
                    source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/20241018_Jo_Yuri_04.jpg/375px-20241018_Jo_Yuri_04.jpg'}}
                />
                <CustomButton
                    icon={<Feather name="upload-cloud" size={24} color="black"/>}
                    iconPosition={'top'}
                    title={'อัปโหลดรูปภาพ'}
                    backgroundColor={'white'}
                    borderColor={'grey'}
                    color={'#299335'}
                    width={370}
                    height={50}
                />
            </View>
            <CustomButton
                title={'บันทึก'}
                backgroundColor={'#77D499'}
                color={'white'}
                width={370}
                height={50}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 10,
        backgroundColor:'white',
        justifyContent:'center'
    },
    textTitle:{
        fontSize:16,
        fontWeight:'bold'
    },
    image:{
        width:180,
        height:180,
    }
})
export default AddDetail;