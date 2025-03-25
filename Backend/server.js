const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const db = new sqlite3.Database("./userDB.db", (err) => {
    if (err) console.error(err.message);
    console.log("Connected to SQLite DB");
});

db.run(`CREATE TABLE IF NOT EXISTS Users(
    id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    picture TEXT
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

app.listen(5000, () => console.log("Server running on port 5000"));
