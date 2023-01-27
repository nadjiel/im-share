import dotenv from "dotenv";
dotenv.config();

export const {
  JWT_KEY,

  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  DATABASE_URL,

  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
  CLOUDINARY_API_KEY,
} = process.env;
