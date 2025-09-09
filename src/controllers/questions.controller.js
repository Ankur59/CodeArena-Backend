import QuestionDetails from "../models/questionDetails.model.js";
import Question from "../models/questions.model.js";
import ApiErrors from "../utils/ApiErrors.js";
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
        companyTags,
        description,
        timeLimit,
        functionName,
        params,
        publicTestCase,
        privateTestCase,
        solution,
        topics,
        templates } = req.body
    const titleslug = title.replaceAll(" ", "-").toLowerCase()
    const question = await Question.create({
        title: title,
        titleSlug: titleslug,
        difficulty: difficulty,
        acRate: 0
    })

    const questionDetails = await QuestionDetails.create({
        QuestionId: question._id,
        starterCode: templates,
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
    res.status(201).json(new ApiResponse(201, "Question created"))
})

const handleAllQuestionDetails = asyncHandler(asyncHandler(async (req, res) => {
    const { slug } = req.query
    const questionInfo = await Question.findOne({
        titleSlug: slug
    })
    if (!questionInfo) {
        throw new ApiErrors(404, "Invalid Question")
    }
    const Details = await QuestionDetails.findOne({
        QuestionId: questionInfo._id
    })
    if (!Details) {
        throw new ApiErrors(404, "Question not found")
    }
    res.status(200).json(new ApiResponse(200, "Found", Details))
}))
export { handleAllQuestions, handleCreateQuestion, handleAllQuestionDetails }