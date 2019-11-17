const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.WEBRECORDLIMIT;

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

router.get("/get-product-by-id/:id",[param("id").isNumeric()],verifyToken,(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: process.env.ERROR,
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let sql="select p.*,c.parent_id from product p, category c where c.category_id=p.category_id and p.product_id="+req.params.id;
      con.query(sql,(err,result)=>{
        if(err){
          console.log(err);
          res.status(200).json({status:400, message:"Product not found"});
        } else {
          res.status(200).json({status:200, message:"Product getting successfully", product:result});
        }
      });
    }
});

router.get(
  "/get-products/:up",
  [param("up").isNumeric()],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: process.env.ERROR,
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let sql =
        "select p.*,c.name from product p,category c where p.category_id=c.category_id limit " +
        req.params.up +
        "," +
        limit;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          sql = "select count(*) as total from product";
          con.query(sql, (err, total) => {
            if (err) {
              console.log(err);
            } else {
              if (result.length > 0) {
                res.status(200).json({
                  status: 200,
                  message: "Products getting successfully.",
                  data: result,
                  count: total
                });
              } else {
                res.status(200).json({
                  status: 404,
                  message: "No records found for product."
                });
              }
            }
          });
        }
      });
    }
  }
);

router.post(
  "/add-product",
  [
    check("category_id").isNumeric(),
    check("description").isString(),
    check("is_display").isBoolean(),
    check("dimention_breadth").isNumeric(),
    check("dimention_height").isNumeric(),
    check("dimention_length").isNumeric(),
    check("total_weight").isNumeric(),
    check("hsncode").isNumeric()
  ],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: process.env.ERROR,
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let product = req.body;
      let sql =
        'insert into product(description,is_display,category_id,total_weight,dimention_length,dimention_height,dimention_breadth,hsncode) values("' +
        product.description +
        '",' +
        product.is_display +
        "," +
        product.category_id +
        "," +
        product.total_weight+
        ","+
        product.dimention_length+
        ","+
        product.dimention_height+
        ","+
        product.dimention_breadth+
        ","+
        product.hsncode+
        ")";
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res
            .status(200)
            .json({ status: 200, message: "Product added successfully." });
        }
      });
    }
  }
);

router.put(
  "/update-product",
  [
    check("product_id").isNumeric(),
    check("category_id").isNumeric(),
    check("description").isString(),
    check("is_display").isBoolean(),
    check("dimention_breadth").isNumeric(),
    check("dimention_height").isNumeric(),
    check("dimention_length").isNumeric(),
    check("total_weight").isNumeric(),
    check("hsncode").isNumeric()
  ],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: process.env.ERROR,
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let product = req.body;
      let sql =
        'update product set description="' +
        product.description +
        '",'+" category_id=" +
        product.category_id +
        ",is_display=" +
        product.is_display +
        ",dimention_length=" +
        product.dimention_length +
        ",dimention_breadth="+
        product.dimention_breadth+
        ",dimention_height="+
        product.dimention_height+
        ",hsncode="+
        product.hsncode+
        ",total_weight="+
        product.total_weight+
        " where product_id=" +
        product.product_id;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res
            .status(200)
            .json({ status: 200, message: "Product updated successfully." });
        }
      });
    }
  }
);

module.exports = router;
