const mysql2 = require("mysql2/promise");

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "devTinder",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const testConnection = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Connected successfully");
  } catch (err) {
    console.log("Connection failed " + err.message);
  } finally {
    if (connection) connection.release();
  }
};
testConnection();
module.exports = pool;
