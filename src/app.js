import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import limiter from "./ratelimiter/Ratelimit.js"
const app = express()

app.use(cors({
    origin: process.env.CORS_ALLOW_ORIGIN,
    credentials: true
}))

// app.use(limiter)
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true }))


import userRouter from "./routes/user.routes.js"
import errorMiddleware from "./middlewares/ErrorMiddleware/express.middleware.js"

app.use("/api/v1/users", userRouter)

app.use(errorMiddleware)

export { app }