const mongoose = require("mongoose");

const MongoURI = process.env.URI;

const database = async () => {
  try {
    await mongoose.connect(MongoURI);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
};

module.exports = database;
