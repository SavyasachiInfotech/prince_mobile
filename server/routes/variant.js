const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;
const path = require("path");

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

router.get(
  "/get-variants/:id",
  [param("id").isNumeric()],
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
        "select * from product_variant where product_id=" + req.params.id;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json({
            status: process.env.ERROR,
            message: "Product variants not found."
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Variants getting successfully.",
            data: result
          });
        }
      });
    }
  }
);

router.get(
  "/get-variant/:id",
  [param("id").isNumeric()],
  verifyToken,
  (req, res) => {
    let sql = "select * from product_variant where variant_id=" + req.params.id;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ status: 200, data: result });
      }
    });
  }
);

router.post(
  "/add-variants",
  [
    check("product_id").isNumeric(),
    check("name").isString(),
    check("price").isFloat(),
    check("discount").isFloat(),
    check("quantity").isNumeric(),
    check("parent").isBoolean(),
    check("color_id").isNumeric(),
    check("brand_id").isNumeric(),
    check("image_required").isBoolean()
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
      let variant = req.body;
      let sql =
        "insert into product_variant(product_id,name,price,discount,quantity,parent,color_id,brand_id,image_required,thumbnail,list_image,view_image,main_image) values(" +
        variant.product_id +
        ',"' +
        variant.name +
        '",' +
        variant.price +
        "," +
        variant.discount +
        "," +
        variant.quantity +
        "," +
        variant.parent +
        "," +
        variant.color_id +
        "," +
        variant.brand_id +
        "," +
        variant.image_required +
        ",'[]','[]','[]','[]')";
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res
            .status(200)
            .json({ status: 400, message: "Variant is not added" });
        } else {
          res
            .status(200)
            .json({ status: 200, message: "Variant is adde successfully." });
        }
      });
    }
  }
);

router.put(
  "/update-variant",
  [
    check("variant_id").isNumeric(),
    check("product_id").isNumeric(),
    check("name").isString(),
    check("price").isFloat(),
    check("discount").isFloat(),
    check("quantity").isNumeric(),
    check("parent").isBoolean(),
    check("color_id").isNumeric(),
    check("brand_id").isNumeric(),
    check("image_required").isBoolean()
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
      let variant = req.body;
      let sql =
        'update product_variant set name="' +
        variant.name +
        '", price=' +
        variant.price +
        ", discount=" +
        variant.discount +
        ",quantity=" +
        variant.quantity +
        ",parent=" +
        variant.parent +
        ",color_id=" +
        variant.color_id +
        ",brand_id=" +
        variant.brand_id +
        ",image_required=" +
        variant.image_required +
        " where product_id=" +
        variant.product_id +
        " and variant_id=" +
        variant.variant_id;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json({
            status: 400,
            message: "Variant is not updated successfully."
          });
        } else {
          res
            .status(200)
            .json({ status: 200, message: "Variant updated successfully." });
        }
      });
    }
  }
);

module.exports = router;
