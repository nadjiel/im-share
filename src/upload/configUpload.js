import { v2 } from "cloudinary";
import {
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
  CLOUDINARY_API_KEY,
} from "../env.js";

v2.config({
  secure: true,
  apiKey: CLOUDINARY_API_KEY,
  cloud_name: CLOUDINARY_NAME,
  api_secret: CLOUDINARY_SECRET,
});
