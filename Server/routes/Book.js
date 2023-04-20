const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "2600",
    database: "elibrary",
});

router.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

router.get("/getBooks", (req, res) => {
    db.query("SELECT * FROM Book", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

// Title, ISBN, Publisher, NumberOfPages, Edition, AvailableCopy, Cover(optional)
router.post("/addBook", (req, res) => {
    const title = req.body.title;
    const isbn = req.body.isbn;
    const publisher = req.body.publisher;
    const numberOfPages = req.body.numberOfPages;
    const edition = req.body.edition;
    const availableCopy = req.body.availableCopy;
    const cover = req.body.cover;
    
    db.query(
        "INSERT INTO Book (Title, ISBN, Publisher, NumberOfPages, Edition, AvailableCopy, Cover) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, isbn, publisher, numberOfPages, edition, availableCopy, cover],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});



module.exports = router;

