const bcrypt = require("bcrypt");
const User = require("../Models/userModel");

const createAdmin = async () => {
  try {
    const username = "Boro";
    const plainPassword = "Boro123";

    const existingAdmin = await User.findOne({ username });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const newAdmin = new User({ username, password: hashedPassword });
    await newAdmin.save();
    console.log("Admin created successfully.");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

module.exports = { createAdmin };
