const mysql = require("mysql2");

let pool = mysql.createPool({
  host: "localhost",
  database: "users_schema",
  user: "root",
  password: "12345678",
});

module.exports = pool.promise();
