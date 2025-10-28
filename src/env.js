import dotenv from "dotenv";
dotenv.config();

export const {
  JWT_KEY,

  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  DATABASE_URL,

  CLOUDINARY_SECRET,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SERVER,

  GOOGLE_CLIENT_ID
} = process.env;
