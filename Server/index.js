const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

const authRouter = require('./routes/Auth');

app.use('/auth', authRouter);

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '2600',
    database: 'login_system',
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
