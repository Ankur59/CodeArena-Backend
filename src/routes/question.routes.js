import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { handleAllQuestions, handleCreateQuestion, handleAllQuestionDetails } from "../controllers/questions.controller.js";


const router = express.Router()

router.route("/getallquestion").get(authMiddleware, handleAllQuestions)

router.route("/createquestion").post(authMiddleware, handleCreateQuestion)

router.route("/getquestiondetails").get(authMiddleware, handleAllQuestionDetails)


export default router

