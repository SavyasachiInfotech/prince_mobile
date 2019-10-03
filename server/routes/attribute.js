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

router.get("/count-attribute", (req, res) => {
  let sql = "select count(*) as count from attribute";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(200)
        .json({ status: 400, message: "Cannot getting total attribute" });
    } else {
      res.status(200).json({
        status: 200,
        message: "Getting total attributes",
        data: result
      });
    }
  });
});

/** Fetch the Attributes within provided bounds API */

router.get(
  "/getAttributes/:up",
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
        "select * from attribute limit " +
        req.params.up +
        "," +
        process.env.RECORD_LIMIT;
      con.query(sql, (err, result) => {
        if (err) {
          if (process.env.DEVELOPMENT) {
            console.log(err);
          }
          res.status(200).json({
            status: process.env.ERROR,
            message: "Please try again later."
          });
        } else {
          if (result.length > 0) {
            res.status(200).json({
              status: process.env.SUCCESS,
              message: "Attributes found successfully",
              attributes: result
            });
          } else {
            res.status(200).json({
              satatus: process.env.NOT_FOUND,
              message: "No Records found for attributes"
            });
          }
        }
      });
    }
  }
);

/** Fetch the Attrbiute's Values within provided bounds API */

router.get(
  "/attributeValues/:attribute_id/:up",
  [param("up").isNumeric(), param("attribute_id").isNumeric()],
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
        "select * from attribute_value where attribute_id=" +
        req.params.attribute_id +
        " limit " +
        req.params.up +
        "," +
        process.env.RECORD_LIMIT;
      con.query(sql, (err, result) => {
        if (err) {
          if (process.env.DEVELOPMENT) {
            console.log(err);
          }
          res.status(200).json({
            status: process.env.ERROR,
            message: "Please try again later."
          });
        } else {
          if (result.length > 0) {
            res.status(200).json({
              status: process.env.SUCCESS,
              message: "Attribute's values found successfully",
              attributeValues: result
            });
          } else {
            res.status(200).json({
              satatus: process.env.NOT_FOUND,
              message: process.env.NO_RECORD
            });
          }
        }
      });
    }
  }
);

/** Insert Attribute API */

router.post(
  "/add-attribute",
  [check("name").isString()],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(200)
        .json({ status: process.env.ERROR, errors: errors.array() });
    } else {
      let attribute = req.body;
      let sql = 'insert into attribute(name) values("' + attribute.name + '")';
      con.query(sql, (err, result) => {
        if (err) {
          if (process.env.DEVELOPMENT) {
            console.log(err);
          }
          res.status(200).json({
            status: process.env.ERROR,
            message: "Attribute is not added. Please try again later."
          });
        } else {
          res.status(200).json({
            status: process.env.SUCCESS,
            message: "Attribute added successfully."
          });
        }
      });
    }
  }
);

/** Insert Attribute Value API */

router.post(
  "/add-attribute-value",
  [check("value").isString(), check("attribute_id").isNumeric()],
  verifyToken,
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(200)
        .json({ status: process.env.ERROR, errors: errors.array() });
    } else {
      let attributeValue = req.body;
      let sql =
        "insert into attribute_value(value,attribute_id) values('" +
        attributeValue.value +
        "'," +
        attributeValue.attribute_id +
        ")";
      con.query(sql, (err, result) => {
        if (err) {
          if (process.env.DEVELOPMENT) {
            console.log(err);
          }
          res.status(200).json({
            status: process.env.ERROR,
            message: "Attribute Value is not added. Please try again later."
          });
        } else {
          res.status(200).json({
            status: process.env.SUCCESS,
            message: "Attribute Value added successfully."
          });
        }
      });
    }
  }
);

/** Edit Attribute API */

router.put(
  "/edit-attribute/:id",
  [param("id").isNumeric(), check("name").isString()],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(200)
        .json({ status: process.env.ERROR, errors: errors.array() });
    } else {
      let attribute = req.body;
      let id = req.params.id;
      let sql =
        "update attribute set name='" +
        attribute.name +
        "' where attribute_id=" +
        id;
      con.query(sql, (err, result) => {
        if (err) {
          if (process.env.DEVELOPMENT) {
            console.log(err);
          }
          res.status(200).json({
            status: process.env.ERROR,
            message: "Attribute is not updated. Please try again later."
          });
        } else {
          res.status(200).json({
            status: process.env.SUCCESS,
            message: "Attribute updated successfully."
          });
        }
      });
    }
  }
);

/** Edit Attribute Value API */

router.put(
  "/edit-attribute-value/:id",
  [
    param("id").isNumeric(),
    check("value").isString(),
    check("attribute_id").isNumeric()
  ],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(200)
        .json({ status: process.env.ERROR, errors: errors.array() });
    } else {
      let attributeValue = req.body;
      let id = req.params.id;
      let sql =
        "update attribute_value set value='" +
        attributeValue.value +
        "',attribute_id=" +
        attributeValue.attribute_id +
        " where attribute_value_id=" +
        id;
      con.query(sql, (err, result) => {
        if (err) {
          if (process.env.DEVELOPMENT) {
            console.log(err);
          }
          res.status(200).json({
            status: process.env.ERROR,
            message: "Attribute Value is not updated. Please try again later."
          });
        } else {
          res.status(200).json({
            status: process.env.SUCCESS,
            message: "Attribute Value updated successfully."
          });
        }
      });
    }
  }
);

module.exports = router;
