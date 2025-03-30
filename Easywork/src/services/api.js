import axios from "axios";

const API_URL = "http://192.168.0.67:5000";


export const categories = async () => {
  try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();
      return data; // ส่งข้อมูล categories กลับ
  } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
  }
};

export const getTypeWork = async () => {
  try {
      const response = await fetch(`${API_URL}/typework`);
      const data = await response.json();
      return data; // ส่งข้อมูล typework กลับ
  } catch (error) {
      console.error("Error fetching typework:", error);
      throw error;
  }
};

export const selectType = async (selectedcategory) => {
  try{
    const response = await axios.post(`${API_URL}/select`,{
      selectedcategory,
    });
    return response.data;
  }
  catch (error){
    throw new Error(error.response?.data?.message || "Error select")
  }  
};

export const addWork = async (name, description, price, finishtime, image, selectedtypework, idFreelance) => {
  try {
    console.log("Data sent to API:", { name, description, price, finishtime, image, selectedtypework, idFreelance });
    const response = await axios.post(`${API_URL}/addwork`, {
      name,
      description,
      price,
      finishtime,
      image,
      selectedtypework,
      idFreelance, // ส่ง userId ไปด้วย
    });
    return response.data;
  } catch (error) {
    console.error("Error in addWork API:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error adding work");
  }
};

export const getWorks = async () => {
  try {
    const response = await fetch(`${API_URL}/getworks`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching works:", error);
    throw error;
  }
}

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
export const addVerify = async (Name , Surname , Idcard , Birthdate , Address ,Selfieimage , image , userId ) => {
  try {
    console.log("Data sent to API:", { Name , Surname , Idcard , Birthdate , Address ,Selfieimage , image , userId });
    const response = await axios.post(`${API_URL}/addVerify`, {
      Name,
      Surname,
      Idcard,
      Birthdate,
      Address,
      Selfieimage,
      image,
      userId, // ส่ง userId ไปด้วย
    });
    return response.data;
  } catch (error) {
    console.error("Error in addVerify API:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error adding verify");
  }
};

// สมัครฟรีแลนซ์
export const getVerify = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/getVerify?userId=${userId}`);
    const data = await response.json();
    return data; // ส่งข้อมูลกลับ (เช่น { id_verify: 1 })
  } catch (error) {
    console.error("Error fetching verify data:", error);
    throw error;
  }
};


// สมัครฟรีแลนซ์
export const saveFreelance = async (idVerify, aboutFreelance) => {
  try {
      const response = await fetch(`${API_URL}/savefreelance`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              id_verify: idVerify, // ส่ง id_verify ที่ได้จาก getVerify
              about_freelance: aboutFreelance, // ข้อมูลเกี่ยวกับฟรีแลนซ์ที่กรอก
          }),
      });

      const result = await response.json();
      return result; // ส่งผลลัพธ์กลับมา (เช่น { id_freelance: 1 })
  } catch (error) {
      console.error("Error saving freelance data:", error);
      throw error;
  }
};

// รับ freelance 
export const getFreelance = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/getFreelance=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const addEmployment = async (storedUserId,id_freelance,id_work) => {
  try {
    console.log("Data sent to API:", {storedUserId,id_freelance,id_work});
    const response = await axios.post(`${API_URL}/addEmployment`, {
      storedUserId,
      id_freelance,
      id_work,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Add Employment:", error);
    return [];
  }
};

export const getEmployment = async (storedUserId) => {
  try {
    const response = await axios.post(`${API_URL}/getEmployment`, {storedUserId});
    return response.data;
  } catch (error) {
    console.error("Error fetching Add Employment:", error);
    return [];
  }
};