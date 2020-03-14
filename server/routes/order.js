const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  check,
  validationResult,
  sanitizeParam,
  param
} = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;
const notification = require("../client/send-notification");

/** Verify the user token */

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized Request! Header Not Found");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized Request! Token Not Found");
  }
  let payload = jwt.verify(token, "MysupersecreteKey");

  if (!payload) {
    return res.status(401).send("Unauthorized Request! Token is not Correct");
  }
  req.userId = payload.subject;
  next();
}

router.post("/get-orders-by-status", verifyToken, (req, res) => {
  let sql =
    "select o.*,v.name,v.thumbnail from customer_order o, product_variant v where o.status_id=" +
    req.body.status +
    " and o.variant_id=v.variant_id and date(added_date) BETWEEN '" +
    req.body.start +
    "' AND '" +
    req.body.end +
    "' order by o.added_date desc limit " +
    req.body.pageno * limit +
    "," +
    limit;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({ status: 400, message: "Orders not found." });
    } else {
      sql =
        "select count(order_id) as total from customer_order where status_id=" +
        req.body.status;
      con.query(sql, (err, count) => {
        if (err) {
          res.status(200).json({ status: 400, message: "Orders not found" });
        } else {
          res.status(200).json({
            status: 200,
            message: "Getting order by status successfully.",
            data: result,
            count: count[0].total
          });
        }
      });
    }
  });
});

router.post("/get-return-orders", verifyToken, (req, res) => {
  let sql =
    "select o.*,v.name,v.thumbnail,r.reason,r.image,r.item_id,r.added_date as request_date,r.type,r.is_accepted,r.is_paid from customer_order o, product_variant v, return_request r where o.order_id=r.order_id and o.variant_id=v.variant_id order by r.added_date limit " +
    req.body.pageno * limit +
    "," +
    limit;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: 200, message: "No return request found." });
    } else {
      let sql = "select count(*) as total from  return_request";
      con.query(sql, (err, count) => {
        if (err) {
          console.log(err);
          res.json({ status: 400, message: "No return request found." });
        } else {
          res.json({
            status: 200,
            message: "Getting return request successfully.",
            data: result,
            count: count[0].total
          });
        }
      });
    }
  });
});

router.post("/accept-return-order", verifyToken, (req, res) => {
  let data = req.body;
  let order_id;
  if (data.type == 1) {
    let sql = "select * from  customer_order where order_id=" + data.order_id;
    con.query(sql, (err, order) => {
      if (err) {
        res.json({ status: 400, message: "Order is not accepted." });
      } else {
        sql = "select * from order_detail where order_id=" + data.order_id;
        con.query(sql, (err, details) => {
          if (err) {
            console.log(err);
            res.json({ status: 400, message: "Order is not accepted." });
          } else {
            if (order && order.length > 0) {
              order = order[0];
              sql =
                "insert into customer_order(user_id,address_id,status_id,iscod,collectable_amount,order_amount,total_weight,dm_length,dm_breadth,dm_height,taxable_value,cgst,sgst,igst) values(" +
                order.user_id +
                "," +
                order.address_id +
                ",0,2,0," +
                order.order_amount +
                "," +
                order.total_weight +
                "," +
                order.dm_length +
                "," +
                order.dm_breadth +
                "," +
                order.dm_height +
                "," +
                order.taxable_value +
                "," +
                order.cgst +
                "," +
                order.sgst +
                "," +
                order.igst +
                ")";
              con.query(sql, (err, insertedOrder) => {
                if (err) {
                  console.log(err);
                  res.json({ status: 400, message: "Order is not accepted." });
                } else {
                  order_id = insertedOrder.insertId;
                  for (let detail of details) {
                    let product = JSON.parse(detail.variant);
                    let diff =
                      (new Date() - new Date(detail.added_date)) /
                      (1000 * 60 * 60 * 24);
                    product.warranty = product.warranty - diff;
                    let sql =
                      "insert into order_detail(order_id,variant_id,user_id,variant,attributes,quantity,mobile_required,mobile_id,promocode) values(" +
                      order_id +
                      "," +
                      detail.variant_id +
                      "," +
                      detail.user_id +
                      ",'" +
                      JSON.stringify(product) +
                      "','" +
                      detail.attributes +
                      "'," +
                      detail.quantity +
                      "," +
                      detail.mobile_required +
                      "," +
                      detail.mobile_id +
                      "," +
                      detail.promocode +
                      ")";
                    con.query(sql);
                  }
                  let sql =
                    "update return_request set is_accepted=1 where order_id=" +
                    data.order_id;
                  con.query(sql, (err, result) => {
                    if (err) {
                      console.log(err);
                      deleteOrder(order_id);
                      res.json({
                        status: 400,
                        message: "Order is not accepted."
                      });
                    } else {
                      res.json({
                        status: 200,
                        message: "Order accepted successfully."
                      });
                    }
                  });
                }
              });
            } else {
            }
          }
        });
      }
    });
  } else {
    let sql =
      "update return_request set is_accepted=1 where order_id=" + data.order_id;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.json({ status: 400, message: "Order is not accepted." });
      } else {
        res.json({ status: 200, message: "Order accepted successfully." });
      }
    });
  }
});

function deleteOrder(order_id) {
  let sql = "delete from customer_order where order_id=" + order_id;
  con.query(sql);
}

router.post("/paid-return-order", verifyToken, (req, res) => {
  let data = req.body;
  let sql =
    "update return_request set is_paid=1 where order_id=" + data.order_id;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "Order is not paid." });
    } else {
      res.json({ status: 200, message: "Order paid successfully." });
    }
  });
});

router.post("/change-status", verifyToken, (req, res) => {
  let order = req.body;
  if (order.status == 2) {
    bookShipment(order, res);
  } else {
    changeStatus(res, order);
  }
});

function bookShipment(order, res) {
  let sql =
    "select o.*,o.added_date as order_date,v.*,a.* from customer_order o, product_variant v, customer_address a where o.order_id=" +
    order.order_id +
    " and o.variant_id=v.variant_id and a.address_id=o.address_id";
  console.log(sql);
  con.query(sql, (err, orderdata) => {
    if (err) {
      console.log(err);
      res
        .status(200)
        .json({ status: 400, message: "Order status not changed." });
    } else {
      if (orderdata.length > 0) {
        orderdata = orderdata[0];
        let orderDate = new Date(orderdata.order_date);
        orderDate =
          orderDate.getFullYear() +
          "-" +
          (orderDate.getMonth() + 1) +
          "-" +
          orderDate.getDate();
        if (!orderdata.total_weight || orderDate.total_weight <= 0) {
          orderdata.total_weight = 0.05;
        }
        let shipment = {
          InvoiceNo: order.order_id.toString(),
          PickupCode: "1",
          ShowDiffrenceSender: "Yes",
          SenderName: "Prince Mobile",
          SenderMobile: "9737156066",
          CustomerEmail: orderdata.email,
          Breadth: "12",
          Height: "4",
          ShipPartnerCode: "Auto",
          SellerGSTNo: "123456789123",
          SupplySellerStatePlace: "Gujarat",
          BuyerGSTNo: "",
          EwayBillSrNumber: "",
          HSNCode: "",
          TaxableValue: "",
          SGSTAmount: "0",
          CGSTAmount: "0",
          IGSTAmount: "0",
          Discount: "0",
          GSTTaxRateSGSTN: "0",
          GSTTaxRateCGSTN: "0",
          GSTTaxRateIGSTN: "0",
          GSTTaxTotal: "0",
          CustomerFirstName: orderdata.first_name,
          CustomerLastName: orderdata.last_name,
          CustomerAddress1: orderdata.flatno,
          CustomerAddress2: orderdata.colony,
          CustomerAddress3: orderdata.landmark,
          CustomerPincode: orderdata.pincode,
          CustomerCity: orderdata.city,
          CustomerState: orderdata.state,
          CustomerMobile: orderdata.mobile,
          Weight: orderdata.total_weight,
          Length: "18",
          ProductDetail: orderdata.name,
          InvoiceAmount: orderdata.order_amount.toString(),
          CollectableAmount: orderdata.collectable_amount.toString(),
          CheckoutMode: "Auto",
          IsSellerRegUnderGST: "No",
          InvoiceDate: orderDate
        };

        if (orderdata.iscod == 1) {
          shipment.PaymentType = "COD";
        } else {
          shipment.PaymentType = "Prepaid";
        }
        console.log(shipment);
        let http = require("https");
        let options = {
          host: process.env.ZIPPINGBASEURL,
          path: "/Api/BookShipment",
          body: {
            oauth: {
              username: process.env.ZIPPINGUNAME,
              key: process.env.ZIPPINGPASS,
              version: "1"
            },
            ManifestDetails: shipment
          },
          method: "POST",
          headers: {
            "content-type": "application/json",
            accept: "application/json"
          },
          json: true
        };
        let Request = require("request");
        Request(
          "https://sandbox.zipping.in/Api/BookShipment",
          options,
          (err, response, body) => {
            console.log(body);
            let resData = JSON.parse(body.trim());
            console.log(resData);
            if (resData.Msg == "Success") {
              sql = `update customer_order set shipment_id='${resData.Result[0].ShipmentId}', awbno='${resData.Result[0].AWBNO}' where order_id=${order.order_id}`;
              con.query(sql);
              changeStatus(res, order);
            } else {
              console.log(resData);
              res.json({
                status: 400,
                message: "Order not dispatched." + resData.Error[0]
              });
            }
          }
        );
      } else {
        res
          .status(200)
          .json({ status: 400, message: "Order status not changed" });
      }
    }
  });
}

function returnBookShipment(order, res) {
  let sql =
    "select o.*,o.added_date as order_date,v.*,a.* from customer_order o, product_variant v, customer_address a where o.order_id=" +
    order.order_id +
    " and o.variant_id=v.variant_id and a.address_id=o.address_id";
  console.log(sql);
  con.query(sql, (err, orderdata) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "Order not accepted." });
    } else {
      if (orderdata.length > 0) {
        orderdata = orderdata[0];
        let orderDate = new Date(orderdata.order_date);
        orderDate =
          orderDate.getFullYear() +
          "-" +
          (orderDate.getMonth() + 1) +
          "-" +
          orderDate.getDate();
        if (!orderdata.total_weight || orderDate.total_weight <= 0) {
          orderdata.total_weight = 0.05;
        }
        let shipment = {
          InvoiceNo: order.order_id.toString(),
          PickupCode: order.pickupCode.toString(),
          ShowDiffrenceSender: "Yes",
          SenderName: "Prince Mobile",
          SenderMobile: "9737156066",
          CustomerEmail: orderdata.email,
          Breadth: "12",
          Height: "4",
          ShipPartnerCode: "Auto",
          SellerGSTNo: "123456789123",
          SupplySellerStatePlace: "Gujarat",
          BuyerGSTNo: "",
          EwayBillSrNumber: "",
          HSNCode: "",
          TaxableValue: "",
          SGSTAmount: "0",
          CGSTAmount: "0",
          IGSTAmount: "0",
          Discount: "0",
          GSTTaxRateSGSTN: "0",
          GSTTaxRateCGSTN: "0",
          GSTTaxRateIGSTN: "0",
          GSTTaxTotal: "0",
          CustomerFirstName: orderdata.first_name,
          CustomerLastName: orderdata.last_name,
          CustomerAddress1: orderdata.flatno,
          CustomerAddress2: orderdata.colony,
          CustomerAddress3: orderdata.landmark,
          CustomerPincode: orderdata.pincode,
          CustomerCity: orderdata.city,
          CustomerState: orderdata.state,
          CustomerMobile: orderdata.mobile,
          Weight: orderdata.total_weight,
          Length: "18",
          ProductDetail: orderdata.name,
          InvoiceAmount: orderdata.order_amount,
          CollectableAmount: orderdata.collectable_amount,
          CheckoutMode: "Auto",
          IsSellerRegUnderGST: "No",
          InvoiceDate: orderDate
        };

        if (orderdata.iscod == 1) {
          shipment.PaymentType = "COD";
        } else {
          shipment.PaymentType = "Prepaid";
        }
        console.log(shipment);
        let http = require("https");
        let options = {
          host: process.env.ZIPPINGBASEURL,
          path: "/Api/BookShipment",
          body: {
            oauth: {
              username: process.env.ZIPPINGUNAME,
              key: process.env.ZIPPINGPASS,
              version: "1"
            },
            ManifestDetails: shipment
          },
          method: "POST",
          headers: {
            "content-type": "application/json",
            accept: "application/json"
          },
          json: true
        };
        let Request = require("request");
        Request(
          "https://sandbox.zipping.in/Api/BookShipment",
          options,
          (err, response, body) => {
            console.log(body);
            let resData = JSON.parse(body.trim());
            if (resData.Msg == "Success") {
              sql = `update customer_order set shipment_id='${resData.Result[0].ShipmentId}', awbno='${resData.Result[0].AWBNO}' where order_id=${order.order_id}`;
              con.query(sql);
              changeStatus(res, order);
            } else {
              res.json({
                status: 400,
                message: "Order not dispatched." + resData.Error[0]
              });
            }
          }
        );
      } else {
        res
          .status(200)
          .json({ status: 400, message: "Order status not changed" });
      }
    }
  });
}

function changeStatus(res, order) {
  let sql =
    "update customer_order set status_id=" +
    order.status +
    " where order_id=" +
    order.order_id;
  con.query(sql, (err, result) => {
    if (err) {
      res
        .status(200)
        .json({ status: 400, message: "Order status not changed" });
    } else {
      sql =
        "insert into track_detail(item_id,status_id) values(" +
        order.order_id +
        "," +
        order.status +
        ")";
      con.query(sql, (err, result) => {
        if (err) {
          res.status(200).json({ status: 400, message: "Status not changed" });
        } else {
          sql = "select * from order_detail where order_id=" + order.order_id;
          con.query(sql, (err, result) => {
            if (result && result.length > 0) {
              notification.sendOrderStatusNotification(
                order.status,
                order.user_id,
                order.order_id,
                result[0].item_id
              );
            }
          });

          res
            .status(200)
            .json({ status: 200, message: "Status changed successfully." });
        }
      });
    }
  });
}

router.post("/get-order-detail", verifyToken, (req, res) => {
  let order_id = req.body.order_id;
  if (isNaN(order_id)) {
    res.json({ status: 400, message: "Enter valid order id" });
  } else {
    let sql =
      "select o.*,a.* from customer_order o, customer_address a where o.order_id=" +
      order_id +
      " and a.address_id=o.address_id";
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(200)
          .json({ status: 400, message: "Order detail not found" });
      } else {
        sql =
          "select d.*, m.model_name from order_detail d,mobile_models m where d.order_id=" +
          order_id +
          " and m.model_id=d.mobile_id";
        con.query(sql, (err, order_detail) => {
          if (err) {
            res.json({ status: 400, message: "Order details not found." });
          } else {
            sql =
              "select p.* from promocode p, customer_order o where p.id=o.promo_id and o.order_id=" +
              order_id;
            con.query(sql, (err, promo) => {
              if (err) {
                console.log(err);
              }
              res.json({
                status: 200,
                message: "Getting order detail successfully.",
                order: result,
                order_detail: order_detail,
                promocode: promo
              });
            });
          }
        });
      }
    });
  }
});

router.get("/get-order-count", verifyToken, (req, res) => {
  let sql =
    "select count(order_id) as count from customer_order where status_id=0";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "Count not found." });
    } else {
      sql =
        "select count(vm.variant_id) as count from variant_mobile vm,product_variant v where vm.variant_id=v.variant_id and  vm.quantity<v.min_qty";
      con.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          res.json({ status: 400, message: "Count not found." });
        } else {
          res.json({
            status: 200,
            message: "Getting order count successfully",
            data: result,
            quantity: data
          });
        }
      });
    }
  });
});

module.exports = router;
