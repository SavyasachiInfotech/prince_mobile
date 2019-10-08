const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;

router.get("/get-announcement", (req, res) => {
  let sql =
    "select announcement,added_on from announcement order by added_on desc";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(200)
        .json({
          status: "0",
          message: "No announcement found. Please try again later."
        });
    } else {
      json = JSON.stringify(result);
      result = JSON.parse(json, (key, val) =>
        typeof val !== "object" && val !== null ? String(val) : val
      );
      res
        .status(200)
        .json({
          status: "1",
          message: "Getting announcement successfully.",
          announcement: result
        });
    }
  });
});

module.exports = router;
