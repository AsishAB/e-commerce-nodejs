const mysql = require('mysql2'); 

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'e-commerce-nodejs',
    password: 'windows11'
});

module.exports = pool.promise();