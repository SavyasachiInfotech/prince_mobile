"use strict";
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
var paytm_config = require("./paytm/paytm_config").paytm_config;
var paytm_checksum = require("./paytm/checksum");
var querystring = require("querystring");

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
  "/generate_checksum",
  [check("variant_id").isNumeric(), check("mobile_required").isNumeric()],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("dsfds");
      res.status(200).json({
        status: process.env.ERROR,
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let sql;
      if (req.body.mobile_required == 1) {
        sql =
          "select c.*,vm.price,vm.quantity as ava_quantity from cart c, variant_mobile vm where c.cart_id=" +
          req.userId +
          " and c.variant_id=" +
          req.body.variant_id +
          " and vm.variant_id=c.variant_id and vm.mobile_id=c.mobile_id";
      } else {
        sql =
          "select c.*,v.price, v.quantity as ava_quanity from cart c, product_variant v where c.cart_id=" +
          req.userId +
          " and c.variant_id=" +
          req.body.variant_id +
          " and v.variant_id=c.variant_id";
      }
      con.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          res.status({ status: "0", message: "Please provide valid data" });
        } else {
          console.log(data);
          if (data.length > 0) {
            let price = 0,
              qty = 1;
            for (let i = 0; i < data.length; i++) {
              if (data[i].quantity <= data[i].ava_quantity) {
                price = price + data[i].price;
              } else {
                qty = 0;
                break;
              }
            }
            if (qty == 1) {
              sql =
                "insert into paytm_details(variant_id,user_id,price) values(" +
                req.body.variant_id +
                "," +
                req.userId +
                "," +
                price +
                ")";
              con.query(sql, (err, result) => {
                if (err) {
                  console.log(err);
                  res
                    .status(200)
                    .json({ status: "0", message: "Order not placed" });
                } else {
                  sql = "select * from customer where id=" + req.userId;
                  con.query(sql, (err, user) => {
                    if (err) {
                      console.log(err);
                      res
                        .status(200)
                        .json({ status: "0", message: "Order not placed" });
                    } else {
                      if (user.length > 0) {
                        var paramarray = {};
                        paramarray["MID"] = process.env.MID; //Provided by Paytm
                        paramarray["ORDER_ID"] = result.insertId; //unique OrderId for every request
                        paramarray["CUST_ID"] = req.userId; // unique customer identifier
                        paramarray["INDUSTRY_TYPE_ID"] = process.env.INDUTYPEID; //Provided by Paytm
                        paramarray["CHANNEL_ID"] = process.env.CHANNELID; //Provided by Paytm
                        paramarray["TXN_AMOUNT"] = price; // transaction amount
                        paramarray["WEBSITE"] = process.env.WEBSITE; //Provided by Paytm
                        paramarray["CALLBACK_URL"] =
                          "https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp"; //Provided by Paytm
                        paramarray["EMAIL"] = user[0].email; // customer email id
                        paramarray["MOBILE_NO"] = user[0].mobile1; // customer 10 digit mobile no.
                        paytm_checksum.genchecksum(
                          paramarray,
                          paytm_config.MERCHANT_KEY,
                          function(err, checksum) {
                            console.log("Checksum: ", checksum, "\n");
                            res.status(200).json({
                              status: "1",
                              message: "Checksum generated successfully."
                            });
                          }
                        );
                      } else {
                        res
                          .status(200)
                          .json({ status: "0", message: "Order not placed." });
                      }
                    }
                  });
                }
              });
            } else {
              res.status(200).json({
                status: "0",
                message: "Not enough stock to complete your order."
              });
            }
          } else {
            res.status(200).json({
              status: "0",
              message: "No products found added to the cart"
            });
          }
        }
      });
    }
  }
);

router.post("/verify_checksum", verifyToken, (request, res) => {
  var decodedBody = querystring.parse(fullBody);
  console.log(decodedBody);
  // get received checksum
  var checksum = decodedBody.CHECKSUMHASH;
  // remove this from body, will be passed to function as separate argument
  delete decodedBody.CHECKSUMHASH;
  if (
    paytm_checksum.verifychecksum(
      decodedBody,
      paytm_config.MERCHANT_KEY,
      checksum
    )
  ) {
    console.log("Checksum Verification => true");
    response.write("Checksum Verification => true");
  } else {
    console.log("Checksum Verification => false");
    response.write("Checksum Verification => false");
  }
  // if checksum is validated Kindly verify the amount and status
  // if transaction is successful
  // kindly call Paytm Transaction Status API and verify the transaction amount and status.
  // If everything is fine then mark that transaction as successful into your DB.
});

function htmlEscape(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
module.exports = router;
