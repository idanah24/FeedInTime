const mysql = require('mysql2')
const db = require('./config').database


const pool = mysql.createPool({
    host: db.host,
    user: db.user,
    database: db.name,
    password: db.password
})


module.exports = pool.promise()
