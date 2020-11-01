const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const axios = require('axios');
const port = 3000;
const api = require("./server/api");
const con = require("./server/database-connection");
var compression = require("compression");
var CronJob = require('cron').CronJob;
const notification = require('./server/client/send-notification');
require("dotenv").config();
const app = express();

// compress all responses
app.use(compression());
//Enables cors request
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "dist/admin")));
app.use(express.static(path.join(__dirname, "server/assets")));
//app.use("/images", express.static(path.join(__dirname, "server/assets")));
app.use(
  "/banners",
  express.static(path.join(__dirname, "server/assets/banners"))
);
app.use(
  "/category",
  express.static(path.join(__dirname, "server/assets/categories"))
);
app.use(
  "/thumbnail",
  express.static(path.join(__dirname, "server/assets/thumbnail"))
);
app.use(
  "/list-image",
  express.static(path.join(__dirname, "server/assets/list_image"))
);
app.use(
  "/view-image",
  express.static(path.join(__dirname, "server/assets/view_image"))
);
app.use(
  "/main-image",
  express.static(path.join(__dirname, "server/assets/main_image"))
);
app.use(
  "/profile",
  express.static(path.join(__dirname, "server/assets/profile"))
);
app.use(
  "/return",
  express.static(path.join(__dirname, "server/assets/return"))
);
app.use("/info", express.static(path.join(__dirname, "server/assets")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", api);

// app.get("/terms", function(req, res) {
//   res.sendFile(path.join(__dirname, "server/assets/termscondition.html"));
// });

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/admin/index.html"));
});

function startJob() {
  var job = new CronJob('* * * * *', function () {
    // 00 00 00 * * *
    /*
     * Runs every day
     * at 00:00:00 AM. 
     */
    // DO SOMETHING
    con.query(
      'select * from customer_order where status_id=2',
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          for (i = 0; i < Math.ceil(result.length / 10); i++) {
            var shipment_ids = [];
            let length = ((i + 1) * 10);
            if (Math.ceil(result.length / 10) == 1) {
              length = result.length;
            }
            for (j = i * 10; j < length; j++) {
              shipment_ids.push(result[j].shipment_id);
            }
            console.log("ids", shipment_ids.join(","))
            axios.post(
              `https://${process.env.ZIPPINGBASEURL}/Api/Tracking`, {
              oauth: {
                username: process.env.ZIPPINGUNAME,
                key: process.env.ZIPPINGPASS,
                version: "1"
              },
              // Manifest: 
              Manifest: {
                ShipmentID: shipment_ids.join(",")
              }
            }).then(async function (resData) {
              console.log(resData.data);
              var shipments = resData.data.Result;
              for (i = 0; i < shipments.length; i++) {
                let lastStatus;
                if (shipments[i].LastStatus == "Delivered") {
                  lastStatus = 4;
                } else if (shipments[i].LastStatus == "Return") {
                  lastStatus = 7;
                }
                await new Promise(async (resolve, reject) => {
                  sql = `update customer_order set status_id='${lastStatus}' where shipment_id=${shipments[i].ShipmentID}`;
                  await new Promise(async (resolve, reject) => {
                    await con.query(sql, (err, result) => {
                      if (err) {

                      } else {
                        if (shipments[i].LastStatus == "Return") {
                          let variantID;
                          sql = `select variant_id from customer_table where shipment_id=${shipments[i].ShipmentID}`;
                          con.query(sql, (err, result) => {
                            if (result && result.length > 0) {
                              variantID = result[0];
                            }
                          });
                          sql = `update variant_mobile set quantity=quantity+1 where variant_id=${variantID}`;
                          con.query(sql, (err, result) => {
                          });
                          sql = `select order_id from customer_order where shipment_id=${shipments[i].ShipmentID}`;
                          con.query(sql, (err, result) => {
                            if (result && result.length > 0) {
                              let orderID = result[0];
                              sql = `select * from order_detail where order_id=${orderID}`;
                              con.query(sql, (err, result) => {
                                if (err) {

                                } else {
                                  sql =
                                    "insert into track_detail(item_id,status_id) values(" +
                                    result[0].order_id +
                                    "," +
                                    lastStatus +
                                    ")";
                                  con.query(sql);
                                  notification.sendOrderStatusNotification(
                                    lastStatus,
                                    result[0].user_id,
                                    result[0].order_id,
                                    result[0].item_id,
                                    3
                                  );
                                }
                              });
                            }
                          });
                          resolve(true);
                        }
                      }
                    });
                  });
                  resolve(true);
                });
              }
            }).catch(function (error) {
              console.log(error);
            });
          }
        }
      }
    );
  }, function () {
    /* This function is executed when the job stops */
  },
    true /* Start the job right now */
  );
}

app.listen(3000, function () {
  startJob();
  console.log("Server running on " + port);
});

module.exports = app;
