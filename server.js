const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const port = 4200;
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", api);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "dist/admin/index.html"));
});

app.listen(process.env.PORT, function() {
  console.log("Server running on " + port);
});

module.exports = app;
