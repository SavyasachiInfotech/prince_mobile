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
    "select o.* from customer_order o where o.status_id=" +
    req.body.status +
    " order by o.added_date desc limit " +
    req.body.pageno * limit +
    "," +
    limit;
  con.query(sql, (err, result) => {
    if (err) {
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

module.exports = router;
