const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;

/** Verify the user token */

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

router.get("/get-announcement", verifyToken, (req, res) => {
  let sql = "select * from announcement";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "No announcement found." });
    } else {
      res.json({
        status: 200,
        message: "Announcement getting successfully.",
        announcements: result
      });
    }
  });
});

router.post("/add-announcement", verifyToken, (req, res) => {
  let data = req.body;
  let sql =
    "insert into announcement(title,description) values('" +
    data.title +
    "','" +
    data.description +
    "')";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: 400,
        message: "Announcement not added. Please try again."
      });
    } else {
      res.json({ status: 200, message: "Announcement added successfully." });
    }
  });
});

router.post("/update-announcement", verifyToken, (req, res) => {
  let data = req.body;
  let sql =
    "update announcement set title='" +
    data.title +
    "', description='" +
    data.description +
    "' where id=" +
    data.id;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "Announcement not updated." });
    } else {
      res.json({ status: 200, message: "Announcement updated successfully." });
    }
  });
});

router.get("/get-announcement/:id", verifyToken, (req, res) => {
  let sql = "select * from announcement where id=" + req.params.id;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "Announcement not found." });
    } else {
      res.json({
        status: 200,
        message: "Getting announcement successfully.",
        data: result
      });
    }
  });
});

router.post("/delete-announcement", verifyToken, (req, res) => {
  let data = req.body;
  let sql = "delete from announcement where id=" + data.id;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "Announcement not deleted." });
    } else {
      res.json({ status: 200, message: "Announcement deleted successfully." });
    }
  });
});

module.exports = router;
