const con = require("./database-connection");

module.exports = {
  async getCodCharge() {
    let codCharge = await new Promise((resolve, reject) => {
      con.query(
        'select * from meta where user_id=0 and meta_key="cod_charge"',
        (err, result) => {
          if (err) {
            console.log(err);
            resolve(50);
          } else {
            resolve(parseInt(result[0].meta_value));
          }
        }
      );
    });

    return codCharge;
  }
};
