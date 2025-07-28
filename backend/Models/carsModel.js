const mongoose = require("mongoose");

const CarsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    modelYear: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual"],
      required: true,
    },
    drivenKms: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    bodyType: {
      type: String,
      enum: [
        "SUV",
        "Sedan",
        "Offroad",
        "Hatchback",
        "Coupe",
        "Convertible",
        "Truck",
      ],
      required: true,
    },
    engine: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      enum: ["Excellent", "Like New", "Good", "Fair", "Poor"],
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    doors: {
      type: Number,
      required: true,
    },
    features: {
      type: [String], // Example: ["Airbags", "Sunroof", "Bluetooth", "ABS"]
      default: [],
    },
    sold: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cars = mongoose.model("Cars", CarsSchema);

module.exports = { Cars };
