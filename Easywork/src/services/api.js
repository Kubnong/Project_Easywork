import axios from "axios";

const API_URL = "http://172.20.10.7:5000";

export const registerUser = async (
  username,
  email,
  password,
  profilePicURL
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      picture:profilePicURL
    });

    console.log("Response from server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data?.message); // ดูข้อความ error
    throw new Error(
      error.response?.data?.message || "Error can not registered user"
    );
  }
};

export const loginUser = async (identifier, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      // post ไปที่หน้า logim
      identifier, //จะส่งเป็น username หรือ email ก็ได้
      password,
    });

    if (response.data.token && response.data.userId) {
      return {
        token: response.data.token, // Json web token เอาไว้ยืนยันตัวตนว่าเป็นคนนั้นจิงไหม
        userId: response.data.userId, // ส่ง userId กลับไป
      };
    }
    
    throw new Error("Login failed: Invalid response from server"); 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Invalid Login ❌");
  }
};


// ฟังก์ชันเพื่ออัปโหลดรูปภาพพร้อมกับส่ง JWT token
export const uploadImages = async (selfieUri, idCardUri, token) => {
  try {
    const formData = new FormData();

    // 📸 เพิ่มไฟล์รูปภาพลง FormData
    formData.append("selfie", {
      uri: selfieUri,
      name: "selfie.jpg",
      type: "image/jpeg",
    });

    formData.append("idCard", {
      uri: idCardUri,
      name: "idCard.jpg",
      type: "image/jpeg",
    });

    // 🔥 ส่งรูปภาพไปที่ API พร้อม JWT token
    const response = await axios.post("http://172.20.10.7:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,  // ส่ง JWT token ไปใน Header
      },
    });

    if (response.data.success) {
      const { selfieUrl, idCardUrl, id_verify } = response.data;
      console.log("Upload successful!", { selfieUrl, idCardUrl, id_verify });
      return { selfieUrl, idCardUrl, id_verify };
    } else {
      console.error("Upload failed:", response.data.error);
      return null;
    }
  } catch (error) {
    console.error("Error uploading images:", error);
    return null;
  }
};