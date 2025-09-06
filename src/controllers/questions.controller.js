import QuestionDetails from "../models/questionDetails.model.js";
import Question from "../models/questions.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const handleAllQuestions = asyncHandler(async (req, res) => {
    const questions = await Question.find({})
    console.log("this are questions", questions)
    res.status(200).json(new ApiResponse(201, "Success", questions))
})


const handleCreateQuestion = asyncHandler(async (req, res) => {
    console.log("here")
    const { title,
        difficulty,
        starterCode,
        companyTags,
        description,
        timeLimit,
        functionName,
        params,
        publicTestCase,
        privateTestCase,
        solution,
        topics,
        templates, } = req.body
    const question = await Question.create({
        title: title,
        titleSlug: title.replaceAll(" ", "-").toLowerCase(),
        difficulty: difficulty,
        acRate: 0
    })

    const questionDetails = await QuestionDetails.create({
        QuestionId: question._id,
        starterCode: starterCode,
        companyTags: companyTags,
        description: description,
        timeLimit: timeLimit,
        functionName: functionName,
        params: params,
        publicTestCase: publicTestCase,
        privateTestCase: privateTestCase,
        solution: solution,
        topicsCovered: topics,
        creatorId: req.user._id

    })
})
export { handleAllQuestions, handleCreateQuestion }