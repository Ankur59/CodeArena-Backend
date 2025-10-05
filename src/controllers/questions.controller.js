import QuestionDetails from "../models/questionDetails.model.js";
import Question from "../models/questions.model.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const handleAllQuestions = asyncHandler(async (req, res) => {
    const filterString = req.query.filter;

    const LIMIT = 5; //Make it a bigger number in prod please 
    let lastId = parseInt(req.query.lastId || '0');
    let questions = [];
    let queryExecuted = false;
    console.log("this is last id", lastId)
    // The filter is active if filterString is provided
    const isFiltered = !!filterString;

    while (questions.length === 0) {
        let query = {
            questionId: { $gt: lastId },
        };

        if (isFiltered) {
            const filterArray = filterString.split(',');
            query.tags = { $in: filterArray };
        }

        // Execute the query
        const fetchedQuestions = await Question.find(query)
            .limit(LIMIT)
            .sort({ questionId: 1 })
            .exec();

        queryExecuted = true;
        questions = fetchedQuestions;

        if (questions.length > 0) {
            break;
        }

        if (!isFiltered) {
            break;
        }
        const checkQuery = {
            questionId: { $gt: lastId }
        };
        const endCheck = await Question.findOne(checkQuery).exec();

        if (!endCheck) {
            break;
        }
        lastId += LIMIT;
    }
    // Determine the nextId based on the results found, or the lastId searched
    const nextIndex = questions.length > 0 ? questions[questions.length - 1].questionId : lastId + (questions.length > 0 ? 0 : LIMIT);

    // Ensure we don't accidentally set nextIndex back if the loop broke early
    const finalNextId = questions.length > 0
        ? questions[questions.length - 1].questionId
        : lastId;


    console.log("this are questions",questions)
    res.status(200).json(new ApiResponse(201, "Success", { questions: questions, nextId: finalNextId }));
});

const handleCreateQuestion = asyncHandler(async (req, res) => {
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
    const details = await QuestionDetails.findOne({
        QuestionId: questionInfo._id
    }).select(" -privateTestCase")
    if (!details) {
        throw new ApiErrors(404, "Question not found")
    }
    const basicInfo = await Question.findById(details.QuestionId).select("difficulty title questionId tags -_id")
    console.log(basicInfo)
    // console.log("This is Details", Details)
    res.status(200).json(new ApiResponse(200, "Found", { Details: details, BasicInfo: basicInfo }))
}))
export { handleAllQuestions, handleCreateQuestion, handleAllQuestionDetails }