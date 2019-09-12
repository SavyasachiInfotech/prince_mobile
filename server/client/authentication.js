const express = require("express");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const con = require("../database-connection");

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

router.post(
  "/register-user",
  [
    check("email").isEmail(),
    check("password").isLength({ min: 5 }),
    check("mobile").isNumeric(),
    check("full_name").isString()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({ status: "0", message: "Enter Valid Data" });
    } else {
      let user = req.body;
      let sql =
        "select * from customer where email='" +
        user.email +
        "' or mobile=" +
        user.mobile;
      con.query(sql, (err, result) => {
        if (err) {
          res.status(200).json({ status: "0", message: "Enter valid data." });
        } else {
          if (result.length > 0) {
            if (result[0].email == user.email) {
              res.status(200).json({
                status: "0",
                message: "This email is already registered."
              });
            } else {
              res.status(200).json({
                status: "0",
                message: "This mobile number is already registerd."
              });
            }
          } else {
            if (user.email && user.password && user.full_name && user.mobile) {
              let sql =
                'insert into customer (username,email,password,mobile1) values("' +
                user.full_name +
                '","' +
                user.email +
                '","' +
                user.password +
                '",' +
                user.mobile +
                ")";
              con.query(sql, (err, result) => {
                if (err) {
                  res.status("200").json({
                    status: "0",
                    message: "User is not registered. Please try agian later."
                  });
                } else {
                  let payload = { subject: result.insertId };
                  let jwt_token = jwt.sign(payload, "MysupersecreteKey");
                  res.status(200).send({
                    status: "1",
                    message: "User registered successfully",
                    token: jwt_token
                  });
                }
              });
            } else {
              res
                .status(200)
                .send({ status: "0", message: "Invalid Data Found" });
            }
          }
        }
      });
    }
  }
);

module.exports = router;
