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

router.post(
  "/add-cart",
  [
    check("variant_id").isNumeric(),
    check("quantity").isNumeric(),
    check("mobile_required").isBoolean(),
    check("mobile_id").isArray()
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
      let cart = req.body;
      let sql =
        "insert into cart(cart_id,variant_id,quantity,mobile_required,mobile_id) values";
      for (let i = 0; i < cart.length; i++) {
        if (i == cart.length - 1) {
          sql +=
            "(" +
            req.userId +
            "," +
            cart.variant_id +
            "," +
            cart.quantity +
            "," +
            cart.mobile_required +
            "," +
            cart.mobile_id +
            ");";
        } else {
          sql +=
            "(" +
            req.userId +
            "," +
            cart.variant_id +
            "," +
            cart.quantity +
            "," +
            cart.mobile_required +
            "," +
            cart.mobile_id +
            "),";
        }
      }

      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json({
            status: "0",
            message: "Cart is not added. Please try again later."
          });
        } else {
          res.status(200).json({
            status: "1",
            message: "Cart is added successfully."
          });
        }
      });
    }
  }
);

router.get("/get-cart-detail", verifyToken, (req, res) => {
  let sql = "select * from cart where cart_id=" + req.userId;
  con.query(sql, (err, result) => {});
});

module.exports = router;
