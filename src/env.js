import dotenv from "dotenv";
dotenv.config();

export const {
  JWT_KEY,

  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  DATABASE_URL,

  CLOUDINARY_SECRET,
  // secure to share
  CLOUDINARY_NAME = "dlwoimstk",
  CLOUDINARY_API_KEY = "378278351497316",

  // secure to share
  GOOGLE_CLIENT_ID = "372766069915-ca48cmscjcbehq752nrqtl0blfh05esk.apps.googleusercontent.com",
} = process.env;
