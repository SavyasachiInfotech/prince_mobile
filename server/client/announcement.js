const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;

router.get("/get-announcement", (req, res) => {
  let sql = "select * from announcement order by added_on desc";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({
        status: "0",
        message: "No announcement found. Please try again later."
      });
    } else {
      json = JSON.stringify(result);
      result = JSON.parse(json, (key, val) =>
        typeof val !== "object" && val !== null ? String(val) : val
      );
      res.status(200).json({
        status: "1",
        message: "Getting announcement successfully.",
        announcement: result
      });
    }
  });
});

router.put("/read-announcement/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(200).json({ status: "0", message: "Enter valid announcement" });
  } else {
    let sql = "update announcement set is_read=1 where id=" + req.params.id;
    con.query(sql, (err, data) => {
      if (err) {
        console.log(err);
        res
          .status(200)
          .json({ status: "0", message: "Enter valid announcement" });
      } else {
        res
          .status(200)
          .json({ status: "1", message: "Announcement updated properly." });
      }
    });
  }
});

module.exports = router;
