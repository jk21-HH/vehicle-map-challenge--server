const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const vehiclesRoute = require("./routes/Vehicles");
app.use("/vehicles", vehiclesRoute); // reroute to vehicles

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("we are up and running");
});
