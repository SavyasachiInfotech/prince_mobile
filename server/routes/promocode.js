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
      res
        .status(200)
        .json({
          status: 200,
          message: "Promocodes getting successfully.",
          promocodes: result
        });
    }
  });
});

router.post("/add-promocode", verifyToken, (req, res) => {
  let data = req.body;
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
    con.query(sql,(err,result)=>{
      if(err){
        console.log(err);
        res.json({status:400, message:"Promocode not added."});
      } else {
        res.json({status:200, message:'Promocode added successfully.'});
      }
    });
});

module.exports = router;
