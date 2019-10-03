const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;
var app = express();

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

router.get("/get-products/:up", [param("up").isNumeric()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(200).json({ status: "0", message: "Give the valid data" });
  } else {
    let sql =
      "select v.variant_id,v.name,v.price,v.discount,t.tax,v.list_image from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.product_id=v.product_id and p.is_display=1 and v.parent=1 order by added_on DESC limit " +
      req.params.up +
      "," +
      limit;
    // console.log(sql);
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(200).json({ status: "0", message: "Provide valid data." });
      } else {
        for (let i = 0; i < result.length; i++) {
          let data = JSON.parse(result[i].list_image);
          if (data.length > 0) {
            result[i].list_image = process.env.LISTIMAGE + data[0];
          } else {
            result[i].list_image = "";
          }
          result[i].mrp =
            result[i].price + (result[i].price * result[i].discount) / 100;
        }
        json = JSON.stringify(result);
        result = JSON.parse(json, (key, val) =>
          typeof val !== "object" && val !== null ? String(val) : val
        );
        res.status(200).json({
          status: "1",
          message: "Getting Product List Successfully.",
          products: result
        });
      }
    });
  }
});

module.exports = router;
