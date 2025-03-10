import React from "react";
import {View , Text , Image , StyleSheet} from "react-native";
import CustomButton from "../components/CustomButton";
import Ionicons from '@expo/vector-icons/Ionicons';

const DetailScreen = () => {
    return(
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{uri:'https://thaiconfig.com/wp-content/uploads/2023/02/PHP-%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3.png'}}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>รับออกแบบ/แก้ไขปัญหาเว็บไซต์ ขนาดเล็ก-ใหญ่(PHP,Node.Js,MySQL)</Text>
                <Text>
                     รายละเอียด : {"\n"}
                    -เว็บไซต์ 1 หน้า {"\n"}
                    -รองรับแสดงผลทุกหน้าจอ {"\n"}
                    -เว็บไซต์สนับสนุนการทำ SEO ช่วยให้ค้นหาเจอได้จาก Google สะดวก {"\n"}
                    -สนับสนุนการเชื้่อมต่อ Google Analytic และ Google Ads {"\n"}
                    -ดูแล และให้คำปรึกษาฟรี 3 เดือนหลังส่งมอบงาน {"\n"}{"\n"}

                    หมายเหตุ : {"\n"}
                    -ระยะเวลาในการทำงาน 5 วัน {"\n"}
                    -ราคาอาจมีการเปลียนแปลงขึ้นอยู่กับความยากงาน {"\n"}
                    -ราคาไม่รวมโดเมนและโฮสต์ (ประมาณ 3,000 บาท 1 ปี){"\n"}
                </Text>
            </View>
            <View style={{padding:10}}>
                <Text>ราคา ฿5,000</Text>
            </View>
            <View style={styles.freelanceProfile}> 
                <Ionicons name="person-circle" size={80} color="grey" />
                <View>
                    <Text>Stamplnwza</Text>
                    <Text>
                        พัฒนาและออกแบบ wesite php,node.js,Mysql และ {"\n"}
                        framework อื่น ๆออกแบบเชื่อมต่อ API {"\n"}
                        ทั้งในไทยและต่างประเทศ 
                    </Text>
                </View>
            </View>
            <CustomButton
                title={'จ้างงาน'}
                backgroundColor={"#77D499"}
                color={"white"}
                width={370}
                height={50}
            />
        </View> 
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'white',
        justifyContent:'space-between'
    },
    image:{
        width:'auto',
        height:200
    },
    textContainer:{
        padding:10,
    },  
    title:{
        fontSize:20,
        fontWeight:'bold',
    },
    freelanceProfile:{
        flexDirection:'row',
    }
})

export default DetailScreen;