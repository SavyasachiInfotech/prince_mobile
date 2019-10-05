const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  check,
  validationResult,
  sanitizeParam,
  param
} = require("express-validator");
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

router.get(
  "/get-mobiles/:up",
  [param("up").isNumeric()],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: process.env.ERROR,
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let sql =
        "select * from mobile_models limit " + req.params.up + "," + limit;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length > 0) {
            res
              .status(200)
              .json({
                status: 200,
                message: "Mobiles getting successfully",
                data: result
              });
          } else {
            res
              .status(200)
              .json({ status: 404, message: "No record found of mobiles." });
          }
        }
      });
    }
  }
);

router.post(
  "/add-mobile",
  [check("name").isString()],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: process.env.ERROR,
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      mobile = req.body;
      sql =
        'insert into mobile_models(model_name) values("' + mobile.name + '")';
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res
            .status(200)
            .json({ status: 200, message: "Mobile added successfully" });
        }
      });
    }
  }
);

router.put(
  "/update-mobile",
  [check("name").isString(), check("id").isNumeric()],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: process.env.ERROR,
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      mobile = req.body;
      sql =
        'update mobile_models set model_name="' +
        mobile.name +
        '" where model_id=' +
        mobile.id;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res
            .status(200)
            .json({ status: 200, message: "Mobile updated successfully" });
        }
      });
    }
  }
);

module.exports = router;
