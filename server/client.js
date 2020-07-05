const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("api works");
});

const authentication = require("./client/authentication");
const home = require("./client/homepage");
const product = require("./client/product");
const announcement = require("./client/announcement");
const notification = require("./client/notification");
const cart = require("./client/cart");
const order = require("./client/order");
const address = require("./client/address");
const paytm = require("./client/checksum");
const support = require("./client/support");

app.use("/authentication", authentication);
app.use("/home", home);
app.use("/product", product);
app.use("/announcement", announcement);
app.use("/notification", notification);
app.use("/cart", cart);
app.use("/order", order);
app.use("/address", address);
app.use("/paytm", paytm);
app.use("/support", support);

module.exports = app;
