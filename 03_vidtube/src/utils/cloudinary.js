import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    // console.log("Cloudinary Config:", {
    //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //   api_key: process.env.CLOUDINARY_API_KEY,
    //   api_secret: process.env.CLOUDINARY_API_SECRET,
    // });

    if (!localFilePath) return null
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });
    console.log("File uploaded successfully. URL:", response.url);
    // Once the file is uploaded, delete the local file
    fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
    console.log("Error uploading file to Cloudinary:", error)
    // If there is an error, delete the local file and return null
    fs.unlinkSync(localFilePath)
    return null
  }
}

const deleteOnCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    console.log("File deleted successfully.", publicId)
  } catch (error) {
    console.log("Error deleting file from Cloudinary", error)
    return null
  }
}

export { uploadOnCloudinary, deleteOnCloudinary }
