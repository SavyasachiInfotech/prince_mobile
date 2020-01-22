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
        "select category_id,name,ifnull(image,'') as image,parent_id from category where is_display=1";
      con.query(sql, (err, category) => {
        if (err) {
          console.log(err);
        } else {
          categories = category;
          sql =
            "select v.variant_id,v.name,v.price,v.quantity,IFNULL((select sum(quantity) from variant_mobile where variant_id=v.variant_id),-1) as sum_quantity ,(select count(mobile_id) from variant_mobile where variant_id=v.variant_id) as count,v.discount,t.tax,v.thumbnail,v.product_id from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.product_id=v.product_id and p.category_id=18 and p.is_display=1 order by v.added_on limit 0,5 ";
          con.query(sql, (err, products) => {
            if (err) {
              console.log(err);
            } else {
              products = products;
              sql =
                "select v.variant_id,v.name,v.price,v.quantity,IFNULL((select sum(quantity) from variant_mobile where variant_id=v.variant_id),-1) as sum_quantity,(select count(mobile_id) from variant_mobile where variant_id=v.variant_id) as count,v.discount,t.tax,v.list_image,v.product_id from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.product_id=v.product_id and p.is_display=1 and v.parent=1 order by v.added_on DESC limit 0,5";
              con.query(sql, (err, latest) => {
                if (err) {
                  console.log(err);
                }
                let trend;
                sql =
                  "select v.variant_id,v.name,v.price,v.quantity,IFNULL((select sum(quantity) from variant_mobile where variant_id=v.variant_id),-1) as sum_quantity,(select count(mobile_id) from variant_mobile where variant_id=v.variant_id) as count,v.discount,t.tax,v.list_image,v.product_id from product p,product_variant v,tax t where  t.tax_id=v.tax_id and p.product_id=v.product_id and p.is_display=1 and v.parent=1 order by v.order_count DESC limit 0,5";
                con.query(sql, (err, trending) => {
                  if (err) {
                    console.log(err);
                  } else {
                    sql =
                      "select v.variant_id,v.name,v.price,v.quantity,v.discount,t.tax,IFNULL((select sum(quantity) from variant_mobile where variant_id=v.variant_id),-1) as sum_quantity,(select count(mobile_id) from variant_mobile where variant_id=v.variant_id) as count,v.discount,v.list_image,v.product_id from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.product_id=v.product_id and p.is_display=1 and v.parent=1 order by v.modified_date DESC limit 0,5";
                    con.query(sql, (err, allProduct) => {
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
                          if (data.length > 0) {
                            products[i].thumbnail =
                              process.env.THUMBNAIL + data[0];
                          } else {
                            products[i].thumbnail = "";
                          }
                          if(products[i].count>0){
                            if(products[i].sum_quantity>0){
                              products[i].Is_Out_Of_Stock=0;
                            } else {
                              products[i].Is_Out_Of_Stock=1;
                            }
                          } else {
                            if(products[i].quantity>0){
                              products[i].Is_Out_Of_Stock=0;
                            } else {
                              products[i].Is_Out_Of_Stock=1;
                            }
                          }

                          products[i].mrp =
                            products[i].price +
                            (products[i].price * products[i].discount) / 100;
                        }
                        for (let i = 0; i < allProduct.length; i++) {
                          let data = JSON.parse(allProduct[i].list_image);
                          if (data.length > 0) {
                            allProduct[i].list_image =
                              process.env.LISTIMAGE + data[0];
                          } else {
                            allProduct[i].list_image = "";
                          }
                          if(allProduct[i].count>0){
                            if(allProduct[i].sum_quantity>0){
                              allProduct[i].Is_Out_Of_Stock=0;
                            } else {
                              allProduct[i].Is_Out_Of_Stock=1;
                            }
                          } else {
                            if(products[i].quantity>0){
                              allProduct[i].Is_Out_Of_Stock=0;
                            } else {
                              allProduct[i].Is_Out_Of_Stock=1;
                            }
                          } 
                          allProduct[i].mrp =
                            allProduct[i].price +
                            (allProduct[i].price * allProduct[i].discount) /
                              100;
                        }
                        for (let i = 0; i < trend.length; i++) {
                          let data = JSON.parse(trend[i].list_image);
                          if (data.length > 0) {
                            trend[i].list_image =
                              process.env.LISTIMAGE + data[0];
                          } else {
                            trend[i].list_image = "";
                          }
                          if(trend[i].count>0){
                            if(trend[i].sum_quantity>0){
                              trend[i].Is_Out_Of_Stock=0;
                            } else {
                              trend[i].Is_Out_Of_Stock=1;
                            }
                          } else {
                            if(products[i].quantity>0){
                              trend[i].Is_Out_Of_Stock=0;
                            } else {
                              trend[i].Is_Out_Of_Stock=1;
                            }
                          }
                          trend[i].mrp =
                            trend[i].price +
                            (trend[i].price * trend[i].discount) / 100;
                        }

                        for (let i = 0; i < banners.length; i++) {
                          banners[i].image =
                            process.env.BANNER + banners[i].image;
                        }

                        for (let i = 0; i < latest.length; i++) {
                          let data = JSON.parse(latest[i].list_image);
                          if (data.length > 0) {
                            latest[i].list_image =
                              process.env.LISTIMAGE + data[0];
                          } else {
                            latest[i].list_image = "";
                          }
                          if(latest[i].count>0){
                            if(latest[i].sum_quantity>0){
                              latest[i].Is_Out_Of_Stock=0;
                            } else {
                              latest[i].Is_Out_Of_Stock=1;
                            }
                          } else {
                            if(latest[i].quantity>0){
                              latest[i].Is_Out_Of_Stock=0;
                            } else {
                              latest[i].Is_Out_Of_Stock=1;
                            }
                          }
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

                        json = JSON.stringify(allProduct);
                        allProduct = JSON.parse(json, (key, val) =>
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
                        offers = banners.filter(
                          item => item.banner_type == "1"
                        );

                        banners = banners.filter(
                          item => item.banner_type == "0"
                        );
                        res.status(200).json({
                          status: "1",
                          message: "Getting homepage data successfully.",
                          banners: banners,
                          offers: offers[0].image,
                          categories: category,
                          lotshot: products,
                          latest: latest,
                          trending: trend,
                          allProduct: allProduct
                        });
                      }
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

/** Getting the category products */

router.post("/get-product-by-category",[check("category_id").isNumeric()],(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({ status: "0", message: "Enter Valid Data" });
    } else {
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
        "select category_id,name,ifnull(image,'') as image,parent_id from category where is_display=1";
      con.query(sql, (err, category) => {
        if (err) {
          console.log(err);
        } else {
          categories = category;
          sql =
            "select v.variant_id,v.name,v.price,IFNULL((select sum(quantity) from variant_mobile where variant_id=v.variant_id),-1) as sum_quantity,(select count(mobile_id) from variant_mobile where variant_id=v.variant_id) as count,v.discount,v.quantity,t.tax,v.thumbnail,v.product_id from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.product_id=v.product_id and p.category_id=18 and p.is_display=1 order by v.added_on limit 0,5 ";
          con.query(sql, (err, products) => {
            if (err) {
              console.log(err);
            } else {
              products = products;
              sql =
                "select v.variant_id,v.name,v.price,IFNULL((select sum(quantity) from variant_mobile where variant_id=v.variant_id),-1) as sum_quantity,(select count(mobile_id) from variant_mobile where variant_id=v.variant_id) as count,v.discount,v.quantity,t.tax,v.list_image,v.product_id from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.category_id in (select category_id from category where category_id="+req.body.category_id+" or parent_id="+req.body.category_id+") and p.product_id=v.product_id and p.is_display=1 and v.parent=1 order by v.added_on DESC limit 0,5";
              con.query(sql, (err, latest) => {
                if (err) {
                  console.log(err);
                }
                let trend;
                sql =
                  "select v.variant_id,v.name,v.price,IFNULL((select sum(quantity) from variant_mobile where variant_id=v.variant_id),-1) as sum_quantity,(select count(mobile_id) from variant_mobile where variant_id=v.variant_id) as count,v.discount,v.quantity,v.discount,t.tax,v.list_image,v.product_id from product p,product_variant v,tax t where t.tax_id=v.tax_id andp.category_id in (select category_id from category where category_id="+req.body.category_id+" or parent_id="+req.body.category_id+") and p.product_id=v.product_id and p.is_display=1 and v.parent=1 order by v.order_count DESC limit 0,5";
                con.query(sql, (err, trending) => {
                  if (err) {
                    console.log(err);
                  } else {
                    sql =
                      "select v.variant_id,v.name,v.price,IFNULL((select sum(quantity) from variant_mobile where variant_id=v.variant_id),-1) as sum_quantity,(select count(mobile_id) from variant_mobile where variant_id=v.variant_id) as count,v.discount,v.quantity,t.tax,v.list_image,v.product_id from product p,product_variant v,tax t where t.tax_id=v.tax_id and p.category_id in (select category_id from category where category_id="+req.body.category_id+" or parent_id="+req.body.category_id+") and p.product_id=v.product_id and p.is_display=1 and v.parent=1 order by v.modified_date DESC limit 0,5";
                    con.query(sql, (err, allProduct) => {
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
                          if (data.length > 0) {
                            products[i].thumbnail =
                              process.env.THUMBNAIL + data[0];
                          } else {
                            products[i].thumbnail = "";
                          }
                          if(products[i].count>0){
                            if(products[i].sum_quantity>0){
                              products[i].Is_Out_Of_Stock=0;
                            } else {
                              products[i].Is_Out_Of_Stock=1;
                            }
                          } else {
                            if(products[i].quantity>0){
                              products[i].Is_Out_Of_Stock=0;
                            } else {
                              products[i].Is_Out_Of_Stock=1;
                            }
                          }
                          products[i].mrp =
                            products[i].price +
                            (products[i].price * products[i].discount) / 100;
                        }
                        for (let i = 0; i < allProduct.length; i++) {
                          let data = JSON.parse(allProduct[i].list_image);
                          if (data.length > 0) {
                            allProduct[i].list_image =
                              process.env.LISTIMAGE + data[0];
                          } else {
                            allProduct[i].list_image = "";
                          }
                          if(allProduct[i].count>0){
                            if(allProduct[i].sum_quantity>0){
                              allProduct[i].Is_Out_Of_Stock=0;
                            } else {
                              allProduct[i].Is_Out_Of_Stock=1;
                            }
                          } else {
                            if(allProduct[i].quantity>0){
                              allProduct[i].Is_Out_Of_Stock=0;
                            } else {
                              allProduct[i].Is_Out_Of_Stock=1;
                            }
                          }
                          allProduct[i].mrp =
                            allProduct[i].price +
                            (allProduct[i].price * allProduct[i].discount) /
                              100;
                        }
                        for (let i = 0; i < trend.length; i++) {
                          let data = JSON.parse(trend[i].list_image);
                          if (data.length > 0) {
                            trend[i].list_image =
                              process.env.LISTIMAGE + data[0];
                          } else {
                            trend[i].list_image = "";
                          }
                          if(trend[i].count>0){
                            if(trend[i].sum_quantity>0){
                              trend[i].Is_Out_Of_Stock=0;
                            } else {
                              trend[i].Is_Out_Of_Stock=1;
                            }
                          } else {
                            if(trend[i].quantity>0){
                              trend[i].Is_Out_Of_Stock=0;
                            } else {
                              trend[i].Is_Out_Of_Stock=1;
                            }
                          }
                          trend[i].mrp =
                            trend[i].price +
                            (trend[i].price * trend[i].discount) / 100;
                        }

                        for (let i = 0; i < banners.length; i++) {
                          banners[i].image =
                            process.env.BANNER + banners[i].image;
                        }

                        for (let i = 0; i < latest.length; i++) {
                          let data = JSON.parse(latest[i].list_image);
                          if (data.length > 0) {
                            latest[i].list_image =
                              process.env.LISTIMAGE + data[0];
                          } else {
                            latest[i].list_image = "";
                          }
                          if(latest[i].count>0){
                            if(latest[i].sum_quantity>0){
                              latest[i].Is_Out_Of_Stock=0;
                            } else {
                              latest[i].Is_Out_Of_Stock=1;
                            }
                          } else {
                            if(latest[i].quantity>0){
                              latest[i].Is_Out_Of_Stock=0;
                            } else {
                              latest[i].Is_Out_Of_Stock=1;
                            }
                          }
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

                        json = JSON.stringify(allProduct);
                        allProduct = JSON.parse(json, (key, val) =>
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
                        offers = banners.filter(
                          item => item.banner_type == "1"
                        );

                        banners = banners.filter(
                          item => item.banner_type == "0"
                        );
                        res.status(200).json({
                          status: "1",
                          message: "Getting homepage data successfully.",
                          banners: banners,
                          offers: offers[0].image,
                          categories: category,
                          lotshot: products,
                          latest: latest,
                          trending: trend,
                          allProduct: allProduct
                        });
                      }
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
    }
});

module.exports = router;
