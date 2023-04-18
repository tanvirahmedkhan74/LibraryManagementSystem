const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cors = require("cors");
const jwt = require("jsonwebtoken");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "2600",
  database: "elibrary",
});

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const session = require("express-session");

router.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

router.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

router.post("/register", (req, res) => {
  const uname = req.body.uname;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO User (Username, Email, Password, Admin) VALUES (?, ?, ?, ?)",
      [uname, email, hash, false],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

router.post("/login", (req, res) => {
  db.query(
    "SELECT * FROM User WHERE Email = ?;",
    [req.body.email],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(
          req.body.password,
          result[0].Password,
          (error, response) => {
            if (response) {
              const id = result[0].UserID;
              const token = jwt.sign({ id }, "jwtSecret", {
                expiresIn: 300,
              });
              req.session.user = result;
              res.json({ auth: true, token: token, result: result });
            } else {
              res.json({auth: false,  message: "Wrong username/password combination" });
            }
          }
        );
      } else {
        res.json({auth: false, message: "User doesn't exist" });
      }
    }
  );
});


const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("We need a token, please give it to us next time");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "You failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

router.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send(true);
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send({ message: "Logged out" });
});

module.exports = router;
