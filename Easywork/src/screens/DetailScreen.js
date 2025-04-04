import React , {useState} from "react";
import {View , Text , Image , StyleSheet, ScrollView} from "react-native";
import CustomButton from "../components/CustomButton";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomModal from "../components/CustomModal";
import { addEmployment } from "../services/api";

const DetailScreen = ({route,navigation}) => {
    const {id_work, id_freelance, image, title, price, description, about_freelance, username, user_picture} = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    
    const handleClose = () => {
        setModalVisible(false);
    };
    const handleEmployment = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem("userId");
            console.log(id_freelance,storedUserId,id_work)
            await addEmployment(storedUserId,id_freelance,id_work)
        } catch (error) {
            Alert.alert("Error", "Something went wrong!");
            console.error("Error in employment process:", error);
        }
    };

    const handlePress = () => {
        setModalVisible(true); // เปิด Modal
        handleEmployment(); // เรียกฟังก์ชัน handleEmployment
    };

    return(
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View>
                    <Image
                        style={styles.image}
                        source={{uri:image}}
                    />
                    <View style={{padding:13}}>
                        <View>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={{padding:5,marginLeft:10}}>
                            <Text>
                                {description}
                            </Text>
                        </View>
                        <Text style={styles.title}>
                            ราคา
                            <Text style={{color:'#77D499'}}> ฿{price}</Text>
                        </Text>
                    </View>
                </View>
                <View>
                    <View style={styles.freelanceProfile}> 
                        <Image
                            style={styles.user_picture}
                            source={{uri:user_picture}}
                        />
                        <View>
                            <Text style={styles.title}>{username}</Text>
                            <Text style={{fontSize:12,marginLeft:5}}>
                                {about_freelance}
                            </Text>
                        </View>
                    </View>
                    <CustomButton
                        title={'จ้างงาน'}
                        backgroundColor={"#77D499"}
                        color={"white"}
                        width={370}
                        height={60}
                        onPress={handlePress}
                    />
                    <CustomModal
                        visible={modalVisible}
                        onClose={handleClose}
                        title="จ้างงานสำเร็จ"
                        width={150}
                        height={150}
                        marginBottom={-20}
                        widthcontainer={300}
                    />
                </View>
            </View>
        </ScrollView> 
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 70, // เพิ่มพื้นที่ด้านล่าง
    },
    image:{
        width:'auto',
        height:200,
    },
    user_picture:{
        width:80,
        height:80,
        borderRadius:75
    },
    textContainer:{
        padding:10,
    },
    titleContainer:{
        padding:15,
    },  
    title:{
        fontSize:20,
        fontWeight:'bold',
        fontFamily:'Inter-Black'
    },
    freelanceProfile:{
        flexDirection:'row',
    }
})

export default DetailScreen;