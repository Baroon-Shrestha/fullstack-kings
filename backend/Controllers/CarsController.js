const { uploadImages } = require("../Helper/ImageUploader");
const { Cars } = require("../Models/carsModel");

// GET /api/cars/demo
const GetCarsdemo = async (req, res) => {
  res.send("get cars api is working successfully");
};

const addCar = async (req, res) => {
  try {
    const uploadedImages = await uploadImages(req.files.images);

    const newCar = new Cars({
      ...req.body,
      images: uploadedImages,
    });

    const savedCar = await newCar.save();

    res.status(201).json({
      success: true,
      message: "Car added successfully",
      data: savedCar,
    });
  } catch (error) {
    console.error("Add Car Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add car",
      error: error.message,
    });
  }
};
const getCars = async (req, res) => {
  try {
    const getAllCars = await Cars.find({});
    res.status(200).send({
      success: true,
      data: getAllCars,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getOneCar = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "No car ID provided in the request.",
    });
  }

  try {
    const findCar = await Cars.findById(id);

    if (!findCar) {
      return res.status(404).send({
        success: false,
        message: `No car found with ID: ${id}`,
      });
    }

    res.status(200).send({ success: true, data: findCar });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error fetching car",
      error: error.message,
    });
  }
};

const deleteCar = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: `Invalid car ID.` });
  }

  try {
    const deletedCar = await Cars.findByIdAndDelete(id);

    if (!deletedCar) {
      return res
        .status(404)
        .json({ success: false, message: `Car with ID ${id} not found.` });
    }

    res
      .status(200)
      .json({ success: true, message: "Car deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const soldStatus = async (req, res) => {
  try {
    const updated = await Cars.findByIdAndUpdate(
      req.params.id,
      { sold: true },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  GetCarsdemo,
  addCar,
  getCars,
  getOneCar,
  deleteCar,
  soldStatus,
};
