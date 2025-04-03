import { config } from "dotenv";
config({ path: "./.env.local" });

console.log("DB URL:", process.env.NEXT_PUBLIC_DB_CONNECTION_STRING);

/** @type {import("drizzle-kit").Config} */
export default {
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
  },
};