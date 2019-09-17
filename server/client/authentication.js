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
    check("password")
      .isString()
      .isLength({ min: 5 }),
    check("mobile").isNumeric({ min: 10 }),
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
        "' or mobile1=" +
        user.mobile;

      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
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
                  console.log(err);
                  res.status(200).json({
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
                con.end();
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

router.post("/login-user", (req, res) => {
  let data = req.body;
  let mobile;
  if (isNaN(data.email)) {
    mobile = -4;
  } else {
    mobile = data.email;
  }
  let sql =
    'select * from customer where email="' +
    data.email +
    '" or mobile1=' +
    mobile;
  con.query(sql, (err, result) => {
    if (err) {
      res
        .status(200)
        .json({ status: "0", message: "Enter valid Email/Mobile." });
    } else {
      if (result.length > 0) {
        if (result[0].password == data.password) {
          let payload = { subject: result[0].id };
          let jwt_token = jwt.sign(payload, "MysupersecreteKey");
          res.status(200).send({
            status: "1",
            message: "Logged in successfully.",
            token: jwt_token,
            user: {
              id: result[0].id,
              username: result[0].username,
              email: result[0].email,
              mobile: result[0].mobile1
            }
          });
        } else {
          res.status(200).json({
            status: "2",
            message: "Your Username and password are not matched."
          });
        }
      } else {
        res
          .status(200)
          .json({ status: "2", message: "Enter registered Email/Mobile." });
      }
    }
  });
});

module.exports = router;
