const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

const authRouter = require('./routes/Auth');
const bookRouter = require('./routes/Book');

app.use('/auth', authRouter);
app.use('/book', bookRouter);

app.use("/uploads", express.static("Assets/Images"))

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: '2600',
//     database: 'eLibrary',
// });

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
