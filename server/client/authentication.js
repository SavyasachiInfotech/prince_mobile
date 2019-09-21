const express = require("express");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const con = require("../database-connection");

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(200)
      .json({ status: "0", message: "Unauthorized Request! Header Not Found" });
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res
      .status(200)
      .json({ status: "0", message: "Unauthorized Request! Token Not Found" });
  }
  let payload = jwt.verify(token, "MysupersecreteKey");

  if (!payload) {
    return res.status(200).json({
      status: "0",
      message: "Unauthorized Request! Token is not Correct"
    });
  }
  req.userId = payload.subject;
  next();
}

router.get("/user-data", verifyToken, (req, res) => {
  let id = req.userId;
  let sql =
    "select username,email,mobile1,profile_image from customer where id=" + id;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({
        status: "0",
        message: "Cannot get user data. Please try again later."
      });
    } else {
      json = JSON.stringify(result);
      result = JSON.parse(json, (key, val) =>
        typeof val !== "object" && val !== null ? String(val) : val
      );
      if (result[0].profile_image != "") {
        result[0].profile_image = process.env.PROFILE + result[0].profile_image;
      }
      res
        .status(200)
        .json({ status: "1", message: "Getting user data", user: result[0] });
    }
  });
});

router.post(
  "/verify-otp",
  [
    check("mobile").isNumeric({ min: 10, max: 10 }),
    check("otp").isNumeric({ min: 6, max: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(200).json({ status: "0", message: "Enter Valid Data" });
    } else {
      let data = req.body;
      let sql =
        "select register_otp,id from customer where mobile1=" + data.mobile;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res
            .status(200)
            .json({ status: "0", message: "Provide data properly." });
        } else {
          if (result.length > 0) {
            if (result[0].register_otp == data.otp) {
              con.query(
                "update customer set register_otp=0, mobile_verified=1 where id=" +
                  result[0].id,
                (err, upData) => {
                  if (err) {
                    console.log(err);
                    res.status(200).json({
                      status: "0",
                      message: "OTP is not verified. Please try again later."
                    });
                  } else {
                    res.status(200).json({
                      status: "1",
                      message: "OTP is verified successfuly."
                    });
                  }
                }
              );
            } else {
              res.status(200).json({
                status: "0",
                message: "OTP is not matched.Provide valid OTP"
              });
            }
          } else {
            res.status(200).json({
              status: "0",
              message: "Mobile number is not registered."
            });
          }
        }
      });
    }
  }
);

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
              let otp = Math.random();
              otp = Math.ceil(otp * 1000000);
              let sql =
                'insert into customer (username,email,password,mobile1,register_otp) values("' +
                user.full_name +
                '","' +
                user.email +
                '","' +
                user.password +
                '",' +
                user.mobile +
                "," +
                otp +
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
                    token: jwt_token,
                    user: {
                      id: String(result.insertId),
                      username: String(user.full_name),
                      email: String(user.email),
                      mobile: String(user.mobile)
                    },
                    otp: String(otp)
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
              id: String(result[0].id),
              username: String(result[0].username),
              email: String(result[0].email),
              mobile: String(result[0].mobile1)
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
