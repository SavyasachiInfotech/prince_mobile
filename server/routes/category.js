const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  check,
  validationResult,
  sanitizeParam,
  param
} = require("express-validator");
const con = require("../database-connection");
const limit = 30;

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "../", "assets/categories"));
  },
  filename: function(req, file, cb) {
    file.originalname = new Date().getTime() + file.originalname;
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
});

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
      let sql =
        "select * from category where parent_id=0 limit " +
        req.params.up +
        ",10";
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
  verifyToken,
  upload.array("avatar", 1),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({ status: 400, errors: errors.array() });
    } else {
      let category = req.body;
      let sql;
      if (req.files && req.files.length > 0) {
        sql =
          "insert into category(name,description,parent_id,image_required,mobile_required,is_display,image) values('" +
          category.name.replace("'", "''") +
          "','" +
          category.description.replace("'", "''") +
          "',0," +
          category.image_required +
          "," +
          category.mobile_required +
          "," +
          category.is_display +
          ",'" +
          req.files[0].filename +
          "')";
      } else {
        sql =
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
      }

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
  upload.array("avatar", 1),
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({ status: 400, errors: errors.array() });
    } else {
      let category = req.body;
      let sql = "";

      if (req.files && req.files.length > 0) {
        sql =
          "insert into category(name,description,parent_id,is_display,image) values('" +
          category.name.replace("'", "''") +
          "','" +
          category.description.replace("'", "''") +
          "'," +
          category.parent_id +
          "," +
          category.is_display +
          ",'" +
          req.files[0].filename +
          "')";
      } else {
        sql =
          "insert into category(name,description,parent_id,is_display) values('" +
          category.name.replace("'", "''") +
          "','" +
          category.description.replace("'", "''") +
          "'," +
          category.parent_id +
          "," +
          category.is_display +
          ")";
      }

      // "," +
      // category.image_required +
      // "," +
      // category.mobile_required +
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

router.post(
  "/edit-category",
  verifyToken,
  upload.array("avatar", 1),
  (req, res) => {
    let category = req.body;
    let sql = "";
    if (req.files && req.files.length > 0) {
      sql =
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
        ", image='" +
        req.files[0].originalname +
        "' where category_id=" +
        category.category_id;
    } else {
      sql =
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
    }
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
);

/** Edit Sub category API */

router.put(
  "/edit-subcategory",
  upload.array("avatar", 1),
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({ status: 400, errors: errors.array() });
    } else {
      let category = req.body;
      let sql = "";

      if (req.files && req.files.length > 0) {
        sql =
          "update category set name='" +
          category.name +
          "', description='" +
          category.description +
          "',parent_id=" +
          category.parent_id +
          ", is_display=" +
          category.is_display +
          ", image='" +
          req.files[0].originalname +
          "' where category_id=" +
          category.category_id;
      } else {
        sql =
          "update category set name='" +
          category.name +
          "', description='" +
          category.description +
          "',parent_id=" +
          category.parent_id +
          ", is_display=" +
          category.is_display +
          " where category_id=" +
          category.category_id;
      }

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

router.post("/delete-category", verifyToken, (req, res) => {
  let id = req.body.category_id;
  let sql = "delete from category where category_id=" + id;
  console.log(sql);
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({ status: 400, message: "Catgory not deleted." });
    } else {
      res
        .status(200)
        .json({ status: 200, message: "Category deleted successfully." });
    }
  });
});

module.exports = router;
