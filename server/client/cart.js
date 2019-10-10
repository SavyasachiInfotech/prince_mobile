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
    check("mobiles").isArray()
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
      if (cart.mobile_required == 1 && cart.mobiles.length < 1) {
        res
          .status(200)
          .json({ status: "0", message: "Please select the mobiles." });
      } else {
        let sql =
          "insert into cart(cart_id,variant_id,quantity,mobile_required) values(" +
          req.userId +
          "," +
          cart.variant_id +
          "," +
          cart.quantity +
          "," +
          cart.mobile_required +
          ")";
        con.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            res.status(200).json({
              status: "0",
              message: "Cart is not added. Please try again later."
            });
          } else {
            if (cart.mobile_required) {
              let valid = 1;
              try {
                sql = "insert into cart_mobile values";
                for (let i = 0; i < cart.mobiles.length; i++) {
                  if (
                    cart.mobiles[i].mobile_id &&
                    cart.mobiles[i].quantity &&
                    !isNaN(cart.mobiles[i].mobile_id) &&
                    !isNaN(cart.mobiles[i].quantity)
                  ) {
                    sql +=
                      "(" +
                      result.insertId +
                      "," +
                      cart.variant_id +
                      "," +
                      cart.mobiles[i].mobile_id +
                      "," +
                      cart.mobiles[i].quantity +
                      ")";
                    if (i == cart.mobiles.length - 1) {
                      con.query(sql, (err, data) => {
                        if (err) {
                          console.log(err);
                          sql =
                            "delete from cart where item_id=" + result.insertId;
                          con.query(sql, (err, del) => {
                            if (del) {
                              res.status(200).json({
                                status: "0",
                                message: "Select valid mobiles1"
                              });
                            } else {
                              res.status(200).json({
                                status: "0",
                                message:
                                  "Cart is not added. Please try again later."
                              });
                            }
                          });
                        } else {
                          res.status(200).json({
                            status: "1",
                            message: "Cart is added successfully."
                          });
                        }
                      });
                    } else {
                      sql += ",";
                    }
                  } else {
                    valid = 0;
                    sql = "delete from cart where item_id=" + result.insertId;
                    con.query(sql, (err, del) => {
                      if (del) {
                        res.status(200).json({
                          status: "0",
                          message: "Select valid mobiles1"
                        });
                      } else {
                        res.status(200).json({
                          status: "0",
                          message: "Cart is not added. Please try again later."
                        });
                      }
                    });
                  }
                }
              } catch {
                sql = "delete from cart where item_id=" + result.insertId;
                con.query(sql, (err, del) => {
                  if (del) {
                    res
                      .status(200)
                      .json({ status: "0", message: "Select valid mobiles" });
                  } else {
                    res.status(200).json({
                      status: "0",
                      message: "Cart is not added. Please try again later."
                    });
                  }
                });
              }
            } else {
              res.status(200).json({
                status: "1",
                message: "Product is added to cart successfully."
              });
            }
          }
        });
      }
    }
  }
);

module.exports = router;
