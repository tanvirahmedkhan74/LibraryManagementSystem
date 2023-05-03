const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { pid } = require("process");
const fs = require("fs");

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

router.get("/getBooks", (req, res) => {
  db.query("SELECT * FROM Book", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(result);
      // Get the Publisher from the publisher table with the PublisherID

      const publisherPromises = result.map((book) => {
        return new Promise((resolve, reject) => {
          db.query(
            "SELECT Name FROM Publisher WHERE PublisherID = ?",
            book.PublisherID,
            (err, result2) => {
              if (err) {
                reject(err);
              } else {
                book.Publisher = result2[0].Name;
                resolve();
              }
            }
          );
        });
      });

      // Get the Category from the category table with the CategoryID

      const categoryPromises = result.map((book) => {
        return new Promise((resolve, reject) => {
          db.query(
            "SELECT Name FROM Category WHERE CategoryID = ?",
            book.CategoryID,
            (err, result2) => {
              if (err) {
                reject(err);
              } else {
                book.Category = result2[0].Name;
                resolve();
              }
            }
          );
        });
      });

      Promise.all([...publisherPromises, ...categoryPromises])
        .then(() => {
          //console.log(result);
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Internal server error");
        });
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

  let pId = 0;
  // If publisher exist, get the categoryId from the db and add the book. else create the publisher, get the categoryId and add book. Category will always exist in the db
  db.query(
    "SELECT PublisherID FROM Publisher WHERE Name = ?",
    publisher,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          //console.log(result[0].PublisherID);
          pId = result[0].PublisherID;

          // get the categoryId and add the book
          db.query(
            "SELECT CategoryID FROM Category WHERE Name = ?",
            category,
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.query(
                  "UPDATE Book SET Title = ?, PublisherID = ?, ISBN = ?, PublicationDate = ?, Edition = ?, CategoryID = ?, AvailableCopies = ?, CoverImage = ? WHERE BookID = ?",
                  [
                    title,
                    pId,
                    isbn,
                    publicationDate,
                    edition,
                    result[0].CategoryID,
                    copies,
                    cover,
                    BookID,
                  ],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      res.send(result);
                      console.log(result);
                    }
                  }
                );
              }
            }
          );
        } else {
          db.query(
            "INSERT INTO Publisher (Name) VALUES (?)",
            publisher,
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                //console.log(result);
                db.query(
                  "SELECT PublisherID FROM Publisher WHERE Name = ?",
                  publisher,
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      //console.log(result[0].PublisherID);
                      pId = result[0].PublisherID;
                      // get the categoryId and add the book
                      db.query(
                        "SELECT CategoryID FROM Category WHERE Name = ?",
                        category,
                        (err, result) => {
                          if (err) {
                            console.log(err);
                          } else {
                            db.query(
                              "UPDATE Book SET Title = ?, PublisherID = ?, ISBN = ?, PublicationDate = ?, Edition = ?, CategoryID = ?, AvailableCopies = ?, CoverImage = ? WHERE BookID = ?",
                              [
                                title,
                                pId,
                                isbn,
                                publicationDate,
                                edition,
                                result[0].CategoryID,
                                copies,
                                cover,
                                BookID,
                              ],
                              (err, result) => {
                                if (err) {
                                  console.log(err);
                                } else {
                                  res.send(result);
                                  console.log(result);
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
});

router.get("/getBook/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Book WHERE BookID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    } else {
      const publisherPromise = new Promise((resolve, reject) => {
        db.query(
          "SELECT Name FROM Publisher WHERE PublisherID = ?",
          result[0].PublisherID,
          (err, result2) => {
            if (err) {
              reject(err);
            } else {
              result[0].Publisher = result2[0].Name;
              resolve();
            }
          }
        );
      });

      const categoryPromise = new Promise((resolve, reject) => {
        db.query(
          "SELECT Name FROM Category WHERE CategoryID = ?",
          result[0].CategoryID,
          (err, result2) => {
            if (err) {
              reject(err);
            } else {
              result[0].Category = result2[0].Name;
              resolve();
            }
          }
        );
      });

      Promise.all([publisherPromise, categoryPromise])
        .then(() => {
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Internal server error");
        });
    }
  });
});


// Title, ISBN, Publisher, NumberOfPages, Edition, AvailableCopy, Cover(optional)
router.post("/addBook", upload.single("image"), (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const publisher = req.body.publisher;
  const isbn = req.body.isbn;
  const publicationDate = req.body.publicationDate;
  const edition = req.body.edition;
  const category = req.body.category;
  const copies = req.body.copies;
  const cover = req.file.filename; // Use req.file instead of req.body.cover
  const BookID = req.body.BookID;

  let pId = 0;
  // If publisher exist, get the categoryId from the db and add the book. else create the publisher, get the categoryId and add book. Category will always exist in the db
  db.query(
    "SELECT PublisherID FROM Publisher WHERE Name = ?",
    publisher,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          //console.log(result[0].PublisherID);
          pId = result[0].PublisherID;

          // get the categoryId and add the book
          db.query(
            "SELECT CategoryID FROM Category WHERE Name = ?",
            category,
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.query(
                  "INSERT INTO Book (Title, PublisherID, ISBN, PublicationDate, Edition, CategoryID, AvailableCopies, CoverImage) VALUES (?,?,?,?,?,?,?,?)",
                  [
                    title,
                    pId,
                    isbn,
                    publicationDate,
                    edition,
                    result[0].CategoryID,
                    copies,
                    cover,
                  ],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      res.send(result);
                      console.log(result);
                    }
                  }
                );
              }
            }
          );
        } else {
          db.query(
            "INSERT INTO Publisher (Name) VALUES (?)",
            publisher,
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                //console.log(result);
                db.query(
                  "SELECT PublisherID FROM Publisher WHERE Name = ?",
                  publisher,
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      //console.log(result[0].PublisherID);
                      pId = result[0].PublisherID;
                      // get the categoryId and add the book
                      db.query(
                        "SELECT CategoryID FROM Category WHERE Name = ?",
                        category,
                        (err, result) => {
                          if (err) {
                            console.log(err);
                          } else {
                            db.query(
                              "INSERT INTO Book (Title, PublisherID, ISBN, PublicationDate, Edition, CategoryID, AvailableCopies, CoverImage) VALUES (?,?,?,?,?,?,?,?)",
                              [
                                title,
                                pId,
                                isbn,
                                publicationDate,
                                edition,
                                result[0].CategoryID,
                                copies,
                                cover,
                              ],
                              (err, result) => {
                                if (err) {
                                  console.log(err);
                                } else {
                                  res.send(result);
                                  console.log(result);
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
});

router.delete("/deleteBook/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  db.query(
    "SELECT CoverImage FROM Book WHERE BookID = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        const path = `./Assets/Images/${result[0].CoverImage}`;
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Image deleted");
          }
        });
      }
    }
  );

  db.query("DELETE FROM Book WHERE BookID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

module.exports = router;
