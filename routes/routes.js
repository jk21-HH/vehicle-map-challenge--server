const express = require("express");
const turf = require("@turf/turf");
const fs = require("fs");
const router = express.Router();

// Vehicles API

const vehiclesDataFile = "vehicles-location.json";
const vehiclesData = JSON.parse(fs.readFileSync(vehiclesDataFile, "utf-8"));

// add route for code readability
// id field - alwats useful, lat field - as requested, lng field - as requested

router.get("/getAllVehiclesLocation", (req, res) => {
  res.json(
    vehiclesData.map((vehicle) => ({
      id: vehicle.id,
      lat: vehicle.location.lat,
      lng: vehicle.location.lng,
    }))
  );
});

// add route for code readability

router.post("/getVehiclesByPerimeter", (req, res) => {
  // get the paylaod

  const perimeter = req.body.perimeter;

  //server validation

  if (!perimeter || perimeter.length < 4 || !Array.isArray(perimeter)) {
    return res.status(400).json({ error: "Invalid Data Passed From The Map" });
  }

  const polygon = turf.polygon([perimeter]);

  const vehiclesInsideOfParameter = vehiclesData.filter((vehicle) => {
    const point = turf.point([vehicle.location.lng, vehicle.location.lat]);
    const pointCoordinates = point.geometry.coordinates;

    return turf.booleanPointInPolygon(pointCoordinates, polygon);
  });

  res.json(vehiclesInsideOfParameter.map((vehicle) => vehicle.id));
});

module.exports = router;
