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

/** Getting home page data */

router.get("/get-homepage-data", (req, res) => {
  let banners;
  let categories;
  let products;
  let sql = "select image,category_id,banner_type from banners";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      banners = result;
      sql = "select category_id,name,image,parent_id from category";
      con.query(sql, (err, category) => {
        if (err) {
          console.log(err);
        } else {
          categories = category;
          sql =
            "select v.variant_id,v.name,v.price,v.discount,t.tax,v.thumbnail from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.product_id=v.product_id and p.category_id=18 and p.is_display=1 order by v.added_on limit 0,5 ";
          con.query(sql, (err, products) => {
            if (err) {
              console.log(err);
            } else {
              products = products;
              sql =
                "select v.variant_id,v.name,v.price,v.discount,t.tax,v.list_image from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.product_id=v.product_id and p.is_display=1 and v.parent=1 order by added_on DESC limit 0,5";
              con.query(sql, (err, latest) => {
                if (err) {
                  console.log(err);
                }
                let json = JSON.stringify(banners);
                banners = JSON.parse(json, (key, val) =>
                  typeof val !== "object" && val !== null ? String(val) : val
                );
                json = JSON.stringify(categories);
                categories = JSON.parse(json, (key, val) =>
                  typeof val !== "object" && val !== null ? String(val) : val
                );
                json = JSON.stringify(products);
                products = JSON.parse(json, (key, val) =>
                  typeof val !== "object" && val !== null ? String(val) : val
                );
                json = JSON.stringify(latest);
                latest = JSON.parse(json, (key, val) =>
                  typeof val !== "object" && val !== null ? String(val) : val
                );

                res.status(200).json({
                  status: "1",
                  message: "Getting homepage data successfully.",
                  banners: banners,
                  categories: categories,
                  lotshot: products,
                  latest: latest
                });
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
