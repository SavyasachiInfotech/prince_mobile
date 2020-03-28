const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;
var app = express();
const auth = require("../auth");

router.post(
  "/search-products",
  [check("search").isString(), check("pageno").isNumeric()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({ status: "0", message: "Give the valid data" });
    } else {
      let search = req.body.search;
      let pageno = req.body.pageno;
      search = search.trim();
      pageno = (pageno - 1) * limit;
      let searchData = search.split(" ");
      let mobileSearch = getQueryForSearch("model_name", searchData);
      let descriptionSearch = getQueryForSearch("p.description", searchData);
      let variantSearch = getQueryForSearch("v.name", searchData);
      let sql =
        "select distinct(v.variant_id),v.name,v.price,v.discount,t.tax,v.list_image,v.product_id from product p,product_variant v,tax t,category c where t.tax_id=v.tax_id and p.product_id=v.product_id and p.is_display=1 and v.parent=1 and p.category_id=c.category_id  and (c.name like '%" +
        search +
        "%' or p.description like '%" +
        search +
        "%' or v.name like '%" +
        search +
        "%') or v.variant_id in (select distinct(vm.variant_id) from variant_mobile vm, mobile_models m where( m.model_name like '%" +
        search +
        "%' " +
        mobileSearch +
        " ) and vm.mobile_id=m.model_id ) " +
        descriptionSearch +
        " " +
        variantSearch +
        " limit " +
        pageno +
        "," +
        limit;
      console.log(sql);
      let countSql =
        "select count(distinct(v.variant_id)) as total from product p,product_variant v,category c where p.product_id=v.product_id and p.is_display=1 and v.parent=1 and v.parent=1 and p.category_id=c.category_id and (c.name like '" +
        search +
        "%' or  p.description like '%" +
        search +
        "%' or v.name like '%" +
        search +
        "%') or v.variant_id in (select distinct(vm.variant_id) from variant_mobile vm, mobile_models m where m.model_name like '%" +
        search +
        "%' " +
        mobileSearch +
        " and vm.mobile_id=m.model_id ) " +
        descriptionSearch +
        " " +
        variantSearch;
      con.query(countSql, (err, data) => {
        if (err) {
          console.log(err);
          res.status(200).json({
            status: "0",
            message: "No items found for searched value."
          });
        } else {
          if (data[0].total == 0) {
            res.status(200).json({
              status: "0",
              message: "No items found for searched value."
            });
          } else {
            con.query(sql, (err, result) => {
              if (err) {
                console.log(err);
                res.status(200).json({
                  status: "0",
                  message: "No items found for searched value."
                });
              } else {
                for (let i = 0; i < result.length; i++) {
                  let image = JSON.parse(result[i].list_image);
                  if (image.length > 0) {
                    result[i].list_image = process.env.LISTIMAGE + image[0];
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
                let totalPages = Math.ceil(data[0].total / limit);
                console.log(totalPages);
                res.status(200).json({
                  status: "1",
                  message: "Getting Products successfully.",
                  products: result,
                  currentPage: (pageno + 1).toString(),
                  totalPages: totalPages.toString(),
                  totalProduct: data[0].total.toString()
                });
              }
            });
          }
        }
      });
    }
  }
);

function getQueryForSearch(key, searchData) {
  let sql = "";
  let i = 0;
  if (searchData.length == 1) {
    i = 1;
  }
  for (; i < searchData.length; i++) {
    sql += "or " + key + "like '%" + searchData[i] + "%' ";
  }

  return sql;
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
                  if (data.flag == 0) {
                    if (data.category_id > 0) {
                      sql =
                        "select * from category where category_id=" +
                        data.category_id;
                      con.query(sql, (err, category) => {
                        let totalPages = Math.ceil(count[0].total / limit);
                        let images;
                        if (category.length > 0) {
                          images = JSON.parse(category[0].promo_images);
                        } else {
                          images = [];
                        }
                        for (let i = 0; i < images.length; i++) {
                          images[i] = {
                            image: process.env.CATEGORY + images[i]
                          };
                        }
                        if (result.length > 0) {
                          res.status(200).json({
                            status: "1",
                            message: "Getting Products successfully.",
                            products: result,
                            currentPage: (parseInt(data.pageno) + 1).toString(),
                            totalPages: totalPages.toString(),
                            totalProduct: count[0].total.toString(),
                            category_image: images
                          });
                        } else {
                          res.status(200).json({
                            status: "0",
                            message: "No Products available."
                          });
                        }
                      });
                    }
                  } else {
                    let totalPages = Math.ceil(count[0].total / limit);
                    if (result.length > 0) {
                      res.status(200).json({
                        status: "1",
                        message: "Getting Products successfully.",
                        products: result,
                        currentPage: (data.pageno + 1).toString(),
                        totalPages: totalPages.toString(),
                        totalProduct: count[0].total.toString(),
                        category_image: []
                      });
                    } else {
                      res.status(200).json({
                        status: "0",
                        message: "No Products available."
                      });
                    }
                  }
                }
              });
            }
          });
        }
      }
    }
  }
);

router.post(
  "/get-product-detail",
  [check("id").isNumeric()],
  auth.verifyToken,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: process.env.ERROR,
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let id = req.body.id;
      let sql =
        "select v.variant_id,v.name,p.description,IFNULL((select sum(quantity) from variant_mobile where variant_id=v.variant_id),-1) as sum_quantity,(select count(mobile_id) from variant_mobile where variant_id=v.variant_id) as countQuantity,c.name as category,IFNULL((select quantity from cart where variant_id=v.variant_id and mobile_required=0 and cart_id=" +
        req.userId +
        "),0) as cart_quantity,v.price,v.discount,v.min_qty,v.quantity,v.extra_detail,v.avg_rating,v.main_image,t.tax,v.image_required,c.mobile_required from product_variant v, product p, tax t,category c where t.tax_id=v.tax_id and p.product_id=v.product_id and c.category_id=p.category_id and p.product_id=v.product_id and v.variant_id=" +
        id;
      con.query(sql, (err, products) => {
        if (err) {
          console.log(err);
          res
            .status(200)
            .json({ status: "0", message: "Provide valid product id" });
        } else {
          if (products.length > 0) {
            sql =
              "select a.attribute_id,a.name,av.value,av.attribute_value_id,v.variant_id from attribute a,attribute_value av,variant_attribute v where a.attribute_id=av.attribute_id and av.attribute_value_id=v.attribute_value_id and v.variant_id =" +
              id;
            con.query(sql, (err, attributes) => {
              if (err) {
                console.log(err);
                res
                  .status(200)
                  .json({ status: "0", message: "Enter valid Product." });
              } else {
                let colorAttributes = attributes.filter(
                  att => att.attribute_id == 2
                );
                let sizeAttributes = attributes.filter(
                  att => att.attribute_id == 1
                );

                sql =
                  "select specification_key,specification_value,variant_id from product_specification where variant_id=" +
                  id;
                con.query(sql, (err, specifications) => {
                  if (err) {
                    console.log(err);
                    res
                      .status(200)
                      .json({ status: "0", message: "Enter valid Product." });
                  } else {
                    sql =
                      "select vm.variant_id,vm.mobile_id,vm.quantity as max_quantity,IFNULL((select quantity from  cart where cart_id=" +
                      req.userId +
                      " and variant_id=v.variant_id and mobile_id=m.model_id),0) as cart_quantity,v.min_qty,m.model_name,vm.price,vm.discount from variant_mobile vm,product_variant v,mobile_models m where m.model_id=vm.mobile_id and vm.variant_id=" +
                      id +
                      " and v.variant_id=" +
                      id;
                    con.query(sql, (err, mobiles) => {
                      let net_total = 0;
                      if (err) {
                        console.log(err);
                      } else {
                        if (mobiles.length < 1) {
                          mobiles.push({
                            variant_id: id,
                            mobile_id: 0,
                            max_quantity: products[0].quantity,
                            model_name: products[0].name,
                            price: products[0].price,
                            discount: products[0].discount,
                            min_qty: products[0].min_qty,
                            cart_quantity: products[0].cart_quantity
                          });
                          products[0].mobile_required = 0;
                          delete products[0].cart_quantity;
                        } else {
                          products[0].mobile_required = 1;
                        }
                        let displayMobiles = new Array();
                        for (let i = 0; i < mobiles.length; i++) {
                          net_total =
                            net_total + mobiles[i].min_qty * mobiles[i].price;
                          if (mobiles[i].max_quantity > 0) {
                            displayMobiles.push(mobiles[i]);
                          }
                        }
                        mobiles = displayMobiles;
                        sql =
                          "select v.variant_id,v.thumbnail from product_variant v where v.variant_id!=" +
                          id +
                          " and v.product_id=(select product_id from product_variant where variant_id=" +
                          id +
                          ")";
                        con.query(sql, (err, variant) => {
                          if (err) {
                            console.log(err);
                          } else {
                            sql =
                              "select p.code,p.description from promocode p,product_variant v where v.variant_id=" +
                              products[0].variant_id +
                              " and (p.id=v.promo_id or p.type=1 )";
                            con.query(sql, (err, promo) => {
                              if (err) {
                                res.status(200).json({
                                  status: "0",
                                  message: "Offers not detected"
                                });
                              } else {
                                if (products[0].image_required == 1) {
                                  products[0].tnc_to_buy =
                                    "<div><ul><li>Make online payment</li></ul></div>";
                                  products[0].how_to_buy =
                                    "<div><ul><li>First you need to Pay for buying product</li><li>After successful payment you will get order id</li><li>You need to send your image with order id to us in chat</li></ul></div>";
                                } else {
                                  products[0].tnc_to_buy = "";
                                  products[0].how_to_buy = "";
                                }
                                if (promo.length > 0) {
                                  products[0].offers = new Array();
                                  for (let i = 0; i < promo.length; i++) {
                                    products[0].offers.push({
                                      offer_code: promo[i].code,
                                      offer_detail: promo[i].description
                                    });
                                  }
                                } else {
                                  products[0].offers = [];
                                }

                                for (let i = 0; i < products.length; i++) {
                                  products[i].mobiles = mobiles.filter(
                                    item =>
                                      item.variant_id == products[i].variant_id
                                  );
                                  for (
                                    let j = 0;
                                    j < products[i].mobiles.length;
                                    j++
                                  ) {
                                    products[i].mobiles[j].mrp =
                                      products[i].mobiles[j].price +
                                      (products[i].mobiles[j].price *
                                        products[i].mobiles[j].discount) /
                                        100;
                                    products[i].mobiles[j].category =
                                      products[i].category;
                                  }
                                  products[i].mrp =
                                    products[i].price +
                                    (products[i].price * products[i].discount) /
                                      100;
                                  products[i].main_image = JSON.parse(
                                    products[i].main_image
                                  );
                                  for (
                                    let j = 0;
                                    j < products[i].main_image.length;
                                    j++
                                  ) {
                                    products[i].main_image[j] = {
                                      image:
                                        process.env.MAINIMAGE +
                                        products[i].main_image[j]
                                    };
                                  }
                                  // products[i].attributes = attributes.filter(
                                  //   item =>
                                  //     item.variant_id == products[i].variant_id
                                  // );
                                  products[i].colorAttributes = colorAttributes;
                                  products[i].sizeAttributes = sizeAttributes;
                                  products[
                                    i
                                  ].specifications = specifications.filter(
                                    item =>
                                      item.variant_id == products[i].variant_id
                                  );
                                }
                                products[0].colors = variant;
                                for (let i = 0; i < variant.length; i++) {
                                  let data = JSON.parse(variant[i].thumbnail);
                                  variant[i].thumbnail =
                                    process.env.THUMBNAIL + data[0];
                                }
                                sql =
                                  "select * from cart where cart_id=" +
                                  req.userId +
                                  " and variant_id=" +
                                  id;
                                con.query(sql, (err, data) => {
                                  if (err) {
                                    console.log(err);
                                    res.json({
                                      status: "0",
                                      message: "Product detail not found"
                                    });
                                  } else {
                                    if (data.length > 0) {
                                      products[0].is_added_cart = "1";
                                    } else {
                                      products[0].is_added_cart = "0";
                                    }
                                    if (products[0].countQuantity > 0) {
                                      if (products[0].sum_quantity > 0) {
                                        products[0].Is_Out_Of_Stock = 0;
                                      } else {
                                        products[0].Is_Out_Of_Stock = 1;
                                      }
                                    } else {
                                      if (products[0].countQuantity > 0) {
                                        products[0].Is_Out_Of_Stock = 0;
                                      } else {
                                        products[0].Is_Out_Of_Stock = 1;
                                      }
                                    }
                                    json = JSON.stringify(products);
                                    products = JSON.parse(json, (key, val) =>
                                      typeof val !== "object" && val !== null
                                        ? String(val)
                                        : val
                                    );
                                    res.status(200).json({
                                      status: "1",
                                      message:
                                        "Getting product detail successfully.",
                                      products: products,
                                      net_total: net_total.toString()
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
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
  }
);

module.exports = router;
