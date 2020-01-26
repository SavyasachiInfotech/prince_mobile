const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
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

router.get("/get-promocode", verifyToken, (req, res) => {
  let sql = "select * from  promocode";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({ status: 400, message: "Promocodes not found" });
    } else {
      res.status(200).json({
        status: 200,
        message: "Promocodes getting successfully.",
        promocodes: result
      });
    }
  });
});

router.post("/add-promocode", verifyToken, (req, res) => {
  let data = req.body;
  if(data.discount_type==1){
    if(data.max_discount<data.discount){
      data.max_discount=data.discount;
      data.min_limit=data.discount;
    }
  }
  let sql =
    "insert into promocode(code,description,discount,min_limit,max_discount,discount_type,max_attempt) values('" +
    data.code +
    "','" +
    data.description +
    "'," +
    data.discount +
    "," +
    data.min_limit +
    "," +
    data.max_discount +
    "," +
    data.discount_type +
    "," +
    data.max_attempt +
    ")";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "Promocode not added." });
    } else {
      res.json({ status: 200, message: "Promocode added successfully." });
    }
  });
});

router.post("/update-promocode", verifyToken, (req, res) => {
  let data = req.body;
  let sql = `update promocode set code='${data.code}', description='${data.description}', discount=${data.discount}, min_limit=${data.min_limit}, max_discount=${data.max_discount}, discount_type=${data.discount_type}, max_attempt=${data.max_attempt} where id=${data.id}`;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "Promocode not updated." });
    } else {
      res.json({ status: 200, message: "Promocode updated successfully." });
    }
  });
});

router.get("/get-promocode-by-id/:id", verifyToken, (req, res) => {
  let sql = "select * from promocode where id=" + req.params.id;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "Promocode not found." });
    } else {
      res.json({
        status: 200,
        message: "Promocode getting successfully.",
        data: result
      });
    }
  });
});

router.delete("/delete-promocode/:id", verifyToken, (req, res) => {
  let sql = "delete from promocode where id=" + req.params.id;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "Promocode not deleted." });
    } else {
      res.json({ status: 200, message: "Promocode deleted successfully." });
    }
  });
});

module.exports = router;
