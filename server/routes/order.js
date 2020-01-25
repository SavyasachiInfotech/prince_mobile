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
    " and o.variant_id=v.variant_id order by o.added_date desc limit " +
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

router.post("/change-status", verifyToken, (req, res) => {
  order = req.body;

  bookShipment(order);
  // let sql =
  //   "select o.*,o.added_date as order_date,v.*,a.* from customer_order o, product_variant v, customer_address a where o.order_id=" +
  //   order.order_id +
  //   " and o.varaint_id=v.variant_id and a.address_id=o.address_id";
  // con.query(sql, (err, orderdata) => {
  //   if (err) {
  //     console.log(err);
  //     res
  //       .status(200)
  //       .json({ status: 400, message: "Order status not changed." });
  //   } else {
  //     if (orderdata.length > 0) {
  //       orderdata = orderdata[0];
  //       let shipment = {
  //         InvoiceNo: order.order_id.toString(),
  //         PickupCode: "395010",
  //         ShowDifferenceSender: "No",
  //         CustomerFirstName: orderdata.first_name,
  //         CustomerLastName: orderdata.last_name,
  //         CustomerAddress1: orderdata.flatno,
  //         CustomerAddress2: orderdata.colony,
  //         CustomerAddress3: orderdata.landmark,
  //         CustomerPincode: orderdata.pincode,
  //         CustomerCity: orderdata.city,
  //         CustomerState: orderdata.state,
  //         CustomerMobile: orderdata.mobile,
  //         Weight: orderdata.total_weight,
  //         Length: "20",
  //         ProductDetail: orderdata.name,
  //         InvoiceAmount: orderdata.order_amount,
  //         CollectableAmount: orderdata.collectable_amount,
  //         CheckoutMode: "Auto",
  //         IsSellerRegUnderGST: "No",
  //         InvoiceDate: new Date(orderdata.order_date).toJSON().substr(0, 10)
  //       };
  //       if (orderdata.iscod == 1) {
  //         shipment.PaymentType = "COD";
  //       } else {
  //         shipment.PaymentType = "Prepaid";
  //       }
  //       console.log(shipment);
  //       let http = require("http");
  //       http.post(
  //         process.env.ZIPPINGBASEURL + "BookShipment",
  //         {
  //           oauth: {
  //             username: process.env.ZIPPINGUNAME,
  //             key: process.env.ZIPPINGPASS,
  //             version: "1"
  //           },
  //           ManifestDetails: shipment
  //         },
  //         (err, shipdata) => {
  //           if (err) {
  //             console.log(err);
  //             res.status;
  //           }
  //         }
  //       );
  //     } else {
  //       res
  //         .status(200)
  //         .json({ status: 400, message: "Order status not changed" });
  //     }
  //   }
  // });

  let sql =
    "update customer_order set status_id=" +
    req.body.status +
    " where order_id=" +
    req.body.order_id;
  con.query(sql, (err, result) => {
    if (err) {
      res
        .status(200)
        .json({ status: 400, message: "Order status not changed" });
    } else {
      sql =
        "insert into track_detail(item_id,status_id) values(" +
        req.body.order_id +
        "," +
        req.body.status +
        ")";
      con.query(sql, (err, result) => {
        if (err) {
          res.status(200).json({ status: 400, message: "Status not changed" });
        } else {
          res
            .status(200)
            .json({ status: 200, message: "Status changed successfully." });
        }
      });
    }
  });
});

function bookShipment(order) {
  let sql =
    "select o.*,o.added_date as order_date,v.*,a.* from customer_order o, product_variant v, customer_address a where o.order_id=" +
    order.order_id +
    " and o.variant_id=v.variant_id and a.address_id=o.address_id";
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
        let shipment = {
          // InvoiceNo: order.order_id.toString(),
          InvoiceNo: "Parth123456",
          PickupCode: "395010",
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
          }
          // json: true
        };
        var req = http.request(options, shipdata => {
          let data = "";
          shipdata.on("data", d => {
            data += d;
            console.log(d);
          });
          shipdata.on("end", () => {
            console.log(JSON.parse(data));
          });
        });
        req.end();
      } else {
        res
          .status(200)
          .json({ status: 400, message: "Order status not changed" });
      }
    }
  });
}

router.post("/get-order-detail", verifyToken, (req, res) => {
  let order_id = req.body.order_id;
  if (isNaN(order_id)) {
    res.json({ status: 400, message: "Enter valid order id" });
  } else {
    let sql = "select o.* from customer_order o where o.order_id=" + order_id;
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

module.exports = router;
