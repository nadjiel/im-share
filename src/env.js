import dotenv from "dotenv";
dotenv.config();

export const {
  AWS_ACCESS_KEY,
  AWS_ACCESS_SECRET,

  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  DATABASE_URL,
} = process.env;
