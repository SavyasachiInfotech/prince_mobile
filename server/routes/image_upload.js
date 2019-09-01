const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const router = express.Router();
const limit = 10;
// var upload=multer({dest:'../../Images/product_images'});
var app = express();
const con = require("../database-connection");

app.use(express.static("../../Images/product_images"));

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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "../../", "src/assets/images/main_image"));
  },
  filename: function(req, file, cb) {
    var ext = path.extname(file.originalname);
    var filename = file.originalname + "-" + Date.now() + ext;
    let sql =
      "select main_image from product_variant where variant_id=" +
      req.params.variant_id;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let check = 0;
        let images = new Array();
        images = JSON.parse(result[0].main_image);

        try {
          if (req.params.image_name) {
            for (let i = 0; i < images.length; i++) {
              if (images[i] === req.params.image_name) {
                images[i] = filename.toString();
                let filepath =
                  path.join(
                    __dirname,
                    "../../",
                    "src/assets/images/main_image/"
                  ) + images[i];
                check = 1;
                break;
              }
            }
            fs.unlinkSync(filepath);
          }
        } catch (e) {
          console.log("update Image");
        }
        if (check == 0) {
          images.push(filename.toString());
        }

        sql =
          "update product_variant set main_image='" +
          JSON.stringify(images) +
          "' where variant_id=" +
          req.params.variant_id;
        con.query(sql, (err, result) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
    cb(null, filename);
  }
});

var upload = multer({ storage: storage });

router.post(
  "/upload-image/:variant_id",
  verifyToken,
  upload.array("uploads[]", 12),
  (req, res) => {
    let variant;
    let sql =
      "select * from product_variant where variant_id=" + req.params.variant_id;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        variant = result[0];
      }
    });
    sharp(req.files[0].path)
      .resize(100)
      .toFile(
        path.join(__dirname, "../../", "src/assets/images/thumbnail/100-100") +
          req.files[0].filename,
        (err, info) => {
          if (err) {
            console.log(err);
          } else {
            let images = JSON.parse(variant.thumbnail);
            images.push("100-100" + req.files[0].filename);
            variant.thumbnail = JSON.stringify(images);
            sharp(req.files[0].path)
              .resize(300)
              .toFile(
                path.join(
                  __dirname,
                  "../../",
                  "src/assets/images/list_image/300-300"
                ) + req.files[0].filename,
                (err, info) => {
                  if (err) {
                    console.log(err);
                  } else {
                    let images = JSON.parse(variant.list_image);
                    images.push("300-300" + req.files[0].filename);
                    variant.list_image = JSON.stringify(images);
                    // console.log(variant)
                    sharp(req.files[0].path)
                      .resize(500)
                      .toFile(
                        path.join(
                          __dirname,
                          "../../",
                          "src/assets/images/view_image/500-500"
                        ) + req.files[0].filename,
                        (err, info) => {
                          if (err) {
                            console.log(err);
                          } else {
                            let images = JSON.parse(variant.view_image);
                            images.push("500-500" + req.files[0].filename);
                            variant.view_image = JSON.stringify(images);

                            sql =
                              "update product_variant set thumbnail='" +
                              variant.thumbnail +
                              "', list_image='" +
                              variant.list_image +
                              "',view_image='" +
                              variant.view_image +
                              "' where variant_id=" +
                              variant.variant_id;
                            con.query(sql, (err, result) => {
                              if (err) {
                                console.log(err);
                              } else {
                                res.send(req.files);
                              }
                            });
                          }
                        }
                      );
                  }
                }
              );
          }
        }
      );

    // console.log(req.files[0].path)
  }
);

router.post(
  "/editImageUpload/:variant_id/:image_name",
  verifyToken,
  upload.array("uploads[]", 12),
  (req, res) => {
    let variant;
    let sql =
      "select * from product_variant where variant_id=" + req.params.variant_id;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        variant = result[0];
      }
    });

    sharp(req.files[0].path)
      .resize(100)
      .toFile(
        path.join(__dirname, "../../", "src/assets/images/thumbnail/100-100") +
          req.files[0].filename,
        (err, info) => {
          if (err) {
            console.log(err);
          } else {
            let images = JSON.parse(variant.thumbnail);
            for (let i = 0; i < images.length; i++) {
              if (images[i] == "100-100" + req.params.image_name) {
                images[i] = "100-100" + req.files[0].filename;
              }
            }
            variant.thumbnail = JSON.stringify(images);
            sharp(req.files[0].path)
              .resize(300)
              .toFile(
                path.join(
                  __dirname,
                  "../../",
                  "src/assets/images/list_image/300-300"
                ) + req.files[0].filename,
                (err, info) => {
                  if (err) {
                    console.log(err);
                  } else {
                    let images = JSON.parse(variant.list_image);
                    for (let i = 0; i < images.length; i++) {
                      if (images[i] == "300-300" + req.params.image_name) {
                        images[i] = "300-300" + req.files[0].filename;
                      }
                    }
                    variant.list_image = JSON.stringify(images);
                    // console.log(variant)
                    sharp(req.files[0].path)
                      .resize(500)
                      .toFile(
                        path.join(
                          __dirname,
                          "../../",
                          "src/assets/images/view_image/500-500"
                        ) + req.files[0].filename,
                        (err, info) => {
                          if (err) {
                            console.log(err);
                          } else {
                            let images = JSON.parse(variant.view_image);
                            for (let i = 0; i < images.length; i++) {
                              if (
                                images[i] ==
                                "500-500" + req.params.image_name
                              ) {
                                images[i] = "500-500" + req.files[0].filename;
                              }
                            }
                            variant.view_image = JSON.stringify(images);

                            sql =
                              "update product_variants set thumbnail='" +
                              variant.thumbnail +
                              "', list_image='" +
                              variant.list_image +
                              "',view_image='" +
                              variant.view_image +
                              "' where variant_id=" +
                              variant.variant_id;
                            con.query(sql, (err, result) => {
                              if (err) {
                                console.log(err);
                              } else {
                                res.send(req.files);
                              }
                            });
                          }
                        }
                      );
                  }
                }
              );
          }
        }
      );
  }
);

module.exports = router;
