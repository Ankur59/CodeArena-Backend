import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./db/index.js";
import { app } from "./app.js"
import Question from "./models/questions.model.js";

dotenv.config({ path: './env' })


connectDB()
    .then(() => {
        app.on("error", () => console.log("Error while starting the server")),
            app.listen(process.env.PORT || 6000, () => {
                Question.syncIndexes()
                console.log(`Server listening....`)
            })
    })
    .catch((error) => console.log("Error connecting DB :", error))