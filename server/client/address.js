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

router.get("/get-shipping-address", verifyToken, (req, res) => {
  let sql =
    "select * from customer_address where default_address=1 and customer_id=" +
    req.userId;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({
        status: "0",
        message: "No Address found. Please add one address. "
      });
    } else {
      if (result.length > 0) {
        let json = JSON.stringify(result);
        result = JSON.parse(json, (key, val) =>
          typeof val !== "object" && val !== null ? String(val) : val
        );
        res.status(200).json({
          status: "1",
          message: "Getting shipping address successfully.",
          getShippingData: result,
          address_added: "1"
        });
      } else {
        res.status(200).json({
          status: "2",
          message: "Getting shipping address successfully.",
          address_added: "0"
        });
      }
    }
  });
});

router.post(
  "/make-default-address",
  [check("address_id").isNumeric()],
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
      let sql =
        "update customer_address set default_address=0 where customer_id=" +
        req.userId;
      con.query(sql, (err, result) => {
        if (err) {
          res
            .status(200)
            .json({ status: "0", message: "Address not updated." });
        } else {
          sql =
            "update customer_address set default_address=1 where address_id=" +
            req.body.address_id;
          con.query(sql, (err, result) => {
            if (err) {
              res
                .status(200)
                .json({ status: "0", message: "Address not updated." });
            } else {
              res.status(200).json({
                status: "0",
                message: "Address updated successfully."
              });
            }
          });
        }
      });
    }
  }
);

router.post(
  "/delete-address",
  [check("address_id").isNumeric()],
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
      let data = req.body;
      let sql =
        "delete from customer_address where address_id=" + data.address_id;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json({
            status: "0",
            message: "Address not deleted. Please try again"
          });
        } else {
          res
            .status(200)
            .json({ status: "1", message: "Address deleted successfully." });
        }
      });
    }
  }
);

router.post(
  "/add-address",
  [
    check("id").isString(),
    check("first_name")
      .isString()
      .isLength({ min: 1, max: 100 }),
    check("last_name")
      .isString()
      .isLength({ min: 1, max: 100 }),
    check("email").isEmail(),
    check("flatno")
      .isString()
      .isLength({ min: 1, max: 500 }),
    check("colony")
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
    check("mobile").isNumeric({ min: 10, max: 10 }),
    check("default_address").isNumeric()
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
      let sql;
      if (add.id == "") {
        sql =
          'insert into customer_address(first_name,last_name,email,flatno,colony,landmark,city,state,pincode,mobile,customer_id,default_address) values("' +
          add.first_name +
          '","' +
          add.last_name +
          '","' +
          add.email +
          '","' +
          add.flatno +
          '","' +
          add.colony +
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
          "," +
          add.default_address +
          ")";
      } else {
        sql =
          'update customer_address set first_name="' +
          add.first_name +
          '", last_name="' +
          add.last_name +
          '",email="' +
          add.email +
          '", flatno="' +
          add.flatno +
          '", colony="' +
          add.colony +
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
          add.id;
      }

      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json({
            status: "0",
            message: "Address is not added. Try again later."
          });
        } else {
          if (add.default_address == 1) {
            sql =
              "update customer_address set default_address=0 where customer_id=" +
              req.userId;
            con.query(sql, (err, data) => {
              if (err) {
                res.json({
                  status: "0",
                  message: "Default address is not set."
                });
              } else {
                if (add.id == "") {
                  sql =
                    "update customer_address set default_address=1 where address_id=" +
                    result.insertId;
                } else {
                  sql =
                    "update customer_address set default_address=1 where address_id=" +
                    add.id;
                }
                con.query(sql, (err, result) => {
                  if (err) {
                    res.json({
                      status: "0",
                      message: "Default address is not set."
                    });
                  } else {
                    res.status(200).json({
                      status: "1",
                      message: "Address added successfully."
                    });
                  }
                });
              }
            });
          } else {
            res
              .status(200)
              .json({ status: "1", message: "Address added successfully." });
          }
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
