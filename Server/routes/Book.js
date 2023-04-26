const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

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
  database: "elibrary",
});

// CORS config

router.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Book routes

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

// title, publisher, isbn, publicationDate, edition, category, copies, cover, BookID from frontend

router.put("/updateBook", upload.single("image"), (req, res) => {
  const title = req.body.title;
  const publisher = req.body.publisher;
  const isbn = req.body.isbn;
  const publicationDate = req.body.publicationDate;
  const edition = req.body.edition;
  const category = req.body.category;
  const copies = req.body.copies;
  const cover = req.file.filename; // Use req.file instead of req.body.cover
  const BookID = req.body.BookID;

  //console.log(cover);

  db.query(
      "UPDATE Book SET Title = ?, Publisher = ?, ISBN = ?, PublicationDate = ?, Edition = ?, Category = ?, AvailableCopies = ?, CoverImage = ? WHERE BookID = ?",
      [title, publisher, isbn, publicationDate, edition, category, copies, cover, BookID],
      (err, result) => {
          if (err) {
              console.log(err);
          } else {
              res.send(result);
              //console.log(result);
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
      //console.log(result);
    }
  });
});

// Title, ISBN, Publisher, NumberOfPages, Edition, AvailableCopy, Cover(optional)
router.post("/addBook", upload.single('image') ,(req, res) => {
  const title = req.body.title;
  const publisher = req.body.publisher;
  const isbn = req.body.isbn;
  const publicationDate = req.body.publicationDate;
  const edition = req.body.edition;
  const category = req.body.category;
  const copies = req.body.copies;
  const cover = req.file.filename; // Use req.file instead of req.body.cover
  const BookID = req.body.BookID;

  db.query(
    "INSERT INTO Book (Title, Publisher, ISBN, PublicationDate, Edition, Category, AvailableCopies, CoverImage) VALUES (?,?,?,?,?,?,?,?)",
    [title, publisher, isbn, publicationDate, edition, category, copies, cover],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  )
});

module.exports = router;
