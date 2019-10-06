const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;
var app = express();

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(200)
      .json({ status: "0", message: "Unauthorized Request! Header Not Found" });
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res
      .status(200)
      .json({ status: "0", message: "Unauthorized Request! Token Not Found" });
  }
  let payload = jwt.verify(token, "MysupersecreteKey");

  if (!payload) {
    return res.status(200).json({
      status: "0",
      message: "Unauthorized Request! Token is not Correct"
    });
  }
  req.userId = payload.subject;
  next();
}

router.post(
  "/get-products",
  [
    check("category_id").isNumeric(),
    check("flag").isNumeric(),
    check("pageno").isNumeric()
  ],
  (req, res) => {
    /**
     * category_id for displaying data categorywise
     * flag for displaying category, latest, new arrival
     *    0 - For checking category wise or not
     *    1 - For give product of latest
     *    2 - For give product of trending
     *    3 - For All Product
     *    4 - For Lotshot Product
     */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({ status: "0", message: "Give the valid data" });
    } else {
      let data = req.body;
      let sql;
      let status = true;
      let countSql;
      if (data.pageno < 1) {
        res
          .status(200)
          .json({ status: "0", message: "Provide pageno properly." });
      } else {
        data.pageno = data.pageno * limit - limit;
        if (data.flag == 0) {
          if (data.category_id > 0) {
            sql =
              "select v.variant_id,v.name,v.price,v.discount,t.tax,v.list_image,v.product_id from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.product_id=v.product_id and p.is_display=1 and v.parent=1 and p.category_id=" +
              data.category_id +
              " order by v.added_on DESC limit " +
              data.pageno +
              "," +
              limit;
            countSql =
              "select count(v.variant_id) as total from product p,product_variant v where p.product_id=v.product_id and p.is_display=1 and v.parent=1 and v.parent=1 and p.category_id=" +
              data.category_id;
          } else {
            status = false;
            res
              .status(200)
              .json({ status: "0", message: "Provide valid data." });
          }
        } else {
          if (data.flag == 1) {
            sql =
              "select v.variant_id,v.name,v.price,v.discount,t.tax,v.list_image,v.product_id from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.product_id=v.product_id and p.is_display=1 and v.parent=1 order by v.added_on DESC limit " +
              data.pageno +
              "," +
              limit;
            countSql =
              "select count(v.variant_id) as total from product_variant v,product p where p.product_id=v.product_id and p.is_display=1 and v.parent=1";
          } else {
            if (data.flag == 2) {
              sql =
                "select v.variant_id,v.name,v.price,v.discount,t.tax,v.list_image,v.product_id from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.product_id=v.product_id and p.is_display=1 and v.parent=1 order by v.order_count DESC limit " +
                data.pageno +
                "," +
                limit;
              countSql =
                "select count(v.variant_id) as total from product_variant v,product p where p.product_id=v.product_id and p.is_display=1 and v.parent=1";
            } else {
              if (data.flag == 3) {
                sql =
                  "select v.variant_id,v.name,v.price,v.discount,t.tax,v.list_image,v.product_id from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.product_id=v.product_id and p.is_display=1 and v.parent=1 order by v.modified_date DESC limit " +
                  data.pageno +
                  "," +
                  limit;
                countSql =
                  "select count(v.variant_id) as total from product_variant v,product p where p.product_id=v.product_id and p.is_display=1 and v.parent=1";
              } else {
                if (data.flag == 4) {
                  sql =
                    "select v.variant_id,v.name,v.price,v.discount,t.tax,v.list_image,v.product_id from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.product_id=v.product_id and p.category_id=18 and p.is_display=1 order by v.added_on limit " +
                    data.pageno +
                    "," +
                    limit;
                  countSql =
                    "select count(v.variant_id) as total from product_variant v, product p where p.product_id=v.product_id and p.category_id=18";
                } else {
                  res.status(200).json({
                    status: "0",
                    message: "Please provide valid data"
                  });
                }
              }
            }
          }
        }
        if (status) {
          con.query(sql, (err, result) => {
            if (err) {
              console.log(err);
              res
                .status(200)
                .json({ status: "0", message: "Provide valid data." });
            } else {
              for (let i = 0; i < result.length; i++) {
                let data = JSON.parse(result[i].list_image);
                if (data.length > 0) {
                  result[i].list_image = process.env.LISTIMAGE + data[0];
                } else {
                  result[i].list_image = "";
                }
                result[i].mrp =
                  result[i].price +
                  (result[i].price * result[i].discount) / 100;
              }
              json = JSON.stringify(result);
              result = JSON.parse(json, (key, val) =>
                typeof val !== "object" && val !== null ? String(val) : val
              );
              con.query(countSql, (err, count) => {
                if (err) {
                  console.log(err);
                  res.status(200).json({
                    status: "0",
                    message: "Please provide valid data"
                  });
                } else {
                  let totalPages = Math.ceil(count[0].total / limit);
                  res.status(200).json({
                    status: "1",
                    message: "Getting Products successfully.",
                    products: result,
                    currentPage: (data.pageno + 1).toString(),
                    totalPages: totalPages.toString(),
                    totalProduct: count[0].total.toString()
                  });
                }
              });
            }
          });
        }
      }
    }
  }
);

router.get("/get-product-detail/:id", [param("id").isNumeric()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(200).json({
      status: process.env.ERROR,
      message: "Invalid Input Found",
      errors: errors.array()
    });
  } else {
    let sql =
      "select v.variant_id,v.name,p.description,v.price,v.discount,v.min_qty,v.quantity,v.avg_rating,v.list_image,v.view_image,v.main_image,t.tax from product_variant v, product p, tax t where t.tax_id=v.tax_id and p.product_id=v.product_id and p.product_id=" +
      req.params.id;
    con.query(sql, (err, products) => {
      if (err) {
        console.log(err);
        res
          .status(200)
          .json({ status: "0", message: "Provide valid product id" });
      } else {
        if (products.length > 0) {
          sql =
            "select a.attribute_id,a.name,av.value,v.variant_id from attribute a,attribute_value av,variant_attribute v where a.attribute_id=av.attribute_id and av.attribute_value_id=v.attribute_value_id and v.variant_id in(";
          for (let i = 0; i < products.length; i++) {
            if (i == products.length - 1) {
              sql += products[i].variant_id + ")";
            } else {
              sql += products[i].variant_id + ",";
            }
          }
          con.query(sql, (err, attributes) => {
            if (err) {
              console.log(err);
              res
                .status(200)
                .json({ status: "0", message: "Enter valid Product." });
            } else {
              sql =
                "select s.specification_key,s.specification_value,p.variant_id from product_specification p,specification s where s.specification_id=p.specification_id and p.variant_id in(";
              for (let i = 0; i < products.length; i++) {
                if (i == products.length - 1) {
                  sql += products[i].variant_id + ")";
                } else {
                  sql += products[i].variant_id + ",";
                }
              }
              con.query(sql, (err, specifications) => {
                if (err) {
                  console.log(err);
                  res
                    .status(200)
                    .json({ status: "0", message: "Enter valid Product." });
                } else {
                  for (let i = 0; i < products.length; i++) {
                    products[i].mrp =
                      products[i].price +
                      (products[i].price * products[i].discount) / 100;
                    products[i].list_image = JSON.parse(products[i].list_image);
                    products[i].view_image = JSON.parse(products[i].view_image);
                    products[i].main_image = JSON.parse(products[i].main_image);
                    for (let j = 0; j < products[i].list_image.length; j++) {
                      products[i].list_image[j] =
                        process.env.LISTIMAGE + products[i].list_image[j];
                      products[i].view_image[j] =
                        process.env.VIEWIMAGE + products[i].view_image[j];
                      products[i].main_image[j] =
                        process.env.MAINIMAGE + products[i].main_image[j];
                    }
                    products[i].attributes = attributes.filter(
                      item => item.variant_id == products[i].variant_id
                    );
                    products[i].specifications = specifications.filter(
                      item => item.variant_id == products[i].variant_id
                    );
                  }
                  json = JSON.stringify(products);
                  products = JSON.parse(json, (key, val) =>
                    typeof val !== "object" && val !== null ? String(val) : val
                  );
                  res.status(200).json({
                    status: "1",
                    message: "Getting product detail successfully.",
                    products: products
                  });
                }
              });
            }
          });
        } else {
          res
            .status(200)
            .json({ status: "1", message: "Select valid product." });
        }
      }
    });
  }
});

module.exports = router;
