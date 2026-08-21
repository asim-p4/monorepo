import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.error("connection failed:", error);
    process.exit(1);
  }
}
