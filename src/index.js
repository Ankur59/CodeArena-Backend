import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./db/index.js";
import { app } from "./app.js"

dotenv.config({ path: './env' })


connectDB()
    .then(() => {
        app.on("error", () => console.log("Error while starting the server")), 
        app.listen(process.env.PORT || 6000, () => {

            console.log(`Server listening....`)
        })
    })
    .catch((error) => console.log("Error connecting DB :", error))