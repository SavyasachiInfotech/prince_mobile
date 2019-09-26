const express = require("express");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const con = require("../database-connection");
const nodemailer = require("nodemailer");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
var app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../dist/admin/assets/profile"));
  },
  filename: (req, file, cb) => {
    file.originalname = new Date().getTime() + file.originalname;
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
});

var transporter = nodemailer.createTransport({
  host: process.env.MAILHOST,
  port: process.env.MAILPORT,
  secure: process.env.MAILSECURE,
  requireTLS: process.MAILREQUIRETLS,
  auth: {
    user: process.env.MAILUSER,
    pass: process.env.MAILPASS
  }
});

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
    "select username,email,mobile1,profile_image,address,pincode from customer where id=" +
    id;
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
      if (result[0].address == null) {
        result[0].address = "";
      }
      if (result[0].pincode == null) {
        result[0].pincode = "";
      }
      if (result[0].profile_image == null) {
        result[0].profile_image = "";
      }

      if (result[0].profile_image != "") {
        result[0].profile_image = process.env.PROFILE + result[0].profile_image;
      }

      res
        .status(200)
        .json({ status: "1", message: "Getting user data", user: result[0] });
    }
  });
});

// router.put("/update-profile",[(check("id").isNumeric(),check("")])

router.post(
  "/update-profile-image",
  verifyToken,
  upload.single("avatar"),
  (req, res) => {
    let sql = "select profile_image from customer where id=" + req.userId;
    con.query(sql, (err, data) => {
      if (err) {
        console.log(err);
        res
          .status(200)
          .json({ status: "0", message: "Profile image is not uploaded." });
      } else {
        fs.unlink(
          path.join(
            __dirname,
            "../../dist/admin/assets/profile/" + data[0].profile_image
          ),
          error => {}
        );
        sql =
          'update customer set profile_image="' +
          req.file.originalname +
          '" where id=' +
          req.userId;
        con.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            res.status(200).json({
              status: "0",
              message: "Profile image is not updated. Please try again later."
            });
          } else {
            res.status(200).json({
              status: "1",
              message: "Profile image is uploaded successfully."
            });
          }
        });
      }
    });
  }
);

router.post(
  "/add-profile-image",
  verifyToken,
  upload.single("avatar"),
  (req, res) => {
    let sql = "select profile_image from customer where id=" + req.userId;
    con.query(sql, (err, data) => {
      if (err) {
        console.log(err);
        res.status(200).json({
          status: "0",
          message: "Please login again for upload profile image."
        });
      } else {
        sql =
          'update customer set profile_image="' +
          req.file.originalname +
          '" where id=' +
          req.userId;
        con.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            res.status(200).json({
              status: "0",
              message: "Profile image is not updated. Please try again later."
            });
          } else {
            res.status(200).json({
              status: "1",
              message: "Profile image is uploaded successfully."
            });
          }
        });
        if (
          data.length > 0 &&
          data[0].profile_image != null &&
          data[0].profile_image.length > 0
        ) {
          fs.unlink(
            path.join(
              __dirname,
              "../../dist/admin/assets/profile/" + data[0].profile_image
            ),
            error => {}
          );
        }
      }
    });
  }
);

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
                      password: String(user.password),
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
            user: {
              id: String(result[0].id),
              username: String(result[0].username),
              password: String(result[0].password),
              email: String(result[0].email),
              mobile: String(result[0].mobile1),
              token: jwt_token
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

router.post("/forget-password", (req, res) => {
  let data = req.body;
  if (data.email.length > 400 && data.email.length < 1) {
    res
      .status(200)
      .json({ status: "0", message: "Enter valid Email or Mobile" });
  } else {
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
        console.log(err);
        res
          .status(200)
          .json({ status: "0", message: "Enter proper email or mobile" });
      } else {
        if (result.length > 0) {
          let pass = Math.ceil(Math.random() * 10000000000);
          pass = md5(pass);
          pass = pass.substr(0, 8);
          var mailOptions = {
            from: "youremail@gmail.com",
            to: result[0].email,
            subject: "Forget Password - Prince Mobile",
            html:
              "<h1>Forget Password</h1><br><br>You can use this password for temporary time. Once you getting login with this password, you can change this password with your new password.<br><br><br> <b>Temporary Passowrd :</b> &nbsp;&nbsp; " +
              pass
          };
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
              res.status(200).json({
                status: "0",
                message: "Request not proceede. Please try again later."
              });
            }
          });
          pass = md5(pass);

          sql =
            "update customer set password='" +
            pass +
            "' where id=" +
            result[0].id;
          con.query(sql, (err, data) => {
            if (err) {
              res.status(200).json({
                status: "0",
                message: "Request can not proceed. Please try again later."
              });
            } else {
              res.status(200).json({
                status: "1",
                message: "Request proceeded. Please check your email."
              });
            }
          });
        } else {
          res.status(200).json({
            status: "0",
            message: "Your email/mobile is not registered."
          });
        }
      }
    });
  }
});

router.post(
  "/change-password",
  [
    check("currentPassword")
      .isString()
      .isLength({ min: 32, max: 32 }),
    check("newPassword")
      .isString()
      .isLength({ min: 32, max: 32 }),
    check("email")
      .isString()
      .isLength({ min: 1, max: 400 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(200).json({ status: "0", message: "Enter Valid Data" });
    } else {
      let data = req.body;
      if (isNaN(data.email)) {
        mobile = -4;
      } else {
        mobile = data.email;
      }
      let sql =
        "select * from customer where email='" +
        data.email +
        "' or mobile1=" +
        mobile;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json({ status: "0", message: "Enter valid Data." });
        } else {
          if (result.length > 0) {
            if (
              result[0].password.toLowerCase() ==
              data.currentPassword.toLowerCase()
            ) {
              sql =
                "update customer set password='" +
                data.newPassword +
                "' where id=" +
                result[0].id;
              con.query(sql, (err, newPass) => {
                if (err) {
                  console.log(err);
                  res.status(200).json({
                    status: "0",
                    message: "Password not changed. Please try again later."
                  });
                } else {
                  res.status(200).json({
                    status: "1",
                    message: "Password changed successsfully."
                  });
                }
              });
            } else {
              res.status(200).json({
                status: "0",
                message: "Please enter valid current password."
              });
            }
          } else {
            res.status(200).json({
              status: "0",
              message: "Email/Mobile provided by you is not registered."
            });
          }
        }
      });
    }
  }
);

module.exports = router;
