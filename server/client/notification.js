const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;
const auth = require("../auth");

router.get("/get-notifications", auth.verifyToken, (req, res) => {
  let sql =
    "select * from notifications where user_id=" +
    req.userId +
    " order by added_on desc";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({
        status: "0",
        message: "No notifications found. Please try again later."
      });
    } else {
      json = JSON.stringify(result);
      result = JSON.parse(json, (key, val) =>
        typeof val !== "object" && val !== null ? String(val) : val
      );
      res.status(200).json({
        status: "1",
        message: "Getting notifications successfully.",
        notifications: result
      });
    }
  });
});

router.post("/delete-notification", auth.verifyToken, (req, res) => {
  if (isNaN(req.body.id)) {
    res.json({ status: "0", message: "Please select valid notification" });
  } else {
    let sql = "delete from notifications where id=" + req.body.id;
    con.query(sql, (err, result) => {
      if (err) {
        res.json({ status: "0", message: "Notification is not deleted." });
      } else {
        res.json({ status: "1", message: "Notification deleted sucessfully" });
      }
    });
  }
});

router.get("/test-notification/:token/:screenNo", (req, res) => {
  let token = [
    {
      meta_value: req.params.token
    }
  ];
  let notificationService = require("./send-notification");
  notificationService.sendNotification(
    token,
    "Order status changes Description",
    "Order status chnaged",
    "10",
    "336",
    req.params.screenNo
  );
  res.json({ status: "1", message: "Notification sent successfully." });
});

module.exports = router;
