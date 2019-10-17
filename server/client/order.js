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
  "/place-order",
  [
    check("address_id").isNumeric(),
    check("promo_id").isNumeric(),
    check("iscod").isBoolean(),
    check("products").isArray()
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
      let data = req.body;
      let order_id;
      let sql =
        "insert into customer_order(user_id,address_id,promo_id,iscod) values(" +
        req.userId +
        "," +
        data.address_id +
        "," +
        data.promo_id +
        "," +
        data.iscod +
        ")";
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json({ status: "0", message: "Order not placed." });
        } else {
          order_id = result.insertId;
          sql = "select * from product_variant where variant_id in(";
          for (let i = 0; i < data.products.length; i++) {
            if (i == data.products.length - 1) {
              sql += data.products[i] + ")";
            } else {
              sql += data.products[i] + ",";
            }
          }
          con.query(sql, (err, variants) => {
            if (err) {
              console.log(err);
              sql = "delete from customer_order where order_id=" + order_id;
              con.query(sql, (err, data) => {
                res
                  .status(200)
                  .json({
                    status: "0",
                    message: "Order not placed. Select valid products."
                  });
              });
            } else {
              let daa;
            }
          });
        }
      });
    }
  }
);

module.exports = router;
