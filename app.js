const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const serverURL = process.env.serverURL || "http://localhost:5000";

const vehiclesRoute = require("./routes/Vehicles");
app.use("/vehicles", vehiclesRoute); // reroute to vehicles

app.listen(5000, function () {
  console.log("we are up and running");
});
