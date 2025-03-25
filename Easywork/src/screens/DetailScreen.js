import React from "react";
import {View , Text , Image , StyleSheet} from "react-native";
import CustomButton from "../components/CustomButton";
import Ionicons from '@expo/vector-icons/Ionicons';

const DetailScreen = () => {
    return(
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.image}
                    source={{uri:'https://thaiconfig.com/wp-content/uploads/2023/02/PHP-%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3.png'}}
                />
                <View style={{padding:13}}>
                    <View>
                        <Text style={styles.title}>รับออกแบบ/แก้ไขปัญหาเว็บไซต์ ขนาดเล็ก-ใหญ่(PHP,Node.Js,MySQL)</Text>
                    </View>
                    <View style={{padding:5,marginLeft:10}}>
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
                    <Text style={styles.title}>
                        ราคา  
                        <Text style={{color:'#77D499'}}> ฿5,000</Text>
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
                />
            </View>
        </View> 
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'space-between',
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