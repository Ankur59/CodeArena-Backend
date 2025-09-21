import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { handleRunCode, handleSubmitCode } from "../controllers/codeExecution/execute.controllers.js"

const router = express.Router()

router.route("/runcode").post(authMiddleware, handleRunCode)

router.route("/submit").post(authMiddleware, handleSubmitCode)

export default router