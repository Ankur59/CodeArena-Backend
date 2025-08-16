import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
    try {
        const dbconnection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("DB connected....")
    } catch (error) {
        console.error("Error conncting DB: ", error)
    }
}