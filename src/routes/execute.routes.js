import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { handleRunCode } from "../controllers/execute.controllers.js"

const router = express.Router()


router.route("/runcode").post(authMiddleware, handleRunCode)

export default router