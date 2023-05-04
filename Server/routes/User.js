const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { pid } = require("process");
const fs = require("fs");

const bcrypt = require("bcrypt");
const saltRounds = 10;

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./Assets/Images");
  },
  filename: (req, file, callback) => {
    callback(null, `img-${Date.now()}.${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Database config

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "2600",
  database: "elms",
});

// CORS config

router.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes

// Get all users
router.get("/getUsers", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("Users fetched");
    }
  });
});

// Get user by id
router.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("User fetched");
    }
  });
});

// Update user FirstName, LastName, email, phone number, address and hash new password if password is changed
router.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;

  db.query(
    "UPDATE user SET FirstName = ?, LastName = ?, Email = ?, PhoneNumber = ?, Address = ? WHERE UserID= ?",
    [fname, lname, email, phone, address, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log("User updated");
      }
    }
  );
});

module.exports = router;
