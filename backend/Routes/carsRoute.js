const express = require("express");
const {
  GetCarsdemo,
  addCar,
  getCars,
  getOneCar,
  deleteCar,
  soldStatus,
  updateCar,
  get3cars,
} = require("../Controllers/CarsController");
const { verifyAdmin } = require("../MiddleWares/VerifyAdmin");

const router = express.Router();

router.get("/cars", GetCarsdemo);
router.get("/latestcars", get3cars);
router.get("/all-cars", getCars);
router.post("/add-cars", verifyAdmin, addCar);
router.get("/car/:id", getOneCar);
router.delete("/delete/:id", verifyAdmin, deleteCar);
router.patch("/mark-sold/:id", verifyAdmin, soldStatus);
router.put("/update/:id", verifyAdmin, updateCar);

module.exports = router;
