const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("api works");
});

const client = require("./client");

const product = require("./routes/product");
const attribute = require("./routes/attribute");
const category = require("./routes/category");
const mobile = require("./routes/mobile");
const specification = require("./routes/specification");
const variant = require("./routes/variant");
// const order=require('./admin/orders');
const authentication = require("./routes/authentication");
const imageUpload = require("./routes/image_upload");
const tax = require("./routes/tax");
const categoryImage = require("./routes/category-image-upload");
const order = require("./routes/order");
const announcement = require("./routes/announcement");
const promocode = require("./routes/promocode");
const banner = require("./routes/banner");
const dashboard = require("./routes/dashboard");

app.use("/client", client);
app.use("/authentication", authentication);
app.use("/product", product);
app.use("/attribute", attribute);
app.use("/mobile", mobile);
app.use("/specification", specification);
app.use("/variant", variant);
app.use("/upload-image", imageUpload);
app.use("/tax", tax);
app.use("/category-image", categoryImage);
app.use("/order", order);
app.use("/announcement", announcement);
// app.use('/attributeValue',attributeValue);
app.use("/category", category);
app.use("/promocode", promocode);
// app.use('/order',order);
app.use("/banner", banner);
app.use("/dashboard", dashboard);

module.exports = app;
