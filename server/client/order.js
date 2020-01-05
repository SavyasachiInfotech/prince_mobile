const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;
const path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../assets/return"));
  },
  filename: (req, file, cb) => {
    file.originalname = new Date().getTime() + file.originalname;
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
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
        "insert into customer_order(user_id,address_id,promo_id,iscod,variant_id) values(" +
        req.userId +
        "," +
        data.address_id +
        "," +
        data.promo_id +
        "," +
        data.iscod +
        "," +
        data.variant_id +
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
                      if (req.body.iscod == 1) {
                        orderdata.collectable_amount =
                          orderdata.collectable_amount + 50;
                      }
                      if (data.promo_id == 0) {
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
                              message: "Order is not placed. Try again later."
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
                            con.query(sql, (err, data) => {
                              console.log(err);
                            });
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
                        sql =
                          "select * from promocode where id=" + data.promo_id;
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
                                promo[0].min_limit <= orderdata.order_amount
                              ) {
                                let discount;
                                if (promo[0].discount_type == 1) {
                                  discount = promo[0].max_discount;
                                } else {
                                  discount =
                                    (orderdata.order_amount *
                                      promo[0].discount) /
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
                                      "insert into track_detail(item_id,status_id) values(" +
                                      order_id +
                                      ",0)";
                                    con.query(sql, (err, data) => {
                                      console.log(err);
                                    });
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
        "select co.*,od.*,ca.*,s.status,v.image_required from customer_order co,order_detail od,product_variant v,customer_address ca,status s where od.item_id=" +
        item +
        " and od.variant_id=v.variant_id and co.order_id=od.order_id and co.address_id=ca.address_id and s.id=co.status_id";
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res
            .status(200)
            .json({ status: "0", message: "Order detail not found." });
        } else {
          if (result.length > 0) {
            result = result[0];
            let data = {
              order_id: result.order_id,
              item_id: item.toString(),
              iscod: result.iscod,
              flatno: result.flatno,
              colony: result.colony,
              landmark: result.landmark,
              city: result.city,
              state: result.state,
              pincode: result.pincode,
              shipflatno: result.flatno,
              shipcolony: result.colony,
              shiplandmark: result.landmark,
              shipcity: result.city,
              shipstate: result.state,
              shippincode: result.pincode,
              status: result.status,
              estimate_date: "",
              added_date: result.added_date
            };
            if (result.status_id < 3) {
              data.is_cancelable = 1;
            } else {
              data.is_cancelable = 1;
            }
            let product = JSON.parse(result.variant);
            let diff =
              (new Date() - new Date(result.added_date)) /
              (1000 * 60 * 60 * 24);
            if (product.warranty <= diff && result.status_id == 4) {
              data.is_replacable = 1;
            } else {
              data.is_replacable = 0;
            }
            if (result.status_id == 4 && result.image_required != 1) {
              data.is_returnable = 1;
            } else {
              data.is_returnable = 0;
            }
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
          } else {
            res
              .status(200)
              .json({ status: "0", message: "Order detail not found" });
          }
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
              console.log(err);
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

/**
 * return_type = > 1. Cancel
 *                 2. Return
 *                 3. Replace
 */

router.post(
  "/cancel-order",
  verifyToken,
  upload.single("avatar"),
  [
    check("order_id").isString(),
    check("item_id").isString(),
    check("reason").isString(),
    check("return_type").isString()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: "0",
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      try {
        let order_id = parseInt(req.body.order_id);
        let item_id = parseInt(req.body.item_id);
        let return_type = parseInt(req.body.return_type);
        let sql, filename;
        switch (return_type) {
          case 1:
            sql =
              "select * from  customer_order where order_id=" +
              order_id +
              " and user_id=" +
              req.userId;
            con.query(sql, (err, result) => {
              if (err) {
                res.json({ status: "0", message: "Please select valid order" });
              } else {
                if (result.length > 0) {
                  if (result[0].status_id <= 2) {
                    sql =
                      "insert into track_detail(item_id,status_id) values(" +
                      order_id +
                      ",7)";
                    con.query(sql);
                    sql =
                      "update customer_order set status_id=7 where order_id=" +
                      order_id;
                    con.query(sql);
                    res.json({
                      status: "1",
                      message: "Order cancelled successfully."
                    });
                  } else {
                    if (result[0].status_id == 7) {
                      res.status(200).json({
                        status: "0",
                        message: "Order is already cancelled"
                      });
                    } else {
                      res.json({
                        status: "0",
                        message:
                          "Order is already shipped, so you can return order at delivery time"
                      });
                    }
                  }
                } else {
                  res.json({ status: "0", message: "Order not found" });
                }
              }
            });
            break;

          case 2:
            //Is_Out_Of_Stock
            filename = "";
            if (req.file.originalname != "") {
              filename = req.file.originalname;
            }
            sql =
              "select * from return_request where order_id=" +
              order_id +
              " and item_id=" +
              item_id;
            con.query(sql, (err, result) => {
              if (err) {
                res.json({
                  status: "0",
                  message: "Order return is not placed"
                });
              } else {
                if (result.length > 0) {
                  try {
                    let fs = require("fs");
                    fs.unlinkSync(
                      path.join(__dirname, "../assets/return" + result[0].image)
                    );
                  } catch (error) {}
                }
                sql =
                  "replace into return_request(order_id,item_id,type,reason,image) values(" +
                  order_id +
                  "," +
                  item_id +
                  ",0,'" +
                  req.body.reason +
                  "','" +
                  filename +
                  "')";
                con.query(sql, (err, data) => {
                  if (err) {
                    res.status(200).json({
                      status: "0",
                      message: "Your order return request already placed."
                    });
                  } else {
                    sql =
                      "update customer_order set status_id=9 where order_id=" +
                      order_id;
                    con.query(sql);
                    res.status(200).json({
                      status: "1",
                      message: "Order return request is placed successfully"
                    });
                  }
                });
              }
            });
            break;

          case 3:
            filename = "";
            if (req.file.originalname != "") {
              filename = req.file.originalname;
            }
            sql =
              "select * from return_request where order_id=" +
              order_id +
              " and item_id=" +
              item_id;
            con.query(sql, (err, result) => {
              if (err) {
                res.json({
                  status: "0",
                  message: "Order replace is not placed"
                });
              } else {
                if (result.length > 0) {
                  try {
                    let fs = require("fs");
                    fs.unlinkSync(
                      path.join(
                        __dirname,
                        "../../dist/admin/assets/return" + result[0].image
                      )
                    );
                  } catch (error) {}
                }
                sql =
                  "replace into return_request(order_id,item_id,type,reason,image) values(" +
                  order_id +
                  "," +
                  item_id +
                  ",1,'" +
                  req.body.reason +
                  "','" +
                  filename +
                  "')";
                con.query(sql, (err, data) => {
                  if (err) {
                    res.status(200).json({
                      status: "0",
                      message: "Your order replace request already placed."
                    });
                  } else {
                    sql =
                      "update customer_order set status_id=10 where order_id=" +
                      order_id;
                    con.query(sql);
                    res.status(200).json({
                      status: "1",
                      message: "Order replace request is placed successfully"
                    });
                  }
                });
              }
            });
            break;

          default:
            res.json({
              status: "0",
              message: "Please provide valid return_type"
            });
            break;
        }
      } catch (error) {
        console.log(error);
        res.json({ status: "0", message: "Please provide valid data" });
      }
    }
  }
);

function deleteOrder(order_id) {
  let sql = "delete from customer_order where order_id=" + order_id;
  con.query(sql, (err, data) => {});
}

module.exports = router;
