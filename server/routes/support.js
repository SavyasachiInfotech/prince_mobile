const express = require("express");
const router = express.Router();
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;
const auth = require("../auth");

router.post("/update-support", auth.verifyToken, (req, res) => {
  let sql = `update support set mobiles='${(req.body,
  mobiles)}', whatsapp_link='${req.body.whatsapp_link}' where id=1`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.json({ status: 400, message: "Support data not updated." });
    }

    return res.json({
      status: 200,
      message: "Support data updated successfully."
    });
  });
});

router.get("", auth.verifyToken, (req, res) => {
  let sql = "select * from support where id=1";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.json({ status: 200, message: "Get support detail failed." });
    }

    return res.json({
      status: 200,
      message: "Getting support detail sucessfully.",
      data: result
    });
  });
});

module.exports = router;
