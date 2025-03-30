import React, { useState , useEffect} from "react";
import {View, StyleSheet, Text, Image, Alert, FlatList} from "react-native";
import WorkCard from "../components/WorkCard";
import { getWorks } from "../services/api";

const WorkScreen = (navigation) => {
    const [works, setWorks] = useState([]); // เก็บข้อมูลงาน
    const [loading, setLoading] = useState(true); // สถานะการโหลดข้อมูล

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const data = await getWorks(); // เรียก API เพื่อดึงข้อมูล
                setWorks(data); // เก็บข้อมูลใน state
            } catch (error) {
                Alert.alert("Error", "ไม่สามารถดึงข้อมูลได้");
            } finally {
                setLoading(false); // ปิดสถานะการโหลด
            }
        };

        fetchWorks();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>กำลังโหลดข้อมูล...</Text>
            ) : (
                <FlatList
                    data={works} // ใช้ข้อมูลจาก state
                    keyExtractor={(item) => item.id_work.toString()} // ใช้ id_work เป็น key
                    renderItem={({ item }) => (
                        <WorkCard
                            id_work={item.id_work}
                            id_freelance={item.id_freelance}
                            image={item.Portfolio} // ส่งรูปภาพ
                            title={item.name_work} // ส่งชื่องาน
                            price={item.price} // ส่งราคา
                            description={item.description}
                            about_freelance={item.about_freelance}
                            username={item.username}
                            user_picture={item.picture}
                            onPress={true}
                        />
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "white",
    },
})
export default WorkScreen;