const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  check,
  validationResult,
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

router.get("/get-products/:up", [param("up").isNumeric()], verifyToken, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(200).json({
      status: process.env.ERROR,
      message: "Invalid Input Found",
      errors: errors.array()
    });
  } else {
    let sql = "select p.*,c.name from product p,category c where p.sub_category_id=c.id limit " + req.params.up + "," + limit;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          res.status(200).json({ status: 200, message: "Products getting successfully.", data: result });
        } else {
          res.status(200).json({ status: 404, message: "No records found for product." });
        }
      }
    });
  }
});

router.post("/add-product", [check("category_id").isNumeric(), check("subcategory_id").isNumeric(), check("description").isString(), check("display_bit").isBoolean(), check("is_mobile_product").isBoolean()], verifyToken, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(200).json({
      status: process.env.ERROR,
      message: "Invalid Input Found",
      errors: errors.array()
    });
  } else {
    let product = req.body;
    let sql = 'insert into product(description,admin_id,display,category_id,sub_category_id,is_mobile) values("' + product.description + '",' + req.userId + ',' + product.display_bit + ',' + product.category_id + ',' + product.subcategory_id + ',' + product.is_mobile_product + ')';
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ status: 200, message: "Product added successfully." });
      }
    });
  }
});


router.put("/update-product", [check("id").isNumeric(), check("category_id").isNumeric(), check("subcategory_id").isNumeric(), check("description").isString(), check("display_bit").isBoolean(), check("is_mobile_product").isBoolean()], verifyToken, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(200).json({
      status: process.env.ERROR,
      message: "Invalid Input Found",
      errors: errors.array()
    });
  } else {
    let product = req.body;
    let sql = 'update product set description="' + product.description + '",admin_id=' + req.userId + ', category_id=' + product.category_id + ',sub_category_id=' + product.subcategory_id + ',display=' + product.display_bit + ',is_mobile=' + product.is_mobile_product + ' where id=' + product.id;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ status: 200, message: "Product updated successfully." });
      }
    })
  }
});


module.exports = router;
