const {
  uploadImages,
  deleteCloudinaryImages,
} = require("../Helper/ImageUploader");
const { Cars } = require("../Models/carsModel");

// GET /api/cars/demo
const GetCarsdemo = async (req, res) => {
  res.send("get cars api is working successfully");
};

const addCar = async (req, res) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "You must be an Admin." });
  }

  try {
    if (!req.files || !req.files.images) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required." });
    }

    req.body.features;

    let featuresArray;
    try {
      featuresArray = JSON.parse(req.body.features);
    } catch (err) {
      featuresArray = []; // fallback if parsing fails
    }

    const uploadedImages = await uploadImages(req.files.images);

    const newCar = new Cars({
      ...req.body,
      features: featuresArray,
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
    const getAllCars = await Cars.find({}).sort({ createdAt: -1 });
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
const get3cars = async (req, res) => {
  try {
    const getAllCars = await Cars.find().sort({ createdAt: -1 }).limit(3);

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
  const { role } = req.user;

  if (role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "You must be an Admin." });
  }

  try {
    const deletedCar = await Cars.findByIdAndDelete(id);
    if (!deletedCar) {
      return res
        .status(404)
        .json({ success: false, message: `Car with ID ${id} not found.` });
    }

    await deleteCloudinaryImages(deletedCar.images);

    res
      .status(200)
      .json({ success: true, message: "Car and images deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const soldStatus = async (req, res) => {
  const { role } = req.user;

  if (role !== "admin")
    return res
      .status(403)
      .send({ success: false, message: "You must be an Admin." });

  try {
    const car = await Cars.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found.",
      });
    }

    if (car.sold) {
      return res.status(400).json({
        success: false,
        message:
          "Car is already marked as sold. This action cannot be reversed.",
      });
    }

    car.sold = true;
    await car.save();

    res.json({
      success: true,
      message: "Car marked as sold successfully.",
      data: car,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;

  if (role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Only admins can update car details." });
  }

  try {
    const car = await Cars.findById(id);
    if (!car) {
      return res
        .status(404)
        .json({ success: false, message: `Car with ID ${id} not found.` });
    }

    if (car.sold) {
      return res.status(403).json({
        success: false,
        message: "Cannot update. This car is already sold.",
      });
    }

    let updatedData = { ...req.body };

    if (updatedData.features) {
      try {
        updatedData.features = JSON.parse(updatedData.features);
      } catch (err) {
        updatedData.features = [];
        console.warn("Failed to parse features:", err.message);
      }
    }

    if (req.files && req.files.images) {
      await deleteCloudinaryImages(car.images);
      const uploadedImages = await uploadImages(req.files.images);
      updatedData.images = uploadedImages;
    }

    const updatedCar = await Cars.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Car updated successfully.",
      data: updatedCar,
    });
  } catch (error) {
    console.error("Update Car Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update car.",
      error: error.message,
    });
  }
};

module.exports = {
  GetCarsdemo,
  addCar,
  getCars,
  getOneCar,
  deleteCar,
  soldStatus,
  updateCar,
  get3cars,
};
