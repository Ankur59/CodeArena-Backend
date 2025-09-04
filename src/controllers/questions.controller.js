import Question from "../models/questions.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const handleAllQuestions = asyncHandler(async (req, res) => {
    const questions = await Question.find({})
    console.log("this are questions", questions)
    res.status(200).json(new ApiResponse(201, "Success", questions))
})

const handleCreateQuestion = asyncHandler(async () => {

})
export { handleAllQuestions, handleCreateQuestion }