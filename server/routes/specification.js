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

router.get("/get-specifications", verifyToken, (req, res) => {
  let sql = "select * from specification";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length > 0) {
        res.status(200).json({ status: process.env.SUCCESS, message: "Getting specifications successfully.", data: result });
      } else {
        res.status(200).json({ status: process.env.NOT_FOUND, message: process.env.NO_RECORD });
      }
    }
  });
});

router.post("/add-specifications", [check("name").isString()], verifyToken, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(200).json({
      status: process.env.ERROR,
      message: "Invalid Input Found",
      errors: errors.array()
    });
  } else {
    let specification = req.body;
    let sql = 'insert into specif ication(name) values("' + specification.name + '")';
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(200).json({ status: 400, message: "Specification is not added." });
      } else {
        res.status(200).json({ status: 200, message: "Specification is added successfully." })
      }
    });
  }
});

router.put("/update-specifications", [check("name").isString(), check("id").isNumeric()], verifyToken, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(200).json({
      status: process.env.ERROR,
      message: "Invalid Input Found",
      errors: errors.array()
    });
  } else {
    let specification = req.body;
    let sql = 'update specification set name="' + specification.name + "' where id=" + specification.id;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(200).json({ status: process.env.ERROR, message: "Specification is not updated." });
      } else {
        res.status(200).json({ status: process.env.SUCCESS, message: "Specification is updated successfully." });
      }
    });
  }
});

module.exports = router;