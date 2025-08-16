import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ALLOW_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(app.urlencoded({extended: true}))
export { app }