const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("api works");
});

const authentication = require("./client/authentication");
const home = require("./client/homepage");

app.use("/authentication", authentication);
app.use("/home", home);

module.exports = app;
