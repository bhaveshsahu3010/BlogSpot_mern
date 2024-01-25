import mysql from 'mysql2'
// import safer-buffer from 'safer-buffer'

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "blog"
})