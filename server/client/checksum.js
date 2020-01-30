"use strict";
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
var paytm_config = require("./paytm/paytm_config").paytm_config;
var paytm_checksum = require("./paytm/checksum");
var querystring = require("querystring");
const auth = require("../auth");

router.post(
  "/generate_checksum",
  [check("variant_id").isNumeric(), check("mobile_required").isNumeric(),check("promo_id").isNumeric()],
 auth.verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
          "select c.*,v.price, v.quantity as ava_quantity from cart c, product_variant v where c.cart_id=" +
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
            let price = 0;
            let qty = 1;
            console.log(data.length);
            for (let i = 0; i < data.length; i++) {
              if (data[i].quantity <= data[i].ava_quantity) {
                price = price + data[i].price * data[i].quantity;
              } else {
                qty = 0;
                break;
              }
            }
            if (qty == 1) {
              if(req.body.promo_id==0){
                sql =
                "insert into paytm_details(variant_id,user_id,price,mobile_required,promo_id) values(" +
                req.body.variant_id +
                "," +
                req.userId +
                "," +
                price +
                "," +
                req.body.mobile_required +
                ",0)";
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
                        paramarray["ORDER_ID"] = result.insertId.toString(); //unique OrderId for every req
                        paramarray["CUST_ID"] = req.userId.toString(); // unique customer identifier
                        paramarray["INDUSTRY_TYPE_ID"] = process.env.INDUTYPEID; //Provided by Paytm
                        paramarray["CHANNEL_ID"] = process.env.CHANNELID; //Provided by Paytm
                        paramarray["TXN_AMOUNT"] = price.toString(); // transaction amount
                        paramarray["WEBSITE"] = process.env.WEBSITE; //Provided by Paytm
                        paramarray["CALLBACK_URL"] =
                          "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" +
                          result.insertId; //Provided by Paytm
                        // paramarray["EMAIL"] = user[0].email; // customer email id
                        paramarray["EMAIL"] = "pmdhankecha.18@gmail.com"; // customer email id
                        paramarray["MOBILE_NO"] = "9737156062"; // customer 10 digit mobile no.
                        paytm_checksum.genchecksum(
                          paramarray,
                          paytm_config.MERCHANT_KEY,
                          function(err, checksum) {
                            console.log(checksum);
                            console.log(
                              "Checksum: ",
                              JSON.stringify(checksum),
                              "\n"
                            );
                            res.status(200).json({
                              status: "1",
                              message: "Checksum generated successfully.",
                              checksum: checksum,
                              order_id: result.insertId.toString(),
                              mid: process.env.MID,
                              cust_id: req.userId.toString(),
                              industry_type_id: process.env.INDUTYPEID,
                              channel_id: process.env.CHANNELID,
                              txn_amount: price.toString(),
                              website: process.env.WEBSITE,
                              callback_url:
                                "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" +
                                result.insertId,
                              email: "pmdhankecha.18@gmail.com",
                              mobile_no: "9737156062"
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
                sql ="select * from promocode where id=" + req.body.promo_id;
                        con.query(sql, (err, promo) => {
                          if (err) {
                            console.log(err);
                            deleteOrder(order_id);
                            res.status(200).json({
                              status: "0",
                              message:
                                "Order not placed. Please apply valid promocode."
                            });
                          } else {
                            if (promo.length > 0) {
                              if (
                                promo[0].min_limit <= price
                              ) {
                                let discount;
                                if (promo[0].discount_type == 1) {
                                  discount = promo[0].max_discount;
                                } else {
                                  discount =
                                    (price *
                                      promo[0].discount) /
                                    100;
                                  if (discount > promo[0].max_discount) {
                                    discount = promo[0].max_discount;
                                  }
                                }
                                price =
                                  price - discount;
                                  sql =
                                  "insert into paytm_details(variant_id,user_id,price,mobile_required,promo_id) values(" +
                                  req.body.variant_id +
                                  "," +
                                  req.userId +
                                  "," +
                                  price +
                                  "," +
                                  req.body.mobile_required +","+req.body.promo_id+
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
                                          paramarray["ORDER_ID"] = result.insertId.toString(); //unique OrderId for every req
                                          paramarray["CUST_ID"] = req.userId.toString(); // unique customer identifier
                                          paramarray["INDUSTRY_TYPE_ID"] = process.env.INDUTYPEID; //Provided by Paytm
                                          paramarray["CHANNEL_ID"] = process.env.CHANNELID; //Provided by Paytm
                                          paramarray["TXN_AMOUNT"] = price.toString(); // transaction amount
                                          paramarray["WEBSITE"] = process.env.WEBSITE; //Provided by Paytm
                                          paramarray["CALLBACK_URL"] =
                                            "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" +
                                            result.insertId; //Provided by Paytm
                                          paramarray["EMAIL"] = user[0].email; // customer email id
                                          // paramarray["EMAIL"] = "pmdhankecha.18@gmail.com"; // customer email id
                                          paramarray["MOBILE_NO"] = user[0].mobile1; // customer 10 digit mobile no.
                                          paytm_checksum.genchecksum(
                                            paramarray,
                                            paytm_config.MERCHANT_KEY,
                                            function(err, checksum) {
                                              console.log(checksum);
                                              console.log(
                                                "Checksum: ",
                                                JSON.stringify(checksum),
                                                "\n"
                                              );
                                              res.status(200).json({
                                                status: "1",
                                                message: "Checksum generated successfully.",
                                                checksum: checksum,
                                                order_id: result.insertId.toString(),
                                                mid: process.env.MID,
                                                cust_id: req.userId.toString(),
                                                industry_type_id: process.env.INDUTYPEID,
                                                channel_id: process.env.CHANNELID,
                                                txn_amount: price.toString(),
                                                website: process.env.WEBSITE,
                                                callback_url:
                                                  "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" +
                                                  result.insertId,
                                                email: user[0].email,
                                                mobile_no: user[0].mobile1
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
                                deleteOrder(order_id);
                                res.status(200).json({
                                  status: "0",
                                  message:
                                    "Order not placed. Your order amount is not eligible for promocode"
                                });
                              }
                            } else {
                              res.status(200).json({
                                status: "0",
                                message: "Please apply valid promocode."
                              });
                            }
                          }
                        });
              }
              
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

router.post("/verify_checksum",auth.verifyToken, (req, res) => {
  var decodedBody = req.body.paytm_token;

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
    let sql =
      "update paytm_details set paytm_order_id='" +
      decodedBody.TXNID +
      "', paytm_response='" +
      JSON.stringify(decodedBody) +
      "', is_completed=1 where id=" +
      decodedBody.ORDERID;
    con.query(sql, (err, data) => {
      if (err) {
        console.log(err);
        sql =
          "insert into refund(paytm_id,amount,response,order_id) values('" +
          decodedBody.TXNID +
          "'," +
          decodedBody.TXNAMOUNT +
          ",'" +
          JSON.stringify(decodedBody) +
          "'," +
          decodedBody.ORDERID +
          ")";
        con.query(sql, (err, data) => {
          if (err) {
            console.log(err);
            res.status(200).json({
              status: "0",
              message:
                "Your order is not completed. Please call in the help center or do communication in chat."
            });
          } else {
            res.status(200).json({
              status: "0",
              message:
                "Your order is not placed. Your transaction amount will be refunded in your account"
            });
          }
        });
      } else {
        sql = "select * from paytm_details where id=" + decodedBody.ORDERID;
        con.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            sql =
              "insert into refund(paytm_id,amount,res,order_id) values('" +
              decodedBody.TXNID +
              "'," +
              decodedBody.TXNAMOUNT +
              ",'" +
              JSON.stringify(decodedBody) +
              "'," +
              decodedBody.ORDERID +
              ")";
            con.query(sql, (err, data) => {
              if (err) {
                console.log(err);
                res.status(200).json({
                  status: "0",
                  message:
                    "Your order is not completed. Please call in the help center or do communication in chat."
                });
              } else {
                res.status(200).json({
                  status: "0",
                  message:
                    "Your order is not placed. Your transaction amount will be refunded in your account"
                });
              }
            });
          } else {
            sql =
              "select c.item_id,c.quantity as cart_quantity,c.mobile_required,c.mobile_id,c.added_date as cart_date,v.*,t.tax,p.total_weight,p.dimention_length,p.dimention_breadth,p.dimention_height,p.hsncode,m.quantity as mquantity,m.price as mprice, m.discount as mdiscount from cart c, product_variant v, tax t,product p,variant_mobile m where v.variant_id=m.variant_id and m.mobile_id=c.mobile_id and  p.product_id=v.product_id and v.tax_id=t.tax_id and c.variant_id=v.variant_id and c.cart_id=" +
              req.userId +
              " and c.variant_id=" +
              result[0].variant_id;
            con.query(sql, (err, cart) => {
              if (err) {
                console.log(err);
                sql =
                  "insert into refund(paytm_id,amount,res,order_id) values('" +
                  decodedBody.TXNID +
                  "'," +
                  decodedBody.TXNAMOUNT +
                  ",'" +
                  JSON.stringify(decodedBody) +
                  "'," +
                  decodedBody.ORDERID +
                  ")";
                con.query(sql, (err, data) => {
                  if (err) {
                    console.log(err);
                    res.status(200).json({
                      status: "0",
                      message:
                        "Your order is not completed. Please call in the help center or do communication in chat."
                    });
                  } else {
                    res.status(200).json({
                      status: "0",
                      message:
                        "Your order is not placed. Your transaction amount will be refunded in your account"
                    });
                  }
                });
              } else {
                sql =
                  "insert into customer_order(user_id,address_id,iscod,variant_id,promo_id) values(" +
                  req.userId +
                  "," +
                  req.body.address_id +
                  ",0," +
                  result[0].variant_id +
                  ","+
                  result[0].promo_id+
                  ")";
                con.query(sql, (err, order) => {
                  if (err) {
                    console.log(err);
                    sql =
                      "insert into refund(paytm_id,amount,res,order_id) values('" +
                      decodedBody.TXNID +
                      "'," +
                      decodedBody.TXNAMOUNT +
                      ",'" +
                      JSON.stringify(decodedBody) +
                      "'," +
                      decodedBody.ORDERID +
                      ")";
                    con.query(sql, (err, data) => {
                      if (err) {
                        console.log(err);
                        res.status(200).json({
                          status: "0",
                          message:
                            "Your order is not completed. Please call in the help center or do communication in chat."
                        });
                      } else {
                        res.status(200).json({
                          status: "0",
                          message:
                            "Your order is not placed. Your transaction amount will be refunded in your account"
                        });
                      }
                    });
                  } else {
                    let order_id = order.insertId;
                    let orderdata = {
                      dm_height: 0,
                      dm_length: 0,
                      dm_breadth: 0,
                      total_weight: 0,
                      collectable_amount: 0,
                      taxable_amount: 0,
                      sgst: 0,
                      cgst: 0,
                      igst: 0,
                      order_amount: 0
                    };
                    let queryBit = 0;
                    sql =
                      "insert into order_detail(order_id,variant_id,user_id,variant,quantity,mobile_required,mobile_id) values";
                    for (let i = 0; i < cart.length; i++) {
                      if (
                        (cart[i].mobile_required == 0 &&
                          cart[i].cart_quantity > cart[i].quantity) ||
                        (cart[i].mobile_required == 1 &&
                          cart[i].cart_quantity > cart[i].mquantity)
                      ) {
                        queryBit = 1;
                        deleteOrder(order_id);
                        res.status(200).json({
                          status: "0",
                          message: "Not enough stock to complete your order."
                        });
                        break;
                      } else {
                        orderdata.dm_height =
                          orderdata.dm_height + cart[i].dimention_height;
                        orderdata.dm_length = cart[i].dimention_length;
                        orderdata.dm_breadth = cart[i].dimention_breadth;
                        orderdata.total_weight =
                          orderdata.total_weight + cart[i].total_weight;
                        if (cart[i].mobile_required == 1) {
                          orderdata.collectable_amount =
                            orderdata.collectable_amount +
                            cart[i].mprice * cart[i].cart_quantity;
                        } else {
                          orderdata.collectable_amount =
                            orderdata.collectable_amount +
                            cart[i].price * cart[i].cart_quantity;
                        }

                        cart[i].thumbnail = JSON.parse(cart[i].thumbnail);
                        if (cart[i].thumbnail.length > 0) {
                          cart[i].thumbnail =
                            process.env.THUMBNAIL + cart[i].thumbnail[0];
                        } else {
                          cart[i].thumbnail = "";
                        }
                        cart[i].list_image = "";
                        cart[i].view_image = "";
                        cart[i].main_image = "";
                        sql +=
                          "(" +
                          order_id +
                          "," +
                          cart[i].variant_id +
                          "," +
                          req.userId +
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
                    if (queryBit == 0) {
                      con.query(sql, (err, order_detail) => {
                        if (err) {
                          console.log(err);
                          deleteOrder(order_id);
                          sql =
                            "insert into refund(paytm_id,amount,res,order_id) values('" +
                            decodedBody.TXNID +
                            "'," +
                            decodedBody.TXNAMOUNT +
                            ",'" +
                            JSON.stringify(decodedBody) +
                            "'," +
                            decodedBody.ORDERID +
                            ")";
                          con.query(sql, (err, data) => {
                            if (err) {
                              console.log(err);
                              res.status(200).json({
                                status: "0",
                                message:
                                  "Your order is not completed. Please call in the help center or do communication in chat."
                              });
                            } else {
                              res.status(200).json({
                                status: "0",
                                message:
                                  "Your order is not placed. Your transaction amount will be refunded in your account"
                              });
                            }
                          });
                        } else {
                          orderdata.order_amount = orderdata.collectable_amount;
                          orderdata.collectable_amount = 0;
                          orderdata.taxable_amount =
                            (orderdata.collectable_amount * cart[0].tax) /
                            (100 + cart[0].tax);
                          orderdata.cgst = orderdata.taxable_amount / 2;
                          orderdata.sgst = orderdata.taxable_amount / 2;
                          orderdata.igst = 0;
                          orderdata.taxable_amount =
                            orderdata.collectable_amount -
                            orderdata.taxable_amount;
                          sql =
                            "update customer_order set collectable_amount=" +
                            orderdata.collectable_amount +
                            ", total_weight=" +
                            orderdata.total_weight +
                            ", dm_length=" +
                            orderdata.dm_length +
                            ", dm_breadth=" +
                            orderdata.dm_breadth +
                            ", dm_height=" +
                            orderdata.dm_height +
                            ", taxable_value=" +
                            orderdata.taxable_amount +
                            ",sgst=" +
                            orderdata.sgst +
                            ", cgst=" +
                            orderdata.cgst +
                            ", igst=" +
                            orderdata.igst +
                            ",order_amount=" +
                            orderdata.order_amount +
                            " where order_id=" +
                            order_id;
                          con.query(sql, (err, orderinfo) => {
                            if (err) {
                              console.log(err);
                              deleteOrder(order_id);
                              sql =
                                "insert into refund(paytm_id,amount,res,order_id) values('" +
                                decodedBody.TXNID +
                                "'," +
                                decodedBody.TXNAMOUNT +
                                ",'" +
                                JSON.stringify(decodedBody) +
                                "'," +
                                decodedBody.ORDERID +
                                ")";
                              con.query(sql, (err, data) => {
                                if (err) {
                                  console.log(err);
                                  res.status(200).json({
                                    status: "0",
                                    message:
                                      "Your order is not completed. Please call in the help center or do communication in chat."
                                  });
                                } else {
                                  res.status(200).json({
                                    status: "0",
                                    message:
                                      "Your order is not placed. Your transaction amount will be refunded in your account"
                                  });
                                }
                              });
                            } else {
                              for (let i = 0; i < cart.length; i++) {
                                if (cart[i].mobile_required == 1) {
                                  sql =
                                    "update variant_mobile set quantity=quantity-" +
                                    cart[i].cart_quantity +
                                    " where  variant_id=" +
                                    cart[i].variant_id;
                                  con.query(sql, (err, result) => {});
                                  sql =
                                    "update product_variant set order_count=order_count+" +
                                    cart[i].cart_quantity +
                                    " where variant_id=" +
                                    cart[i].variant_id;
                                } else {
                                  sql =
                                    "update product_variant set quantity=quantity-" +
                                    cart[i].cart_quantity +
                                    ", order_count=order_count+" +
                                    cart[i].cart_quantity +
                                    " where variant_id=" +
                                    cart[i].variant_id +
                                    ";";
                                }
                                con.query(sql, (err, result) => {});
                              }
                              sql =
                                "insert into track_detail(item_id,status_id) values(" +
                                order_id +
                                ",0)";
                              con.query(sql);
                              sql =
                                "delete from cart where cart_id=" +
                                req.userId +
                                " and variant_id=" +
                                result[0].variant_id;
                              con.query(sql, (err, result) => {
                                console.log(err);
                                res.status(200).json({
                                  status: 1,
                                  message: "Order placed successfully."
                                });
                              });
                            }
                          });
                        }
                      });
                    } else {
                      deleteOrder(order_id);
                      sql =
                        "insert into refund(paytm_id,amount,res,order_id) values('" +
                        decodedBody.TXNID +
                        "'," +
                        decodedBody.TXNAMOUNT +
                        ",'" +
                        JSON.stringify(decodedBody) +
                        "'," +
                        decodedBody.ORDERID +
                        ")";
                      con.query(sql, (err, data) => {
                        if (err) {
                          console.log(err);
                          res.status(200).json({
                            status: "0",
                            message:
                              "Your order is not completed. Please call in the help center or do communication in chat."
                          });
                        } else {
                          res.status(200).json({
                            status: "0",
                            message:
                              "Your order is not placed. Your transaction amount will be refunded in your account"
                          });
                        }
                      });
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
    sql = "select * from paytm_details where id=" + decodedBody.ORDERID;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  } else {
    console.log("Checksum Verification => false");
    res.json({ status: "Checksum Verification => false" });
  }
  // if checksum is validated Kindly verify the amount and status
  // if transaction is successful
  // kindly call Paytm Transaction Status API and verify the transaction amount and status.
  // If everything is fine then mark that transaction as successful into your DB.
});

function deleteOrder(order_id) {
  let sql = "delete from customer_order where order_id=" + order_id;
  con.query(sql, (err, data) => {});
}

function htmlEscape(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
module.exports = router;
