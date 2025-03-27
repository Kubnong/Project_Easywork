const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");

const app = express();

const cors = require("cors");


app.use(express.json());
app.use(cors());  //ใช้ cors 



const db = new sqlite3.Database("./userDB.db", (err) => {
  if (err) console.error(err.message);
  console.log("Connected to SQLite DB");
});


const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}



db.run(`CREATE TABLE IF NOT EXISTS Users(
    id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    picture TEXT DEFAULT 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'
  )`);

db.run(`CREATE TABLE IF NOT EXISTS Verify(
    id_verify INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    lastname TEXT ,
    id_card TEXT UNIQUE,
    birthday DATE,
    address TEXT,
    phone TEXT UNIQUE,
    selfie_with_id_card TEXT,
    id_card_image TEXT,
    id_user INTEGER,
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE CASCADE
)`);

db.run(`CREATE TABLE IF NOT EXISTS Freelance(
  id_freelance INTEGER PRIMARY KEY AUTOINCREMENT,
  id_verify INTEGER,
  register_date DATE,
  FOREIGN KEY (id_verify) REFERENCES Verify(id_verify) ON DELETE CASCADE
)`);

db.run(`ALTER TABLE Freelance ADD COLUMN freelance_detail TEXT`)


db.run(`CREATE TABLE IF NOT EXISTS Category(
    id_category INTEGER PRIMARY KEY AUTOINCREMENT,
    name_category TEXT UNIQUE
)`);

db.run(`CREATE TABLE IF NOT EXISTS TypeWork(
    id_typework INTEGER PRIMARY KEY AUTOINCREMENT,
    id_category INTEGER,
    name_typework TEXT UNIQUE,
    FOREIGN KEY (id_category) REFERENCES Category(id_category) ON DELETE CASCADE
)`);

db.run(`CREATE TABLE IF NOT EXISTS Work(
    id_work INTEGER PRIMARY KEY AUTOINCREMENT,
    name_work TEXT,
    description TEXT,
    price INTEGER,
    finish_time INTEGER,
    Portfolio TEXT,
    id_typework INTEGER,
    id_freelance INTEGER,
    FOREIGN KEY (id_typework) REFERENCES TypeWork(id_typework) ON DELETE CASCADE,
    FOREIGN KEY (id_freelance) REFERENCES Freelance(id_freelance) ON DELETE CASCADE
)`);

db.run(`CREATE TABLE IF NOT EXISTS Employment(
    id_employment INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INTEGER,
    id_freelance INTEGER,
    id_work INTEGER,
    employment_date DATE,
    employment_time TIMESTAMP,
    employment_status TEXT,
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_freelance) REFERENCES Freelance(id_freelance) ON DELETE CASCADE,
    FOREIGN KEY (id_work) REFERENCES Work(id_work) ON DELETE CASCADE
)`);

db.run(`CREATE TABLE IF NOT EXISTS Payment(
    id_payment INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INTEGER,
    amout INTEGER,
    payment_date DATE,
    payment_time TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE CASCADE
)`);

////////////////////
//สมัครสมาชิก
////////////////////

app.post("/register", async (req, res) => {
  const { username, email, password, picture } = req.body;

  // ตรวจสอบว่าข้อมูลครบหรือไม่
  if (!email || !username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.get(
    `SELECT * FROM Users WHERE username = ? OR email = ?`,
    [username, email],
    async (err, user) => {
      if (err) {
        console.error("❌ Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      console.log("🔍 Checking existing user:", user); // ✅ Debug log

      if (user) {
        return res.status(409).json({ error: "User already exists" }); // 409 Conflict
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      console.log("✅ Encrypting Password for:", username, email);

      // ถ้าไม่มี picture ให้ใช้ default
      const profilePic =
        picture ||
        "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg";

      db.run(
        `INSERT INTO Users (username, email, password, picture) VALUES (?, ?, ?, ?)`,
        [username, email, encryptedPassword, profilePic],
        function (err) {
          if (err) {
            console.error("❌ Insert Error:", err);
            return res.status(400).json({ error: "Insert Failed" });
          }
          res.json({ message: "User registered successfully" });
        }
      );
    }
  );
});

////////////////////
// Login
////////////////////

app.post("/login", async (req, res) => {
  const { identifier, password } = req.body;
  console.log("Login is called", identifier, "******");

  //ค้นหาผู้ใช้จาก user และ email
  db.get(
    `SELECT * FROM Users WHERE username = ? OR email = ?
`,
    [identifier, identifier],
    async (err, user) => {
      if (!user || !(await bcrypt.compare(password, user.password))) {
        // bcrypt คือ password ที่ถูก Hash ไปแล้ว
        return res.status(400).send({ message: "Invalid credential" }); // password ไม่ตรงกัน เรียกว่า credential
      }
      const token = jwt.sign({ userId: user.id_user }, "secretkey"); //secretkey ต้องมี
      res.send({ token, userId: user.id_user }); // ส่งทั้ง token และ userId
      console.log("Login Response:", { token, userId: user.id_user }); // แสดงผลที่ต้องการ
    }
  );
});

////////////////////
// Profile 
////////////////////
app.get("/profile/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log("Received userId from server:", userId); // ตรวจสอบว่า userId ที่ได้รับถูกต้องหรือไม่
  db.get(
    `SELECT username, email, picture FROM Users WHERE id_user = ?`,
    [userId],
    (err, user) => {
      if (err) {
        console.error("Error fetching user:", err);
        return res.status(500).send({ message: "Error fetching user" });
      }

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      res.send(user); // ส่งข้อมูลผู้ใช้พร้อม URL รูปภาพ
    }
  );
});

////////////////////
// Upload verify
////////////////////

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ✅ ตรวจสอบ JWT token เพื่อดึง id_user
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(403).send("Access Denied");

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.status(403).send("Access Denied");
    req.user = user; // เก็บ user จาก JWT token
    next();
  });
};

// ✅ API อัปโหลดรูปภาพและบันทึกลงฐานข้อมูล
app.post("/upload", authenticateJWT, upload.fields([{ name: "selfie" }, { name: "idCard" }]), (req, res) => {
  if (!req.files || !req.files.selfie || !req.files.idCard) {
    return res.status(400).json({ error: "ต้องอัปโหลดรูปให้ครบทั้งสองรูป" });
  }

    // ตรวจสอบว่าไฟล์ selfie และ idCard ถูกอัปโหลดครบหรือไม่
    if (req.files.selfie.length === 0 || req.files.idCard.length === 0) {
      return res.status(400).json({ error: "ต้องอัปโหลดรูปทั้งสองรูป: รูปเซลฟี่และบัตรประชาชน" });
    }

  const selfiePath = `http://172.20.10.7:5000/uploads/${req.files.selfie[0].filename}`;
  const idCardPath = `http://172.20.10.7:5000/uploads/${req.files.idCard[0].filename}`;
  const id_user = req.user.userId; // ใช้ `userId` จาก JWT token

  // 🔥 บันทึกลงฐานข้อมูล
  db.run(
    `INSERT INTO Verify (selfie_with_id_card, id_card_image, id_user) VALUES (?, ?, ?)`,
    [selfiePath, idCardPath, id_user],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        success: true,
        selfieUrl: selfiePath,
        idCardUrl: idCardPath,
        id_verify: this.lastID, // คืนค่า id_verify ที่ถูกสร้าง
      });
    }
  );
});

/*
// ลบข้อมูลทั้งหมดจากตาราง Category
db.run(`DELETE FROM Category`, function (err) {
    if (err) {
      console.error("Error deleting data from Category:", err);
      return;
    }
    console.log("All data deleted from Category");
  
    // รีเซ็ตค่า AUTOINCREMENT ให้กลับไปที่ 1
    db.run(`DELETE FROM sqlite_sequence WHERE name = 'Category'`, function (err) {
      if (err) {
        console.error("Error resetting AUTOINCREMENT:", err);
        return;
      }
      console.log("AUTOINCREMENT value reset to 1");
  
      // เพิ่มข้อมูลใหม่หลังจากรีเซ็ต
  
      categories.forEach(category => {
        db.run(`INSERT INTO Category (name_category) VALUES (?)`, [category], function (err) {
          if (err) {
            console.error("Error inserting category:", err);
            return;
          }
          console.log(`Category '${category}' added successfully`);
        });
      });
  
      // ส่งข้อความยืนยันหลังจากเพิ่มข้อมูลทั้งหมด
      console.log("Categories added successfully");
    });
  });
*/
app.get('/categories', (req, res) => {
  db.all(`SELECT name_category FROM Category`, (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json(rows);
  });
});

app.post("/select", (req, res) => {
  const selectedcategory = req.body.selectedcategory;
  console.log("Selected Category:", selectedcategory);

  db.all(
    `SELECT TypeWork.name_typework
    FROM TypeWork
    JOIN Category ON TypeWork.id_category = Category.id_category
    WHERE Category.name_category = ?;`, [selectedcategory],
    (err, rows) => {
      if (err) {
        return res.status(500).send({ message: "Database error", error: err });
      }
      if (!rows || rows.length === 0) {
        return res.status(400).send({ message: "No typework found for the selected category" });
      }

      // แปลงข้อมูลให้อยู่ในรูปแบบที่เหมาะสม
      const formattedData = rows.map((item) => ({
        label: item.name_typework,
        value: item.name_typework,
      }));

      console.log("Formatted Data:", formattedData);
      res.send(formattedData);
    }
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));
