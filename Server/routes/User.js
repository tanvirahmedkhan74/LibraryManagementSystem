const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { pid } = require("process");
const fs = require("fs");

// Must for parsing body
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

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

// Check borrow eligibility by book id and user id. User can borrow max 2 books at a time and book should be available
router.post("/checkBorrowEligibility", (req, res) => {
  const bookID = req.body.bookID;
  console.log(req.body);
  const userID = req.body.userID;

  db.query(
    "SELECT AvailableCopies FROM book WHERE BookID = ?",
    [bookID],
    (err, bookResult) => {
      if (err) {
        console.log(err);
        res.send({ message: "Error" });
      } else {
        if (bookResult.length === 0) {
          res.send({ message: "Book not found" });
        } else {
          const availableCopies = bookResult[0].AvailableCopies;
          if (availableCopies > 0) {
            db.query(
              "SELECT COUNT(*) AS count FROM borrowing WHERE UserID = ?",
              [userID],
              (err, borrowingResult) => {
                if (err) {
                  console.log(err);
                  res.send({ message: "Error" });
                } else {
                  const count = borrowingResult[0].count;
                  console.log(count);
                  if (count < 2) {
                    res.send({ message: "Eligible" });
                  } else {
                    res.send({ message: "Not Eligible" });
                  }
                }
              }
            );
          } else {
            res.send({ message: "Not Eligible" });
          }
        }
      }
    }
  );
});


// Borrow book using user id and book id, one book at a time and validate using due date
// BorrowingID, UserID, BookID, BorrwingDate, ReturnDate, DueDate

router.post("/borrowBook", (req, res) => {
  // book id and user id
  //console.log(req.body);
  const bookID = req.body.bookID;
  const userID = req.body.userID;

  // get current date
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // get due date
  const dueDate = new Date(year, month, day + 7);

  // get return date
  const returnDate = new Date(year, month, day + 14);

  // get borrowing date
  const borrowingDate = new Date(year, month, day);

  // insert into borrowing table
  db.query(
    "INSERT INTO borrowing (UserID, BookID, BorrowingDate, ReturnDate, DueDate) VALUES (?,?,?,?,?)",
    [userID, bookID, borrowingDate, returnDate, dueDate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "Borrowed" });
      }
    }
  );

  // update available copies
  db.query(
    "UPDATE book SET AvailableCopies = AvailableCopies - 1 WHERE BookID = ?",
    [bookID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Available copies updated");
      }
    }
  );
});

// Get all borrowed books by user id
router.get("/getBorrowedBooks/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT * FROM borrowing WHERE UserID = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log("Borrowed books fetched");
      }
    }
  );
});


  



module.exports = router;
