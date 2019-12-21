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
    check("variant_id").isNumeric(),
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
            "select c.item_id,c.quantity as cart_quantity,c.mobile_required,c.mobile_id,c.added_date as cart_date,v.*,t.tax,p.total_weight,p.dimention_length,p.dimention_breadth,p.dimention_height,p.hsncode,m.quantity as mquantity,m.price as mprice, m.discount as mdiscount from cart c, product_variant v, tax t,product p,variant_mobile m where v.variant_id=m.variant_id and m.mobile_id=c.mobile_id and  p.product_id=v.product_id and v.tax_id=t.tax_id and c.variant_id=v.variant_id and c.cart_id=" +
            req.userId +
            " and c.variant_id=" +
            req.body.variant_id;
          con.query(sql, (err, cart) => {
            if (err) {
              deleteOrder(order_id);
              res.status(200).json({
                status: "0",
                message: "Order not placed. Select valid products."
              });
            } else {
              if (cart.length > 0) {
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
                      orderdata.order_amount = orderdata.collectable_amount;
                      if (data.iscod == 0) {
                        orderdata.collectable_amount = 0;
                      }
                      orderdata.taxable_amount =
                        (orderdata.collectable_amount * cart[0].tax) /
                        (100 + cart[0].tax);
                      orderdata.cgst = orderdata.taxable_amount / 2;
                      orderdata.sgst = orderdata.taxable_amount / 2;
                      orderdata.igst = 0;
                      orderdata.taxable_amount =
                        orderdata.collectable_amount - orderdata.taxable_amount;
                      if(req.body.iscod==1){
                        orderdata.collectable_amount=orderdata.collectable_amount+50;
                      }
                      if(data.promo_id==0){
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
                          res.status(200).json({
                            status: "0",
                            message:
                              "Order is not placed. Try again later."
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
                            "delete from cart where cart_id=" +
                            req.userId +
                            " and variant_id=" +
                            req.body.variant_id;
                          con.query(sql, (err, result) => {
                            res.status(200).json({
                              status: 1,
                              message: "Order placed successfully."
                            });
                          });
                        }
                      });
                      } else {
                        sql = "select * from promocode where id=" + data.promo_id;
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
                              if (promo[0].min_limit <= orderdata.order_amount) {
                                let discount;
                                if (promo[0].discount_type == 1) {
                                  discount = promo[0].max_discount;
                                } else {
                                  discount =
                                    (orderdata.order_amount * promo[0].discount) /
                                    100;
                                  if (discount > promo[0].max_discount) {
                                    discount = promo[0].max_discount;
                                  }
                                }
                                orderdata.order_amount =
                                  orderdata.order_amount - discount;
                                
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
                                    res.status(200).json({
                                      status: "0",
                                      message:
                                        "Order is not placed. Try again later."
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
                                      "delete from cart where cart_id=" +
                                      req.userId +
                                      " and variant_id=" +
                                      req.body.variant_id;
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
                     
                    }
                  });
                }
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

router.post(
  "/order-detail",
  [check("item_id").isNumeric()],
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
      let item = req.body.item_id;
      let sql =
        "select co.*,od.*,ca.*,s.status from customer_order co,order_detail od,customer_address ca,status s where od.item_id=" +
        item +
        " and co.order_id=od.order_id and co.address_id=ca.address_id and s.id=co.status_id";
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res
            .status(200)
            .json({ status: "0", message: "Order detail not found." });
        } else {
          result = result[0];
          let data = {
            order_id: result.order_id,
            iscod: result.iscod,
            add1: result.add1,
            add2: result.add2,
            add3: result.add3,
            landmark: result.landmark,
            city: result.city,
            state: result.state,
            pincode: result.pincode,
            shipadd1: result.add1,
            shipadd2: result.add2,
            shipadd3: result.add3,
            shiplandmark: result.landmark,
            shipcity: result.city,
            shipstate: result.state,
            shippincode: result.pincode,
            status: result.status,
            estimate_date: "",
            added_date: result.added_date
          };
          let product = JSON.parse(result.variant);
          data.quantity = product.cart_quantity;
          data.name = product.name;
          data.price = product.price;
          data.sold_by = "MS WORLD";
          data.image = product.thumbnail;
          data.postage_packing = 0.0;
          let mrp =
            product.price * product.cart_quantity -
            (product.price * product.cart_quantity * product.tax) /
              (100 + product.tax);
          data.items = mrp.toFixed(2);
          data.taxable_amount = mrp.toFixed(2);

          data.tax = ((mrp * product.tax) / 100).toFixed(2);
          data.total = (
            Number.parseInt(data.taxable_amount) + Number.parseInt(data.tax)
          ).toFixed(2);

          let json = JSON.stringify(data);
          data = JSON.parse(json, (key, val) =>
            typeof val !== "object" && val !== null ? String(val) : val
          );
          res.status(200).json({
            status: "1",
            message: "Getting order detail successfully.",
            order_detail: data
          });
        }
      });
    }
  }
);

// 0  - For getting on transist orders
// 5  - For getting cancelled orders
// -1 - For all orders
// 6- For return orders

router.post(
  "/get-all-order",
  [check("status").isNumeric()],
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
      let sql;
      let id = req.userId;
      if (req.body.status >= 0 && req.body.status < 4) {
        sql =
          "select d.*,o.status_id from order_detail d,customer_order o  where o.order_id=d.order_id and d.status_id<4 and d.user_id= " +
          req.userId +
          " order by d.added_date desc";
      } else {
        if (req.body.status == 6) {
          sql =
            "select d.*,o.status_id from return_order_detail d,customer_order o  where o.order_id=d.order_id and  d.status_id=" +
            req.body.status +
            " and d.user_id=" +
            req.userId +
            " order by d.added_date desc";
        } else {
          sql =
            "select d.*,o.status_id from order_detail d,customer_order o  where o.order_id=d.order_id and  d.status_id=" +
            req.body.status +
            " and d.user_id=" +
            req.userId +
            " order by d.added_date desc";
        }
      }
      if (req.body.status == -1) {
        sql =
          "select d.*,o.status_id from order_detail d, customer_order o where o.order_id=d.order_id and d.user_id=" +
          req.userId +
          " order by d.added_date desc";
      }
      if (req.body.status)
        con.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            res.status(200).json({ status: "0", message: "No Orders found." });
          } else {
            sql = "select * from status";
            con.query(sql, (err, statusdata) => {
              if (err) {
                res
                  .status(200)
                  .json({ status: "0", message: "No orders found" });
              } else {
                let data = new Array();
                let order;
                let json;
                for (let i = 0; i < result.length; i++) {
                  order = {
                    order_id: result[i].order_id,
                    item_id: result[i].item_id,
                    status: statusdata.find(
                      item => item.id == result[i].status_id
                    ).status
                  };
                  json = JSON.parse(result[i].variant.toString());
                  order.name = json.name;
                  order.image = json.thumbnail;
                  data.push(order);
                }
                json = JSON.stringify(data);
                data = JSON.parse(json, (key, val) =>
                  typeof val !== "object" && val !== null ? String(val) : val
                );
                res.status(200).json({
                  status: "1",
                  message: "Getting Order list successfully.",
                  data: data
                });
              }
            });
          }
        });
    }
  }
);

router.post(
  "/track-order",
  [check("item_id").isNumeric()],
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
      let item_id = req.body.item_id;
      let sql = "select * from track_order where item_id=" + item_id;
      con.query(sql, (err, result) => {
        if (err) {
          console.log("err");
          res.status(200).json({ status: "0", message: "Order not tracked." });
        } else {
          sql = "select * from track_detail where item_id=" + item_id;
          con.query(sql, (err, trackdata) => {
            if (err) {
              console.log(er);
              res
                .status(200)
                .json({ status: "0", message: "Order not tracked." });
            } else {
              for (let i = 0; i < 5; i++) {
                if (i < trackdata.length) {
                  trackdata[i].status = 1;
                } else {
                  trackdata[i] = {
                    id: i,
                    item_id: trackdata[0].item_id,
                    status_id: i + 1,
                    added_date: new Date(),
                    status: 0
                  };
                }
              }
              let json = JSON.stringify(result);
              result = JSON.parse(json, (key, val) =>
                typeof val !== "object" && val !== null ? String(val) : val
              );
              json = JSON.stringify(trackdata);
              trackdata = JSON.parse(json, (key, val) =>
                typeof val !== "object" && val !== null ? String(val) : val
              );
              res.status(200).json({
                status: "1",
                message: "Getting status detail successfully.",
                track_data: result,
                track_detail: trackdata
              });
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
