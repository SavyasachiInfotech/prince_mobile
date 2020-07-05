const express = require("express");
const router = express.Router();
const con = require("../database-connection");
const limit = process.env.RECORD_LIMIT;
const auth = require("../auth");

router.get("/support-detail", auth.verifyToken, (req, res) => {
  let sql = "select * from support where id=1";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ status: "0", message: "Support detail not found" });
    }
    if (result && result.length) {
      let data = {};
      data.whatsapp_link = result[0].whatsapp_link;
      data.mobiles = JSON.parse(result[0].mobiles);
      return res.json({
        status: "1",
        message: "Support detail getting successfully.",
        data: data
      });
    } else {
      return res.json({ status: "0", message: "Support detail not found" });
    }
  });
});

module.exports = router;
