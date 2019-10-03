const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("api works");
});

const authentication = require("./client/authentication");
const home = require("./client/homepage");
const product = require("./client/product");

app.use("/authentication", authentication);
app.use("/home", home);
app.use("/product", product);

module.exports = app;
