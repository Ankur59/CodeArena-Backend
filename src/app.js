import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import Question from "./models/questions.model.js"
import limiter from "./ratelimiter/Ratelimit.js"
const app = express()

app.use(cors({
    origin: process.env.CORS_ALLOW_ORIGIN,
    credentials: true
}))
app.use(cookieParser());
// app.use(limiter)
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true }))



import userRouter from "./routes/user.routes.js"
import errorMiddleware from "./middlewares/ErrorMiddleware/express.middleware.js"
import refreshRouter from "./routes/refresh.routes.js"
import questionRouter from "./routes/question.routes.js"

app.use("/api/v1/users", userRouter)

app.use("/api/v1/refresh", refreshRouter)

app.use("/api/v1/questions", questionRouter)

app.use(errorMiddleware)

export { app }