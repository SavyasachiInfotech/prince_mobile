const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;
const path = require("path");

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

router.get(
  "/get-variants/:id",
  [param("id").isNumeric()],
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
        "select * from product_variant where product_id=" + req.params.id;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json({
            status: process.env.ERROR,
            message: "Product variants not found."
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Variants getting successfully.",
            data: result
          });
        }
      });
    }
  }
);

router.get(
  "/get-variant/:id",
  [param("id").isNumeric()],
  verifyToken,
  (req, res) => {
    let sql = "select * from product_variant where variant_id=" + req.params.id;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ status: 200, data: result });
      }
    });
  }
);

router.post(
  "/add-variants",
  [
    check("product_id").isNumeric(),
    check("name").isString(),
    check("price").isFloat(),
    check("discount").isFloat(),
    check("quantity").isNumeric(),
    check("parent").isBoolean(),
    check("accept_promocode").isBoolean(),
    check("min_qty").isNumeric(),
    check("tax_id").isNumeric(),
    check("image_required").isBoolean()
  ],
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
      let variant = req.body;
      let sql =
        "insert into product_variant(product_id,name,price,discount,quantity,parent,accept_promocode,min_qty,tax_id,image_required,thumbnail,list_image,view_image,main_image) values(" +
        variant.product_id +
        ',"' +
        variant.name +
        '",' +
        variant.price +
        "," +
        variant.discount +
        "," +
        variant.quantity +
        "," +
        variant.parent +
        "," +
        variant.accept_promocode +
        "," +
        variant.min_qty +
        "," +
        variant.tax_id +
        "," +
        variant.image_required +
        ",'[]','[]','[]','[]')";
        con.query(sql, (err, result) => {
          console.log(result)
          if (err) {
            console.log(err);
            res
              .status(200)
              .json({ status: 400, message: "Variant is not added" });
          } else {
            let spec=variant.specifications;
           
              sql="insert into product_specification values";
              for(let i=0;i<spec.length;i++){
                sql+="("+result.insertId+","+spec[i]+")";
                if(i==spec.length-1){
                  sql+";"
                } else {
                  sql+=", ";
                }
              }
              console.log(sql)
              con.query(sql,(err,data)=>{
                if(err){
                  res
                  .status(200)
                  .json({ status: 200, message: "Variant is adde successfully." });
                } else {
                  let att=variant.attributes;
           
                  sql="insert into variant_attribute values";
                  for(let i=0;i<att.length;i++){
                    sql+="("+result.insertId+","+att[i]+")";
                    if(i==att.length-1){
                      sql+=";";
                    } else {
                      sql+=", ";
                    }
                  }
                  console.log(sql)
                  con.query(sql,(err,data)=>{
                    res
                    .status(200)
                    .json({ status: 200, message: "Variant is adde successfully." });
                  });
                }
              });
          }
        });
      }
    }
  );
  

router.post('/get-attributes',[check("id").isNumeric()],verifyToken,(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(200).json({
      status: process.env.ERROR,
      message: "Invalid Input Found",
      errors: errors.array()
    });
  } else {
    let sql="select v.attribute_value_id as value_id,av.value,av.attribute_id as att_id,a.name as att_name from variant_attribute v, attribute_value av, attribute a where v.attribute_value_id=av.attribute_value_id and av.attribute_id=a.attribute_id and v.variant_id="+req.body.id;
    con.query(sql,(err,result)=>{
      if(err){
        console.log(err);
        res.status(200).json({status:400, message:"Attributes not found"});
      } else {
        sql="select s.* from product_specification ps,specification s where s.specification_id=ps.specification_id and ps.variant_id="+req.body.id;
        con.query(sql,(err,data)=>{
          if(err){
            console.log(err);
            res.status(200).json({status:400, message:"Specification not found"});
          } else {
            res.status(200).json({status:200, message:"Getting attribute successfully", attributes:result, specifications:data});
          }
        });
      }
    });
  }
});


router.put(
  "/update-variant",
  [
    check("variant_id").isNumeric(),
    check("product_id").isNumeric(),
    check("name").isString(),
    check("price").isFloat(),
    check("discount").isFloat(),
    check("quantity").isNumeric(),
    check("parent").isBoolean(),
    check("accept_promocode").isBoolean(),
    check("min_qty").isNumeric(),
    check("tax_id").isNumeric(),
    check("image_required").isBoolean()
  ],
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
      let variant = req.body;
      let sql =
        'update product_variant set name="' +
        variant.name +
        '", price=' +
        variant.price +
        ", discount=" +
        variant.discount +
        ",quantity=" +
        variant.quantity +
        ",parent=" +
        variant.parent +
        ",accept_promocode=" +
        variant.accept_promocode +
        ",min_qty=" +
        variant.min_qty +
        ",tax_id=" +
        variant.tax_id +
        ",image_required=" +
        variant.image_required +
        " where product_id=" +
        variant.product_id +
        " and variant_id=" +
        variant.variant_id;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(200).json({
            status: 400,
            message: "Variant is not updated successfully."
          });
        } else {
          sql="delete from product_specification where variant_id="+variant.variant_id;
          con.query(sql,(err,ddata)=>{
            if(err){
              res
            .status(200)
            .json({ status: 200, message: "Variant updated successfully." });
            } else {
              spec=variant.specifications;
              sql="insert into product_specification values";
              for(let i=0;i<spec.length;i++){
                sql+="("+variant.variant_id+","+spec[i]+")";
                if(i==spec.length-1){
                  sql+";"
                } else {
                  sql+=", ";
                }
              }
              con.query(sql,(err,sdata)=>{
                if(err){
                  res
                    .status(200)
                    .json({ status: 200, message: "Variant updated successfully." });
                } else {
                  sql="delete from variant_attribute where variant_id="+variant.variant_id;
                  con.query(sql,(err,ddata)=>{
                    if(err){
                      res
                        .status(200)
                        .json({ status: 200, message: "Variant updated successfully." });
                    } else {
                      let att=variant.attributes;
                      sql="insert into variant_attribute values";
                      for(let i=0;i<att.length;i++){
                        sql+="("+variant.variant_id+","+att[i]+")";
                        if(i==att.length-1){
                          sql+=";";
                        } else {
                          sql+=", ";
                        }
                      }
                      con.query(sql,(err,adata)=>{
                        res
                        .status(200)
                        .json({ status: 200, message: "Variant updated successfully." });
                      });
                    }
                  });
                }
              });
            }
          })
          
        }
      });
    }
  }
);

module.exports = router;
