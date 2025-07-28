const express = require("express");
const {
  GetCarsdemo,
  addCar,
  getCars,
  getOneCar,
  deleteCar,
  soldStatus,
} = require("../Controllers/CarsController");
const { verifyAdmin } = require("../MiddleWares/VerifyAdmin");

const router = express.Router();

router.get("/cars", GetCarsdemo);
router.get("/all-cars", getCars);
router.post("/add-cars", addCar);
router.get("/car/:id", getOneCar);
router.delete("/delete/:id", verifyAdmin, deleteCar);

router.patch("/mark-sold/:id", soldStatus);

module.exports = router;
