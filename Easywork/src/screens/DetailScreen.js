import React , {useState} from "react";
import {View , Text , Image , StyleSheet, ScrollView} from "react-native";
import CustomButton from "../components/CustomButton";
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomModal from "../components/CustomModal";

const DetailScreen = ({route,navigation}) => {
    const {image, title, price, description} = route.params;
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
                        <Ionicons name="person-circle" size={90} color="grey" />
                        <View>
                            <Text style={styles.title}>Stamplnwza</Text>
                            <Text style={{fontSize:12,marginLeft:5}}>
                                พัฒนาและออกแบบ wesite php,node.js,Mysql และ {"\n"}
                                framework อื่น ๆออกแบบเชื่อมต่อ API {"\n"}
                                ทั้งในไทยและต่างประเทศ {"\n"}
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
        backgroundColor:'white',
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