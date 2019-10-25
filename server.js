const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const port = 3000;
const api = require("./server/api");
var compression = require("compression");
require("dotenv").config();
const app = express();

// compress all responses
app.use(compression());
//Enables cors request
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "dist/admin")));
//app.use("/images", express.static(path.join(__dirname, "dist/admin/assets")));
app.use(
  "/banners",
  express.static(path.join(__dirname, "dist/admin/assets/banners"))
);
app.use(
  "/category",
  express.static(path.join(__dirname, "dist/admin/assets/categories"))
);
app.use(
  "/thumbnail",
  express.static(path.join(__dirname, "dist/admin/assets/thumbnail"))
);
app.use(
  "/list-image",
  express.static(path.join(__dirname, "dist/admin/assets/list_image"))
);
app.use(
  "/view-image",
  express.static(path.join(__dirname, "dist/admin/assets/view_image"))
);
app.use(
  "/main-image",
  express.static(path.join(__dirname, "dist/admin/assets/main_image"))
);
app.use(
  "/profile",
  express.static(path.join(__dirname, "dist/admin/assets/profile"))
);
app.use("/info", express.static(path.join(__dirname, "dist/admin/assets")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", api);

// app.get("/terms", function(req, res) {
//   res.sendFile(path.join(__dirname, "dist/admin/assets/termscondition.html"));
// });

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "dist/admin/index.html"));
});

app.listen(3000, function() {
  console.log("Server running on " + port);
});

module.exports = app;
