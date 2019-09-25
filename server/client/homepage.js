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
      sql =
        "select category_id,name,ifnull(image,'') as image,parent_id from category";
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
                let trend;
                sql =
                  "select v.variant_id,v.name,v.price,v.discount,t.tax,v.list_image from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.product_id=v.product_id and p.is_display=1 and v.parent=1 order by order_count DESC limit 0,5";
                con.query(sql, (err, trending) => {
                  if (err) {
                    console.log(err);
                  } else {
                    trend = trending;
                    for (let i = 0; i < categories.length; i++) {
                      if (categories[i].image == null) {
                        categories[i].image = "";
                      } else {
                        categories[i].image =
                          process.env.CATEGORY + categories[i].image;
                      }
                    }
                    let category = categories.filter(
                      item => item.parent_id == 0
                    );
                    for (let i = 0; i < category.length; i++) {
                      category[i].subCategories = categories.filter(
                        item => item.parent_id == category[i].category_id
                      );
                    }

                    for (let i = 0; i < products.length; i++) {
                      let data = JSON.parse(products[i].thumbnail);
                      products[i].thumbnail = process.env.THUMBNAIL + data[0];
                      products[i].mrp =
                        products[i].price +
                        (products[i].price * products[i].discount) / 100;
                    }

                    for (let i = 0; i < trend.length; i++) {
                      let data = JSON.parse(trend[i].list_image);
                      trend[i].list_image = process.env.LISTIMAGE + data[0];
                      trend[i].mrp =
                        trend[i].price +
                        (trend[i].price * trend[i].discount) / 100;
                    }

                    for (let i = 0; i < banners.length; i++) {
                      banners[i].image = process.env.BANNER + banners[i].image;
                    }

                    for (let i = 0; i < latest.length; i++) {
                      let data = JSON.parse(latest[i].list_image);
                      latest[i].list_image = process.env.LISTIMAGE + data[0];
                      latest[i].mrp =
                        latest[i].price +
                        (latest[i].price * latest[i].discount) / 100;
                    }

                    let json = JSON.stringify(banners);
                    banners = JSON.parse(json, (key, val) =>
                      typeof val !== "object" && val !== null
                        ? String(val)
                        : val
                    );

                    json = JSON.stringify(trend);
                    trend = JSON.parse(json, (key, val) =>
                      typeof val !== "object" && val !== null
                        ? String(val)
                        : val
                    );
                    //  console.log(trend);
                    json = JSON.stringify(category);
                    category = JSON.parse(json, (key, val) =>
                      typeof val !== "object" && val !== null
                        ? String(val)
                        : val
                    );

                    json = JSON.stringify(products);
                    products = JSON.parse(json, (key, val) =>
                      typeof val !== "object" && val !== null
                        ? String(val)
                        : val
                    );
                    json = JSON.stringify(latest);
                    let empty = "";
                    latest = JSON.parse(json, (key, val) =>
                      typeof val !== "object" && val !== null
                        ? String(val)
                        : val
                    );
                    let offers;
                    offers = banners.filter(item => item.banner_type == "1");

                    banners = banners.filter(item => item.banner_type == "0");
                    res.status(200).json({
                      status: "1",
                      message: "Getting homepage data successfully.",
                      banners: banners,
                      offers: offers[0].image,
                      categories: category,
                      lotshot: products,
                      latest: latest,
                      trending: trend
                    });
                  }
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
