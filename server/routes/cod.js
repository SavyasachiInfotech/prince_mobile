const express = require("express");
const auth = require("../auth");
const router = express.Router();
const con = require("../database-connection");
const cod = require("../codCharge");

router.get("", auth.verifyToken, async (req, res) => {
  let codCharge = await cod.getCodCharge();
  res.json({
    status: 200,
    message: "Getting cod charge successfully.",
    data: { codCharge: codCharge }
  });
});

router.put("/change-cod-charge", auth.verifyToken, (req, res) => {
  let sql = "update meta set meta_value=" + req.body.codCharge + " where id=1";
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ status: 400, message: "Cod charge not updated." });
    } else {
      res.json({ status: 200, message: "Cod charge updated successfully." });
    }
  });
});

module.exports = router;
