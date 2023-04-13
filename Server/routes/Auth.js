const express = require('express');
const router = express.Router();



router.post('/register', (req, res) => {
    const uname = req.body.uname;
    const email = req.body.email;
    const password = req.body.password;

    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [uname, email, password], (err, result)=>{
        console.log(err);
    })
})

router.post('/login', (req, res) => {
    
    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [req.body.email, req.body.password], (err, result)=>{
        if(err){
            res.send({err: err});
        }

        if(result.length > 0){
            res.send(result);
        }else{
            res.send({message: "Wrong username/password combination"});
        }
    });
})

module.exports = router;