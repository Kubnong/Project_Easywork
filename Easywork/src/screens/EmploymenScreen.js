import React, {useEffect,useState} from "react";
import {View , Text , Image , StyleSheet, ScrollView, FlatList} from "react-native";
import FunctionBar from "../components/FunctionBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WorkCard from "../components/WorkCard";
import { getEmployment } from "../services/api";

const EmploymentScreen = () => {
    const [employment, setEmployment] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem("userId");
                const data = await getEmployment(storedUserId); // เรียก API เพื่อดึงข้อมูล
                setEmployment(data); // เก็บข้อมูลใน state
            } catch (error) {
                Alert.alert("Error", "ไม่สามารถดึงข้อมูลได้");
            } finally {
                setLoading(false); // ปิดสถานะการโหลด
            }
        };
    
        fetchWorks();
    }, []);

    return(
        <View style={styles.container}>
            {loading ? (
                <Text>กำลังโหลดข้อมูล...</Text>
            ) : (
                <FlatList
                    data={employment} // ใช้ข้อมูลจาก state
                    keyExtractor={(item, index) => `${item.id_work}-${index}`} // ใช้ id_work เป็น key
                    renderItem={({ item }) => (
                        <WorkCard
                            image={item.Portfolio} // ส่งรูปภาพ
                            title={item.name_work} // ส่งชื่องาน
                            description={item.description}
                            price={item.price} // ส่งราคา
                            onPress={false}
                        />

                    )}
                />
            )}
            <FunctionBar/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'space-between',
    },
})

export default EmploymentScreen;