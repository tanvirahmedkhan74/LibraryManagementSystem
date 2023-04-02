const mysql = require('mysql');
const express = require('express');
const cors = require('cors');


const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'database'
});