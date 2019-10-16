const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;
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
router.post("/add-cart", verifyToken, (req, res) => {
  let cart = req.body.cart;
  let sql =
    "insert into cart(cart_id,variant_id,quantity,mobile_required,mobile_id) values";
  for (let i = 0; i < cart.length; i++) {
    if (
      isNaN(cart[i].variant_id) ||
      isNaN(cart[i].quantity) ||
      isNaN(cart[i].mobile_id) ||
      isNaN(cart[i].mobile_required)
    ) {
      res.json(200).json({ status: "0", message: "Enter valid data" });
      break;
    } else {
      if (i == cart.length - 1) {
        sql +=
          "(" +
          req.userId +
          "," +
          cart[i].variant_id +
          "," +
          cart[i].quantity +
          "," +
          cart[i].mobile_required +
          "," +
          cart[i].mobile_id +
          ");";
      } else {
        sql +=
          "(" +
          req.userId +
          "," +
          cart[i].variant_id +
          "," +
          cart[i].quantity +
          "," +
          cart[i].mobile_required +
          "," +
          cart[i].mobile_id +
          "),";
      }
    }
  }

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({
        status: "0",
        message: "Cart is not added. Please try again later."
      });
    } else {
      res.status(200).json({
        status: "1",
        message: "Cart is added successfully."
      });
    }
  });
});

router.put(
  "/update-quantity",
  [check("item_id").isNumeric(), check("quantity").isNumeric()],
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
      let data = req.body;
      let sql =
        "update cart set quantity=" +
        data.quantity +
        " where item_id=" +
        data.item_id +
        " and cart_id=" +
        req.userId;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res
            .status(200)
            .json({ status: "0", message: "Provide valid cart data" });
        } else {
          res.status(200).json({
            status: "1",
            message: "Cart's quantity updated successfully."
          });
        }
      });
    }
  }
);

router.post(
  "/remove-cart-item",
  [check("item_id").isNumeric()],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: "0",
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let item_id = req.body.item_id;
      let sql =
        "delete from cart where item_id=" +
        item_id +
        " and cart_id=" +
        req.userId;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json({ status: "0", message: "Provide valid cart" });
        } else {
          res
            .status(200)
            .json({ status: "1", message: "Cart item removed successfully." });
        }
      });
    }
  }
);

router.get("/get-cart-detail", verifyToken, (req, res) => {
  let sql =
    "select c.item_id,c.variant_id,v.name,c.quantity,v.list_image,v.price,v.discount,t.tax,c.mobile_required,m.model_name from cart c, product_variant v,tax t,mobile_models m where c.cart_id=" +
    req.userId +
    " and  c.variant_id=v.variant_id and v.tax_id=t.tax_id and c.mobile_id=m.model_id";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({ status: "0", message: "Enter valid user token" });
    } else {
      sql = "select * from promocode where type=1";
      con.query(sql, (err, promo) => {
        if (err) {
          console.log(err);
        }
        let image;
        for (let i = 0; i < result.length; i++) {
          result[i].mrp =
            result[i].price + (result[i].price * result[i].discount) / 100;
          image = JSON.parse(result[i].list_image);
          if (image.length > 0) {
            result[i].list_image = process.env.LISTIMAGE + image[0];
          } else {
            result[i].list_image = "";
          }
        }
        json = JSON.stringify(result);
        result = JSON.parse(json, (key, val) =>
          typeof val !== "object" && val !== null ? String(val) : val
        );
        json = JSON.stringify(promo);
        promo = JSON.parse(json, (key, val) =>
          typeof val !== "object" && val !== null ? String(val) : val
        );
        res.status(200).json({
          status: "1",
          message: "Getting Cart Details Successfully.",
          data: result,
          offers_detail: promo
        });
      });
    }
  });
});

router.post(
  "/apply-promocode",
  [check("promo_id").isNumeric()],
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: "0",
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let promo = req.body.promo_id;
      let sql =
        "select count(promo_id) as count,(select max_attempt from promocode where id=" +
        promo +
        ") as max_attempt from customer_order where promo_id=" +
        promo +
        " and user_id=" +
        req.userId;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res
            .status(200)
            .json({ status: "0", message: "Promocode not applied." });
        } else {
          if (result.length > 0) {
            if (result[0].count < result[0].max_attempt) {
              res
                .status(200)
                .json({
                  status: "1",
                  message: "Promocode applied successfully."
                });
            } else {
              res
                .status(200)
                .json({
                  status: "0",
                  message: "You already used this promocode"
                });
            }
          } else {
            res
              .status(200)
              .json({ status: "0", message: "Please enter valid promocode." });
          }
        }
      });
    }
  }
);


router.post("/get-delivery-charge",[check("product").isArray()],verifyToken,(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: "0",
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
      let product=req.body.product;
      if(product.length>0){
        res.status(200).json({status:"1",message:"Getting the delivery charge successfully.",deliveryCharge:70});
      } else {
        res.status(200).json({status:"0",message:"Please enter the products"});
      }
    }
});

module.exports = router;
