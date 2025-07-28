const cloudinary = require("cloudinary");

const uploadImages = async (images) => {
  const allowedExtensions = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];

  const imageArray = Array.isArray(images) ? images : [images];
  const isSingleImage = imageArray.length === 1;

  const uploadedImages = [];

  for (const image of imageArray) {
    if (!allowedExtensions.includes(image.mimetype)) {
      throw new Error("Invalid image extension");
    }

    try {
      const result = await cloudinary.uploader.upload(image.tempFilePath);

      if (!result || result.error) {
        throw new Error("Error uploading the image");
      }

      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("An error occurred while uploading images");
    }
  }

  return isSingleImage ? uploadedImages[0] : uploadedImages;
};

module.exports = { uploadImages };
