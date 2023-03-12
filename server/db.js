import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connectDB = async () => {
    try {
        mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}