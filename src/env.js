import dotenv from "dotenv";
dotenv.config();

export const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, DATABASE_URL } =
  process.env;
