import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import Question from "./models/questions.model.js"
import limiter from "./ratelimiter/Ratelimit.js"
const app = express()

app.use(cors({
    origin: process.env.CORS_ALLOW_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // allow methods
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(cookieParser());
// app.use(limiter)
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true }))



import userRouter from "./routes/user.routes.js"
import errorMiddleware from "./middlewares/ErrorMiddleware/express.middleware.js"
import refreshRouter from "./routes/refresh.routes.js"
import questionRouter from "./routes/question.routes.js"
import executionRouter from "./routes/execute.routes.js"
import usernameRouter from "./routes/username.routes.js"
import profileRouter from "./routes/profile.routes.js"
import streakRouter from "./routes/streak.routes.js"
import listRouter from "./routes/list.routes.js"

app.use("/api/v1/users", userRouter)

app.use("/api/v1/refresh", refreshRouter)

app.use("/api/v1/questions", questionRouter)

app.use("/api/v1/execute", executionRouter)

app.use("/api/v1/username", usernameRouter)

app.use("/api/v1/profile", profileRouter)

app.use("/api/v1/streak", streakRouter)


app.use("/api/v1/lists", listRouter)

app.use(errorMiddleware)

export { app }