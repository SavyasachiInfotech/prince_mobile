const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;
const auth = require("../auth");

router.get("/dashboard-detail", auth.verifyToken, (req, res) => {
  let sql =
    "SELECT SUM(order_amount) as total,count(order_id) as count,(UNIX_TIMESTAMP(added_date)*1000) as datetime FROM customer_order where status_id<=4 group by added_date";
  con.query(sql, (err, chartData) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "Dashboard detail found." });
    } else {
      sql =
        "select count(o.order_id) as orders, count(o.order_amount) as total,s.status,o.status_id from customer_order o, status s where s.id=o.status_id group by o.status_id";
      con.query(sql, (err, countData) => {
        if (err) {
          res.json({
            status: 200,
            message: "Getting dashboard data successfully.",
            dashboardData: chartData
          });
        } else {
          res.json({
            status: 200,
            message: "Getting dashboard data successfully.",
            dashboardData: chartData,
            countData: countData
          });
        }
      });
    }
  });
});

module.exports = router;
