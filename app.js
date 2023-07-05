const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const serverURL = process.env.PORT || 5000;

const route = require("./routes/routes");

app.use("/vehicles", route); // reroute to vehicles API

app.listen(serverURL, function () {
  console.log(`we are up and running on server: ${serverURL}`);
});
