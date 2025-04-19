const cloudinary = require("../config/cloudinary.js");

export const uploadToCloudinary = async (
  base64Image,
  folderName = "GoBite"
) => {
  try {
    const res = await cloudinary.uploader.upload(base64Image, {
      folder: folderName,
    });
    return res.secure_url; // this is the image URL to store in DB
  } catch (error) {
    throw new Error("Cloudinary upload failed");
  }
};
