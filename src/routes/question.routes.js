import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { handleAllQuestions, handleCreateQuestion } from "../controllers/questions.controller.js";
import { resourceLimits } from "worker_threads";


const router = express.Router()

router.route("/getallquestion").get(authMiddleware, handleAllQuestions)

router.route("/createquestion").post(authMiddleware, handleCreateQuestion)


export default router

