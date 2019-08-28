const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("api works");
});

const product=require('./routes/product');
const attribute = require("./routes/attribute");
const category = require("./routes/category");
const mobile=require("./routes/mobile");
// const order=require('./admin/orders');
const authentication = require("./routes/authentication");

app.use("/authentication", authentication);
app.use('/product',product);
app.use("/attribute", attribute);
app.use("/mobile",mobile);
// app.use('/attributeValue',attributeValue);
app.use("/category", category);
// app.use('/order',order);

module.exports = app;
