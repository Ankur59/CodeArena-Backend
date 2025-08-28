import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { handleAllQuestions } from "../controllers/questions.controller.js";


const router = express.Router()

router.route("/getallquestion").get(authMiddleware, handleAllQuestions)


export default router

