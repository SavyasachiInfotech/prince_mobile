const jwt = require("jsonwebtoken");
const con = require("./database-connection");

module.exports = {
  async verifyToken(req, res, next) {
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
    let sql =
      "select * from customer where id=" + payload.subject + " and block_bit=1";
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          res.status(200).json({
            status: "0",
            message: "Your account is blocked by admin."
          });
        } else {
          next();
        }
      }
    });
  }
};
