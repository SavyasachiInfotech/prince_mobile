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
    check("iscod").isBoolean()
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
          sql =
            "select c.item_id,c.quantity as cart_quantity,c.mobile_required,c.mobile_id,c.added_date as cart_date,v.* from cart c, product_variant v where c.variant_id=v.variant_id and cart_id=" +
            req.userId;
          con.query(sql, (err, cart) => {
            if (err) {
              deleteOrder(order_id);
              res.status(200).json({
                status: "0",
                message: "Order not placed. Select valid products."
              });
            } else {
              if (cart.length > 0) {
                sql =
                  "insert into order_detail(order_id,variant_id,variant,quantity,mobile_required,mobile_id) values";
                for (let i = 0; i < cart.length; i++) {
                  if (cart[i].cart_quantity > cart[i].quantity) {
                    deleteOrder(order_id);
                    res.status(200).json({
                      status: "0",
                      message: "Not enough stock to complete your order."
                    });
                  } else {
                    sql +=
                      "(" +
                      order_id +
                      "," +
                      cart[i].variant_id +
                      ",'" +
                      JSON.stringify(cart[i]) +
                      "'," +
                      cart[i].cart_quantity +
                      "," +
                      cart[i].mobile_required +
                      "," +
                      cart[i].mobile_id +
                      ")";
                    if (i != cart.length - 1) {
                      sql += ", ";
                    } else {
                      sql += ";";
                    }
                  }
                }
                con.query(sql, (err, order) => {
                  if (err) {
                    console.log(err);
                    deleteOrder(order_id);
                    res.status(200).json({
                      status: "0",
                      message: "Order not placed. Try again later"
                    });
                  } else {
                    sql = "";
                    for (let i = 0; i < cart.length; i++) {
                      sql =
                        "update product_variant set quantity=quantity-" +
                        cart[i].cart_quantity +
                        ", order_count=order_count+" +
                        cart[i].cart_quantity +
                        " where variant_id=" +
                        cart[i].variant_id +
                        ";";
                      con.query(sql, (err, result) => {});
                    }
                    sql = "delete from cart where cart_id=" + req.userId;
                    con.query(sql, (err, result) => {
                      res.status(200).json({
                        status: 1,
                        message: "Order placed successfully."
                      });
                    });
                  }
                });
              } else {
                deleteOrder(order_id);
                res.status(200).json({
                  status: "0",
                  message: "Please add products in Cart."
                });
              }
            }
          });
        }
      });
    }
  }
);

function deleteOrder(order_id) {
  let sql = "delete from customer_order where order_id=" + order_id;
  con.query(sql, (err, data) => {});
}

module.exports = router;
