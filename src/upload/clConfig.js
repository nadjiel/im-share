import { v2 } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
} from "../env.js";

export const clConfig = v2.config({
  secure: true,
  apiKey: CLOUDINARY_API_KEY,
  cloud_name: CLOUDINARY_NAME,
  api_secret: CLOUDINARY_SECRET,
});
