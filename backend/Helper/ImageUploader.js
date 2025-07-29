const cloudinary = require("cloudinary").v2;

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// ✅ Allowed MIME Types
const allowedExtensions = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/avif",
];

const uploadImages = async (images) => {
  const imageArray = Array.isArray(images) ? images : [images];
  const isSingleImage = imageArray.length === 1;

  const uploadedImages = [];

  for (const image of imageArray) {
    if (!allowedExtensions.includes(image.mimetype)) {
      throw new Error("Invalid image extension");
    }

    try {
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        // upload_preset: "your_preset_name", // Optional
      });

      if (!result || result.error) {
        throw new Error("Error uploading the image");
      }

      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error.message);
      throw new Error("An error occurred while uploading images");
    }
  }

  return isSingleImage ? uploadedImages[0] : uploadedImages;
};

const deleteCloudinaryImages = async (images = []) => {
  for (const img of images) {
    try {
      await cloudinary.uploader.destroy(img.public_id);
    } catch (err) {
      console.warn(`Failed to delete Cloudinary image: ${img.public_id}`);
    }
  }
};

module.exports = { uploadImages, deleteCloudinaryImages };
