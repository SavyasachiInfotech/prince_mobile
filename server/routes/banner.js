const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
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

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "../", "assets/banners"));
  },
  filename: function(req, file, cb) {
    var ext = path.extname(file.originalname);
    var filename = Date.now() + file.originalname;
    let sql = "select image from banners where id=" + req.params.id;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let check = 0;
        if (result.length > 0) {
          try {
            let filepath =
              path.join(__dirname, "../", "assets/banners") + result[0].image;

            sql =
              "update banners set image='" +
              filename +
              "' where id=" +
              req.params.id;
            con.query(sql, (err, result) => {
              if (err) {
                console.log(err);
              }
            });
            fs.unlinkSync(filepath);
          } catch (e) {
            console.log("update Image");
          }
        } else {
          sql =
            "insert into banners(image,banner_type) values('" +
            filename +
            "',0 )";
          con.query(sql, (err, result) => {
            if (err) {
              console.log(err);
            }
          });
        }
      }
    });
    cb(null, filename);
  }
});

var upload = multer({ storage: storage });

router.get("/get-banners", verifyToken, (req, res) => {
  let sql = "select * from banners where banner_type=0";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "Banners not found." });
    } else {
      res.json({
        status: 200,
        message: "Getting banners successfully.",
        banners: result
      });
    }
  });
});

router.post(
  "/upload-image/:id",
  verifyToken,
  upload.array("uploads[]", 12),
  (req, res) => {
    res.status(200).json({ status: 200, message: "Category Image Uploaded" });

    // console.log(req.files[0].path)
  }
);

router.post(
  "/editImageUpload/:id",
  verifyToken,
  upload.array("uploads[]", 12),
  (req, res) => {
    res.status(200).json({ status: 200, message: "Category Image Uploaded" });
  }
);

module.exports = router;
