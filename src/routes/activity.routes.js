import express from "express";
import { handleAllActivity } from "../controllers/activity.contoller.js";

const router = express.Router()

router.get("/getAllActivity", handleAllActivity)

export default router