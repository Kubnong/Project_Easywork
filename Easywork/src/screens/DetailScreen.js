import React , {useState} from "react";
import {View , Text , Image , StyleSheet, ScrollView} from "react-native";
import CustomButton from "../components/CustomButton";
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomModal from "../components/CustomModal";

const DetailScreen = ({route,navigation}) => {
    const {image, title, price, description, about_freelance, username, user_picture} = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    
    const handleClose = () => {
        setModalVisible(false);
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
                        onPress={() => setModalVisible(true)}
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