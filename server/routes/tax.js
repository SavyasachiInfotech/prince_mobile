const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  check,
  validationResult,
  sanitizeParam,
  param
} = require("express-validator");
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

router.get("/",verifyToken,(req,res)=>{
    let sql="select * from tax";
    con.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            res.status(200).json({status:400, message:"Taxes not found"});
        } else {
            res.status(200).json({status:200, message:"Getting taxes successfully.",data:result});
        }
    });
}); 

router.post("/add-tax",[check("tax").isNumeric(),check("name").isString()],verifyToken,(req,res)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(200).json({
      status: process.env.ERROR,
      message: "Invalid Input Found",
      errors: errors.array()
    });
  } else {
    let data=req.body;
    let sql="insert into tax(tax,name) values("+data.tax+",'"+data.name+"')";
    con.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            res.status(200).json({status:400, message:"Tax not added"});
        } else {
            res.status(200).json({status:200, message:"Tax added successfully"});
        }
    });
  }
});

router.post("/update-tax",[check("tax_id").isNumeric(),check("tax").isNumeric(),check("name").isString()],verifyToken,(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: process.env.ERROR,
        message: "Invalid Input Found",
        errors: errors.array()
      });
    } else {
        let tax=req.body;
        let sql="update tax set tax="+tax.tax+" , name='"+tax.name+"' where tax_id="+tax.tax_id;
        con.query(sql,(err,result)=>{
            if(err){
                console.log(err);
                res.status(200).json({status:400, message:"Tax not updated"});
            } else {
                res.status(200).json({status:200, message:"Tax updated successfully"});
            }
        });
    }
});


module.exports=router;