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
const limit = 30;

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

/** Get All catgeories */

router.get("/", verifyToken, (req, res) => {
  let sql = "select * from category";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "Category not found" });
    } else {
      res.json({
        status: 200,
        message: "Category getting successfully",
        categories: result
      });
    }
  });
});

/** Get Category By ID */

router.get("/get-category/:id", verifyToken, (req, res) => {
  let sql = "select * from category where category_id=" + req.params.id;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(200)
        .json({ status: 400, message: "Please select valid category" });
    } else {
      res.status(200).json({
        status: 200,
        message: "Getting category successfully",
        category: result
      });
    }
  });
});

/** Count the Categories */

router.get("/count-category", verifyToken, (req, res) => {
  let sql = "select count(*) as count from category where parent_id=0";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({ status: 400, message: "" });
    } else {
      res.status(200).json({
        status: 200,
        message: "Getting total no. of categories.",
        data: result
      });
    }
  });
});

/** Fetch the Category within provided bounds API */

router.get(
  "/getCategory/:up",
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
      let sql = "select * from category where parent_id=0";
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
              message: "Category found successfully",
              categories: result
            });
          } else {
            res.status(200).json({
              satatus: process.env.NOT_FOUND,
              message: "No Records found for category"
            });
          }
        }
      });
    }
  }
);

/** Fetch the Sub Category within provided bounds API */

router.get(
  "/subCategory/:parent/:up",
  [param("up").isNumeric(), param("parent").isNumeric()],
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
        "select * from category where parent_id=" +
        req.params.parent +
        " limit " +
        req.params.up +
        "," +
        limit;
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
              message: "Category found successfully",
              categories: result
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

/** Insert Category API */

router.post(
  "/add-category",
  [
    check("name").isString(),
    check("description").isString(),
    check("image_required").isBoolean(),
    check("mobile_required").isBoolean(),
    check("is_display").isBoolean()
  ],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({ status: 400, errors: errors.array() });
    } else {
      let category = req.body;
      let sql =
        "insert into category(name,description,parent_id,image_required,mobile_required,is_display) values('" +
        category.name.replace("'", "''") +
        "','" +
        category.description.replace("'", "''") +
        "',0," +
        category.image_required +
        "," +
        category.mobile_required +
        "," +
        category.is_display +
        ")";
      con.query(sql, (err, result) => {
        if (err) {
          if (process.env.DEVELOPMENT) {
            console.log(err);
          }
          res.status(200).json({
            status: process.env.ERROR,
            message: "Category is not added. Please try again later."
          });
        } else {
          res.status(200).json({
            status: process.env.SUCCESS,
            message: "Category added successfully."
          });
        }
      });
    }
  }
);

/** Insert Sub Category API */

router.post(
  "/add-subcategory",
  [
    check("name").isString(),
    check("description").isString(),
    check("parent_id").isNumeric(),
    check("is_display").isBoolean()
    // check("image_required").isBoolean(),
    // check("mobile_required").isBoolean()
  ],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({ status: 400, errors: errors.array() });
    } else {
      let category = req.body;
      let sql =
        "insert into category(name,description,parent_id,is_display) values('" +
        category.name.replace("'", "''") +
        "','" +
        category.description.replace("'", "''") +
        "'," +
        category.parent_id +
        "," +
        category.is_display +
        // "," +
        // category.image_required +
        // "," +
        // category.mobile_required +
        ")";
      con.query(sql, (err, result) => {
        if (err) {
          if (process.env.DEVELOPMENT) {
            console.log(err);
          }
          res.status(200).json({
            status: process.env.ERROR,
            message: "Sub Category is not added. Please try again later."
          });
        } else {
          res.status(200).json({
            status: process.env.SUCCESS,
            message: "Sub Category aded successfully."
          });
        }
      });
    }
  }
);

/** Edit Category API */

router.put(
  "/edit-category",
  [
    check("category_id").isNumeric(),
    check("name").isString(),
    check("description").isString(),
    check("image_required").isBoolean(),
    check("mobile_required").isBoolean(),
    check("is_display").isBoolean()
  ],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({ status: 400, errors: errors.array() });
    } else {
      let category = req.body;
      let sql =
        "update category set name='" +
        category.name +
        "', description='" +
        category.description +
        "', image_required=" +
        category.image_required +
        ", mobile_required=" +
        category.mobile_required +
        ", is_display=" +
        category.is_display +
        " where category_id=" +
        category.category_id;
      con.query(sql, (err, result) => {
        if (err) {
          if (process.env.DEVELOPMENT) {
            console.log(err);
          }
          res.status(200).json({
            status: process.env.ERROR,
            message: "Category is not updated. Please try again later."
          });
        } else {
          res.status(200).json({
            status: process.env.SUCCESS,
            message: "Category updated successfully."
          });
        }
      });
    }
  }
);

/** Edit Sub category API */

router.put(
  "/edit-subcategory",
  [
    check("category_id").isNumeric(),
    check("name").isString(),
    check("description").isString(),
    check("parent_id").isNumeric(),
    check("image_required").isBoolean(),
    check("mobile_required").isBoolean(),
    check("is_display").isBoolean()
  ],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({ status: 400, errors: errors.array() });
    } else {
      let category = req.body;
      let sql =
        "update category set name='" +
        category.name +
        "', description='" +
        category.description +
        "',parent_id=" +
        category.parent_id +
        ",image_required=" +
        category.image_required +
        ", mobile_required=" +
        category.mobile_required +
        ", is_display=" +
        category.is_display +
        " where category_id=" +
        category.category_id;
      con.query(sql, (err, result) => {
        if (err) {
          if (process.env.DEVELOPMENT) {
            console.log(err);
          }
          res.status(200).json({
            status: process.env.ERROR,
            message: "Sub Category is not updated. Please try again later."
          });
        } else {
          res.status(200).json({
            status: process.env.SUCCESS,
            message: "Sub Category updated successfully."
          });
        }
      });
    }
  }
);

module.exports = router;
