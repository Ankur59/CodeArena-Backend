import express from "express";
import { handleAllSubmission } from "../controllers/submission.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get("/getAllSubmissions", authMiddleware,handleAllSubmission)

export default router