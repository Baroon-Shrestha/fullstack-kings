const app = require("./app");
const { createAdmin } = require("./Controllers/createAdmin");
const database = require("./Database/database");

const cloudinary = require("cloudinary").v2;

const PORT = process.env.PORT;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const startServer = async () => {
  try {
    await database();
    await createAdmin();
    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on PORT ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
  }
};

startServer();
