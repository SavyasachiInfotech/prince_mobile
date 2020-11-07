const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const axios = require('axios');
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
      return res.status(200).json({ status: 400, message: "Orders not found." });
    } else {
      sql =
        "select count(order_id) as total from customer_order where status_id=" +
        req.body.status +
        " and date(added_date) BETWEEN '" +
        req.body.start +
        "' AND '" +
        req.body.end +
        "'";
      con.query(sql, (err, count) => {
        if (err) {
          return res.status(200).json({ status: 400, message: "Orders not found" });
        } else {
          return res.status(200).json({
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

router.post("/sell-report-data", verifyToken, (req, res) => {
  let sql =
    "select o.*,v.name,v.thumbnail from customer_order o, product_variant v where o.status_id=" +
    req.body.status +
    " and o.variant_id=v.variant_id and date(added_date) BETWEEN '" +
    req.body.start +
    "' AND '" +
    req.body.end +
    "' order by o.added_date";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(error);
      return res.status(200).json({ status: 400, message: "Orders not found" });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Getting sell report data successfully.",
        data: result
      });
    }
  });
});

router.post("/get-return-orders", verifyToken, (req, res) => {
  let sql =
    "select o.*,v.name,v.thumbnail,rr.reason,r.image,r.item_id,r.added_date as request_date,r.type,r.is_accepted,r.is_paid from customer_order o, product_variant v, return_request r,return_reason rr where o.order_id=r.order_id and r.reason=rr.id and o.variant_id=v.variant_id order by r.added_date limit " +
    req.body.pageno * limit +
    "," +
    limit;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ status: 200, message: "No return request found." });
    } else {
      let sql = "select count(*) as total from  return_request";
      con.query(sql, (err, count) => {
        if (err) {
          console.log(err);
          return res.json({ status: 400, message: "No return request found." });
        } else {
          return res.json({
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
  if (data.type == 1 || data.type == 0) {
    con.query("select o.order_id,a.* from customer_order o, customer_address a where o.order_id=" + data.order_id + " and a.address_id=o.address_id", (err, address) => {
      if (err) {
        console.log(err);
        return res.json({ status: 400, message: "Order is not accepted." });
      } else {
        let zipping_address_id;
        console.log(address);
        address = address[0];
        if (address.zipping_address_id == 0) {
          let body = {
            oauth: {
              username: process.env.ZIPPINGUNAME,
              key: process.env.ZIPPINGPASS,
              version: "1"
            },
            Manifest: {
              "FirstName": address.first_name,
              "LastName": address.last_name,
              "Mobile": address.mobile.toString(),
              "Email": address.email,
              "Address1": address.flatno,
              "Address2": address.colony,
              "Address3": address.landmark,
              "Pincode": address.pincode,
              "City": address.city,
              "State": address.state,
              "Country": "India"
            }
          };
          let options = {
            host: process.env.ZIPPINGBASEURL,
            path: "/Api/CreatePickupAddress",
            body: body,
            method: "POST",
            headers: {
              "content-type": "application/json",
              accept: "application/json"
            },
            json: true
          };
          console.log(body);
          let Request = require("request");
          Request(
            `https://${process.env.ZIPPINGBASEURL}/Api/CreatePickupAddress`,
            options,
            (err, response, body) => {
              if (err) {
                console.log(err);
                return res.json({ status: 400, message: "Order is not accepted." });
              } else {
                console.log("Body", body);
                let resData = JSON.parse(body.trim());
                if (resData.Msg == "Successful") {
                  zipping_address_id = resData.Result.Result[0].PickupCode;
                  con.query("update customer_address set zipping_address_id=" + zipping_address_id + " where address_id=" + address.address_id);
                  bookReturnOrder(data, res, zipping_address_id);
                } else {

                  return res.json({ status: 400, message: "Order is not accepted." });
                }
              }
            });
        } else {
          zipping_address_id = address.zipping_address_id;
          bookReturnOrder(data, res, zipping_address_id);
        }
      }
    });

    /**
     * iscod status
     * 
     * 0 - paytm
     * 1 - Cod
     * 2 - Get return order
     * 3 - Replaced order
     */
  } else {
    acceptReturnOrder(data, res);
  }
});

function replaceReturnedOrder() {

}

function bookReturnOrder(data, res, zipping_address_id) {
  let sql = "select o.*,a.* from  customer_order o,customer_address a where order_id=" + data.order_id + " and a.address_id=o.address_id";
  con.query(sql, (err, order) => {
    if (err) {
      console.log(err);
      return res.json({ status: 400, message: "Order is not accepted." });
    } else {
      sql = "select * from order_detail where item_id=" + data.item_id;
      con.query(sql, (err, details) => {
        if (err) {
          console.log(err);
          return res.json({ status: 400, message: "Order is not accepted." });
        } else {
          if (order && order.length > 0) {
            let order_id;
            order = order[0];
            sql =
              "insert into customer_order(user_id,address_id,status_id,iscod,collectable_amount,order_amount,total_weight,dm_length,dm_breadth,dm_height,taxable_value,cgst,sgst,igst,variant_id,deliveryCharge) values(" +
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
              "," +
              order.variant_id +
              ",0)";
            con.query(sql, (err, insertedOrder) => {
              if (err) {
                console.log(err);
                return res.json({
                  status: 400,
                  message: "Order is not accepted."
                });
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
                  sql = `update variant_mobile set quantity=quantity+1 where variant_id=${detail.variant_id} and mobile_id=${detail.mobile_id}`
                  con.query(sql);
                }
                let orderDate = new Date();
                orderDate =
                  orderDate.getFullYear() +
                  "-" +
                  ("00" + (orderDate.getMonth() + 1).toString()).substr(-2) +
                  "-" +
                  ("00" + orderDate.getDate()).substr(-2);
                let shipment = {
                  PickupCode: zipping_address_id.toString(),
                  ShowDiffrenceSender: "Yes",
                  SenderName: order.first_name + " " + order.last_name,
                  SenderMobile: order.mobile.toString(),
                  CustomerEmail: order.email,
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
                  CustomerFirstName: "Mehulbhai",
                  CustomerLastName: "Senta",
                  CustomerAddress1: "Shopno-6, Momai Chamber, Labheshwar Chowk",
                  CustomerAddress2: "LH Road, Varachha",
                  CustomerAddress3: "Labheshwar Chowk",
                  CustomerPincode: "395006",
                  CustomerCity: "Surat",
                  CustomerState: "Gujarat",
                  CustomerMobile: "9998613265",
                  Weight: order.total_weight,
                  Length: "18",
                  ProductDetail: "Return replacement",
                  CheckoutMode: "Auto",
                  IsSellerRegUnderGST: "No",
                  InvoiceDate: orderDate,
                  PaymentType: "Prepaid",
                  CollectableAmount: "0",
                  InvoiceAmount: "0",
                  InvoiceNo: order_id
                };
                axios.post(`https://${process.env.ZIPPINGBASEURL}/Api/BookShipment`, {
                  oauth: {
                    username: process.env.ZIPPINGUNAME,
                    key: process.env.ZIPPINGPASS,
                    version: "1"
                  },
                  ManifestDetails: shipment
                }).then(function (body) {
                  let resData = body.data;
                  console.log(resData);
                  if (resData.Msg == "Success") {
                    sql = "update customer_order set status_id=1 where order_id=" + order_id;
                    con.query(sql);
                    let title = 'Return request is accepted for order ' + data.order_id + ".";
                    let message = 'Keep your parcel ready. Our currior boy will pick up it within 1-2 days.';
                    notification.sendNotificationWithMessage(order.user_id, title, message);
                    acceptReturnOrder(data, res);
                  } else {
                    deleteOrder(order_id);
                    console.log("response wrong")
                    return res.json({
                      status: 400,
                      message: "Order is not accepted."
                    });
                  }
                }).catch(function (error) {
                  console.log(error);
                  deleteOrder(order_id)
                  return res.json({
                    status: 400,
                    message: "Order is not accepted."
                  });
                });
              }
            });
          } else {
            console.log("Order not found");
            return res.json({ status: 400, message: "Order is not accepted." });
          }
        }
      });
    }
  });
}

function acceptReturnOrder(data, res) {
  let sql =
    "update return_request set is_accepted=1 where order_id=" + data.order_id;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ status: 400, message: "Order is not accepted." });
    } else {
      return res.json({
        status: 200,
        message: "Order accepted successfully."
      });
    }
  });
}

function deleteOrder(order_id) {
  let sql = "delete from customer_order where order_id=" + order_id;
  con.query(sql);
}

router.post("/paid-return-order", verifyToken, (req, res) => {
  let data = req.body;
  console.log(data);
  let sql = `select * from return_request where order_id=${data.order_id}`;
  con.query(sql, (err, orders) => {
    if (err) {
      console.log(err);
      return res.json({ status: 400, message: "Order is not paid." });
    } else {
      if (!orders || !orders.length) {
        console.log("orders not found");
        return res.json({ status: 400, message: "Order is not paid." });
      }
      let returnOrder = orders[0];
      if (returnOrder.type == 1) {
        sql = `select * from customer_order where order_id=${data.order_id}`;
        con.query(sql, (err, orderData) => {
          if (err || !orderData || !orderData.length) {
            console.log(err);
            return res.json({ status: 400, message: "Order is not paid." });
          } else {
            sql = `select * from order_detail where item_id=${data.item_id}`;
            con.query(sql, (err, items) => {
              if (err || !items || !items.length) {
                console.log(err);
                return res.json({ status: 400, message: "Order is not paid." });
              } else {
                let order = orderData[0];
                let item = items[0];
                sql = `insert into customer_order(user_id,address_id,status_id,iscod,collectable_amount,order_amount,total_weight,dm_length,dm_breadth,dm_height,taxable_value,cgst,sgst,igst,variant_id,deliveryCharge) values(${order.user_id},${order.address_id},0,3,0,0,${order.total_weight},${order.dm_length},${order.dm_breadth},${order.dm_height},0,0,0,0,${item.variant_id},0)`;
                con.query(sql, (err, insertedOrder) => {
                  if (err) {
                    console.log(err);
                    return res.json({ status: 400, message: "Order is not paid." });
                  } else {
                    let order_id = insertedOrder.insertId;
                    sql = `insert into order_detail(order_id,variant_id,user_id,variant,attributes,quantity,mobile_required,mobile_id,promocode) values(${order_id},${item.variant_id},${item.user_id},'${item.variant}','${item.attributes}',${item.quantity},${item.mobile_required},${item.mobile_id},${item.promocode})`;
                    con.query(sql, (err, ordersDetail) => {
                      if (err) {
                        console.log(err);
                        deleteOrder(order_id);
                        return res.json({ status: 400, message: "Order is not paid." });
                      } else {
                        let item_id = ordersDetail.insertId;
                        sql = `insert into track_detail(item_id,status_id) values(${order_id},0)`;
                        con.query(sql);
                        sql = `update variant_mobile set quantity=quantity-1 where variant_id=${item.variant_id} and mobile_id=${item.mobile_id}`;
                        con.query(sql);
                        sql = `update return_request set is_paid=1 where item_id=${data.item_id}`;
                        con.query(sql);
                        notification.sendOrderStatusNotification(
                          0,
                          order.user_id,
                          order_id,
                          item_id,
                          3
                        );

                        return res.json({ status: 400, message: "Order paid successfully." });
                      }
                    });
                  }
                });
              }
            });
          }
        })
      } else {
        paidReturnedReplacedOrder(data, res);
      }
    }
  });
});

function paidReturnedReplacedOrder(data, res) {
  let sql = "update return_request set is_paid=1 where order_id=" + data.order_id;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ status: 400, message: "Order is not paid." });
    } else {
      return res.json({ status: 200, message: "Order paid successfully." });
    }
  });
}

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
    "select o.*,o.added_date as order_date,v.*,a.* from customer_order o, product_variant v, customer_address a where o.status_id=1 and o.variant_id=v.variant_id and a.address_id=o.address_id and o.address_id=" +
    order.address_id;
  console.log(sql);
  con.query(sql, (err, ordersdata) => {
    if (err) {
      console.log(err);
      return res
        .status(200)
        .json({ status: 400, message: "Order status not changed." });
    } else {
      console.log(ordersdata.length);
      if (ordersdata.length > 0) {
        let orderdata = ordersdata[0];
        let orderDate = new Date(orderdata.order_date);
        orderDate =
          orderDate.getFullYear() +
          "-" +
          ("00" + (orderDate.getMonth() + 1).toString()).substr(-2) +
          "-" +
          ("00" + orderDate.getDate().toString()).substr(-2);
        if (!orderdata.total_weight || orderDate.total_weight <= 0) {
          orderdata.total_weight = 0.05;
        }
        let shipment = {
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
          ProductDetail: "",
          CheckoutMode: "Auto",
          IsSellerRegUnderGST: "No",
          InvoiceDate: orderDate
        };
        shipment.InvoiceNo = "";
        shipment.InvoiceAmount = 0;
        shipment.CollectableAmount = 0;
        for (let orderDetail of ordersdata) {
          shipment.InvoiceAmount += orderDetail.collectable_amount;
          shipment.CollectableAmount += orderDetail.collectable_amount;
          shipment.InvoiceNo += orderDetail.order_id + " , ";
          shipment.ProductDetail += orderDetail.name + " , ";
        }
        shipment.InvoiceNo = shipment.InvoiceNo.substr(0, shipment.InvoiceNo.length - 2);
        shipment.ProductDetail = shipment.ProductDetail.substr(0, shipment.ProductDetail.length - 2);
        shipment.InvoiceAmount = shipment.InvoiceAmount.toFixed(2);
        shipment.CollectableAmount = shipment.CollectableAmount.toFixed(2);
        shipment.PaymentType = "Prepaid";
        for (let orderDetail of ordersdata) {
          if (orderDetail.iscod == 1) {
            shipment.PaymentType = "COD";
            break;
          }
        }
        console.log(shipment);
        axios.post(
          `https://${process.env.ZIPPINGBASEURL}/Api/BookShipment`, {
          oauth: {
            username: process.env.ZIPPINGUNAME,
            key: process.env.ZIPPINGPASS,
            version: "1"
          },
          ManifestDetails: shipment
        }).then(async function (resData) {
          resData = resData.data;
          console.log(resData);
          if (resData.Msg == "Success") {
            let status = order.status_id;
            for (let order of ordersdata) {
              sql = `update customer_order set shipment_id='${resData.Result[0].ShipmentId}', awbno='${resData.Result[0].AWBNO}', status_id=2 where order_id=${order.order_id}`;
              con.query(sql);
              sql =
                "insert into track_detail(item_id,status_id) values(" +
                order.order_id +
                ",2)";
              await new Promise((resolve, reject) => {
                con.query(sql, (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    sql =
                      "select * from order_detail where order_id=" +
                      order.order_id;
                    con.query(sql, (err, result) => {
                      if (result && result.length > 0) {
                        notification.sendOrderStatusNotification(
                          2,
                          order.user_id,
                          order.order_id,
                          result[0].item_id,
                          3
                        );
                      }
                    });
                  }
                  resolve(true);
                });
              });
            }
            return res.status(200).json({
              status: 200,
              message: "Status changed successfully."
            });
          } else {
            console.log(resData);
            return res.json({
              status: 400,
              message: "Order not dispatched." + resData.Error[0]
            });
          }
        }).catch(function (error) {
          console.log(error);
          return res.json({
            status: 400,
            message: "Order not dispatched." + resData.Error[0]
          });
        });
      } else {
        return res
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
      return res
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
          return res.status(200).json({ status: 400, message: "Status not changed" });
        } else {
          sql = "select * from order_detail where order_id=" + order.order_id;
          con.query(sql, (err, result) => {
            if (result && result.length > 0) {
              notification.sendOrderStatusNotification(
                order.status,
                order.user_id,
                order.order_id,
                result[0].item_id,
                3
              );
              if (order.status == 7) {
                for (let data of result) {
                  sql = `update variant_mobile set quantity=quantity+${data.quantity} where variant_id=${data.variant_id} and mobile_id=${data.mobile_id}`;
                  con.query(sql);
                }
              }
            }
          });

          return res
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
    return res.json({ status: 400, message: "Enter valid order id" });
  } else {
    let sql =
      "select o.*,a.* from customer_order o, customer_address a where o.order_id=" +
      order_id +
      " and a.address_id=o.address_id";
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ status: 400, message: "Order detail not found" });
      } else {
        sql =
          "select d.*, m.model_name from order_detail d,mobile_models m where d.order_id=" +
          order_id +
          " and m.model_id=d.mobile_id";
        con.query(sql, (err, order_detail) => {
          if (err) {
            return res.json({
              status: 400,
              message: "Order details not found."
            });
          } else {
            sql =
              "select p.* from promocode p, customer_order o where p.id=o.promo_id and o.order_id=" +
              order_id;
            con.query(sql, (err, promo) => {
              if (err) {
                console.log(err);
              }
              return res.json({
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
      return res.json({ status: 400, message: "Count not found." });
    } else {
      sql =
        "select count(vm.variant_id) as count from variant_mobile vm,product_variant v where vm.variant_id=v.variant_id and  vm.quantity<v.min_qty";
      con.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          return res.json({ status: 400, message: "Count not found." });
        } else {
          return res.json({
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
