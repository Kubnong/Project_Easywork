import React from "react";
import { View, Modal, Text, StyleSheet , TouchableOpacity , Image} from "react-native";

const CustomModal = ({visible , onClose, title , message, width, height, marginBottom, widthcontainer}) => {
    return( 
            <Modal transparent={true} animationType="fade" visible={visible}>  
                <View style={styles.ModalOverlay}>
                    <View style={[styles.ModalContainer,{width:widthcontainer||350}]}>
                        <Image
                                  source={require("../../assets/circle-arrow.png")}
                                  style={{
                                    width: width || 200,
                                    height: height || 200,
                                    alignSelf: "center",
                                    borderRadius: 20,
                                    marginTop: 5,
                                    marginBottom: 5,
                                  }}
                                />
                        <Text style={styles.title}>{title}</Text>
                        <Text style={[styles.msg,{marginBottom:marginBottom||20}]}>{message}</Text>
                        <TouchableOpacity 
                            style={styles.OkButton}
                            onPress={onClose}
                        >
                            <Text style={styles.OkButtonText}>ตกลง</Text> 
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    );
};

const styles = StyleSheet.create({
    
    
    ModalOverlay:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0, 0, 0, 0.5)'
    },

    ModalContainer:{
        backgroundColor: 'white',
        borderRadius: 10,
        padding:20,
        alignItems: 'center',
        elevation: 20   //เงาด้านหลัง
    },

    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color : "#4D4C4C"
    },

    msg:{
        fontSize: 18,
        textAlign: 'center',
        color: "#BAADAD"
    },

    OkButton:{
        backgroundColor: '#77D499',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },

    OkButtonText:{
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
   
});

export default CustomModal;