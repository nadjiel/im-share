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

  GOOGLE_CLIENT_ID = "372766069915-ca48cmscjcbehq752nrqtl0blfh05esk.apps.googleusercontent.com",
} = process.env;
