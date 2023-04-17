const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '2600',
    database: 'elibrary',
});

router.post('/register', (req, res) => {
    const uname = req.body.uname;
    const email = req.body.email;
    const password = req.body.password;

    db.query("INSERT INTO User (Username, Email, Password, Admin) VALUES (?, ?, ?, ?)", [uname, email, password, false], (err, result)=>{
        console.log(err);
    })
})

router.post('/login', (req, res) => {
    
    db.query("SELECT * FROM User WHERE Email = ? AND Password = ?", [req.body.email, req.body.password], (err, result)=>{
        if(err){
            res.send({err: err});
        }

        if(result.length > 0){
            res.send(result);
            //console.log(result);
        }else{
            res.send({message: "Wrong username/password combination"});
        }
    });
})

module.exports = router;