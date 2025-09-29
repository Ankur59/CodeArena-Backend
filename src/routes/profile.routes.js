import express from "express";
import { handleGetFullProfile } from "../controllers/profile.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router()


router.get("/getFullProfile", authMiddleware, handleGetFullProfile)

export default router