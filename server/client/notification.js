const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized Request! Header Not Found");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized Request! Token Not Found");
  }
  let payload = jwt.verify(token, "MysupersecreteKey");

  if (!payload) {
    return res.status(401).send("Unauthorized Request! Token is not Correct");
  }
  req.userId = payload.subject;
  next();
}

router.get("/get-notifications", (req, res) => {
  let sql = "select * from notifications order by added_on desc";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({
        status: "0",
        message: "No notifications found. Please try again later."
      });
    } else {
      json = JSON.stringify(result);
      result = JSON.parse(json, (key, val) =>
        typeof val !== "object" && val !== null ? String(val) : val
      );
      res.status(200).json({
        status: "1",
        message: "Getting notifications successfully.",
        notifications: result
      });
    }
  });
});

router.post("/delete-notification", verifyToken, (req, res) => {
  if (isNaN(req.body.id)) {
    res.json({ status: "0", message: "Please select valid notification" });
  } else {
    let sql = "delete from notifications where id=" + req.body.id;
    con.query(sql, (err, result) => {
      if (err) {
        res.json({ status: "0", message: "Notification is not deleted." });
      } else {
        res.json({ status: "1", message: "Notification deleted sucessfully" });
      }
    });
  }
});

module.exports = router;
