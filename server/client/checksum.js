"use strict";
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult, param } = require("express-validator");
const con = require("../database-connection");
var paytm_config = require("./paytm/paytm_config").paytm_config;
var paytm_checksum = require("./paytm/checksum");
var querystring = require("querystring");

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

router.post("/generate_checksum", verifyToken, (req, res) => {
  var paramarray = {};
  paramarray["MID"] = process.env.MID; //Provided by Paytm
  paramarray["ORDER_ID"] = "ORDER00001"; //unique OrderId for every request
  paramarray["CUST_ID"] = "CUST0001"; // unique customer identifier
  paramarray["INDUSTRY_TYPE_ID"] = process.env.INDUTYPEID; //Provided by Paytm
  paramarray["CHANNEL_ID"] = process.env.CHANNELID; //Provided by Paytm
  paramarray["TXN_AMOUNT"] = "1.00"; // transaction amount
  paramarray["WEBSITE"] = process.env.WEBSITE; //Provided by Paytm
  paramarray["CALLBACK_URL"] =
    "https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp"; //Provided by Paytm
  paramarray["EMAIL"] = "abc@gmail.com"; // customer email id
  paramarray["MOBILE_NO"] = "9999999999"; // customer 10 digit mobile no.
  paytm_checksum.genchecksum(paramarray, paytm_config.MERCHANT_KEY, function(
    err,
    checksum
  ) {
    console.log("Checksum: ", checksum, "\n");
    response.writeHead(200, {
      "Content-type": "text/json",
      "Cache-Control": "no-cache"
    });
    response.write(JSON.stringify(checksum));
    response.end();
  });
});

router.post("/verify_checksum", verifyToken, (req, res) => {
  var fullBody = "";
  request.on("data", function(chunk) {
    fullBody += chunk.toString();
  });
  request.on("end", function() {
    var decodedBody = querystring.parse(fullBody);

    console.log(decodedBody);

    // get received checksum
    var checksum = decodedBody.CHECKSUMHASH;

    // remove this from body, will be passed to function as separate argument
    delete decodedBody.CHECKSUMHASH;

    response.writeHead(200, {
      "Content-type": "text/html",
      "Cache-Control": "no-cache"
    });
    if (
      paytm_checksum.verifychecksum(
        decodedBody,
        paytm_config.MERCHANT_KEY,
        checksum
      )
    ) {
      console.log("Checksum Verification => true");
      response.write("Checksum Verification => true");
    } else {
      console.log("Checksum Verification => false");
      response.write("Checksum Verification => false");
    }
    // if checksum is validated Kindly verify the amount and status
    // if transaction is successful
    // kindly call Paytm Transaction Status API and verify the transaction amount and status.
    // If everything is fine then mark that transaction as successful into your DB.

    response.end();
  });
});

function htmlEscape(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
module.exports = router;
