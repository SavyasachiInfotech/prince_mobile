const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;
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

router.get("/get-address", verifyToken, (req, res) => {
  let sql = "select * from customer_address where customer_id=" + req.userId;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({
        status: "0",
        message: "No Address found. Please add one address. "
      });
    } else {
      let json = JSON.stringify(result);
      result = JSON.parse(json, (key, val) =>
        typeof val !== "object" && val !== null ? String(val) : val
      );
      res.status(200).json({
        status: "1",
        message: "Getting address successfully.",
        addresses: result
      });
    }
  });
});

router.post(
  "/add-address",
  [
    check("first_name")
      .isString()
      .isLength({ min: 1, max: 100 }),
    check("last_name")
      .isString()
      .isLength({ min: 1, max: 100 }),
    check("email").isEmail(),
    check("add1")
      .isString()
      .isLength({ min: 1, max: 500 }),
    check("add2")
      .isString()
      .isLength({ min: 0, max: 500 }),
    check("add3")
      .isString()
      .isLength({ min: 0, max: 500 }),
    check("landmark")
      .isString()
      .isLength({ min: 1, max: 100 }),
    check("city")
      .isString()
      .isLength({ min: 1, max: 100 }),
    check("state")
      .isString()
      .isLength({ min: 1, max: 100 }),
    check("pincode").isNumeric({ min: 6, max: 6 }),
    check("mobile").isNumeric({ min: 10, max: 10 })
  ],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: "0",
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let add = req.body;
      let sql =
        'insert into customer_address(first_name,last_name,email,add1,add2,add3,landmark,city,state,pincode,mobile,customer_id) values("' +
        add.first_name +
        '","' +
        add.last_name +
        '","' +
        add.email +
        '","' +
        add.add1 +
        '","' +
        add.add2 +
        '","' +
        add.add3 +
        '","' +
        add.landmark +
        '","' +
        add.city +
        '","' +
        add.state +
        '",' +
        add.pincode +
        "," +
        add.mobile +
        "," +
        req.userId +
        ")";

      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json({
            status: "0",
            message: "Address is not added. Try again later."
          });
        } else {
          res
            .status(200)
            .json({ status: "1", message: "Address added successfully." });
        }
      });
    }
  }
);

router.put(
  "/update-address",
  [
    check("address_id").isNumeric(),
    check("first_name")
      .isString()
      .isLength({ min: 1, max: 100 }),
    check("last_name")
      .isString()
      .isLength({ min: 1, max: 100 }),
    check("email").isEmail(),
    check("add1")
      .isString()
      .isLength({ min: 1, max: 500 }),
    check("add2")
      .isString()
      .isLength({ min: 0, max: 500 }),
    check("add3")
      .isString()
      .isLength({ min: 0, max: 500 }),
    check("landmark")
      .isString()
      .isLength({ min: 1, max: 100 }),
    check("city")
      .isString()
      .isLength({ min: 1, max: 100 }),
    check("state")
      .isString()
      .isLength({ min: 1, max: 100 }),
    check("pincode").isNumeric({ min: 6, max: 6 }),
    check("mobile").isNumeric({ min: 10, max: 10 })
  ],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: "0",
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let add = req.body;
      let sql =
        'update customer_address set first_name="' +
        add.first_name +
        '", last_name="' +
        add.last_name +
        '",email="' +
        add.email +
        '", add1="' +
        add.add1 +
        '", add2="' +
        add.add2 +
        '", add3="' +
        add.add3 +
        '",landmark="' +
        add.landmark +
        '", city="' +
        add.city +
        '", state="' +
        add.city +
        '", pincode=' +
        add.pincode +
        ", mobile=" +
        add.mobile +
        " where customer_id=" +
        req.userId +
        " and address_id=" +
        add.address_id;

      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res
            .status(200)
            .json({ state: "0", message: "Address not updated. Try again." });
        } else {
          res.status(200).json({ state: "1", message: "Address is updated." });
        }
      });
    }
  }
);

module.exports = router;
