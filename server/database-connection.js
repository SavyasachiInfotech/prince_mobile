require("dotenv").config();

const mysql = require("mysql");
const con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTIONLIMIT,
  waitForConnections: process.env.DB_WAITFORCONNECTION,
  queueLimit: process.env.DB_QUEUELIMIT,
  debug: process.env.DB_DEBUG,
  wait_timeout: process.env.DB_WAITTIMEOUT,
  connect_timeout: process.env.DB_CONNECTTIMEOUT
});
module.exports = con;
