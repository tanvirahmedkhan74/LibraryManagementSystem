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
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

router.get("/getBooks", (req, res) => {
    db.query("SELECT * FROM Book", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            //console.log(result);
            res.send(result);
        }
    });
});

router.put("/updateBook", (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const isbn = req.body.isbn;
    const publisher = req.body.publisher;
    const numberOfPages = req.body.numberOfPages;
    const edition = req.body.edition;
    const availableCopy = req.body.availableCopy;
    const cover = req.body.cover;

    db.query(
        "UPDATE Book SET Title = ?, ISBN = ?, Publisher = ?, NumberOfPages = ?, Edition = ?, AvailableCopy = ?, Cover = ? WHERE BookID = ?",
        [title, isbn, publisher, numberOfPages, edition, availableCopy, cover, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

router.get("/getBook/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM Book WHERE BookID = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
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

