import QuestionDetails from "../../models/questionDetails.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import fetch from 'node-fetch';
import jsonChecker from "./jsonchecker.js";
import { createJsSnippet, createJsSnippetSubmit } from "./snippetbuilder.js";
import sendToJudge0RapidAPI from "./sendToJudge.js";
import ApiErrors from "../../utils/ApiErrors.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { Submissions } from "../../models/submission.model.js";
import Performance from "../../models/performance.model.js";
import { UserDetail } from "../../models/userDetails.model.js";
import Question from "../../models/questions.model.js";

// For running the code
const handleRunCode = asyncHandler(async (req, res) => {
    const { sourceCode, label, languageCode, questionId } = req.body;

    const questionInfo = await QuestionDetails.findById(questionId);

    if (!questionId) {
        throw new ApiErrors(404, "Invalid Question")
    }

    const functionName = questionInfo.functionName;

    const params = questionInfo.params.map(item => item.name);

    const allPublicCases = questionInfo.publicTestCase.map(testCase => {

        const testCaseObj = { output: jsonChecker(testCase.output) };
        testCase.params.forEach((param, idx) => {

            testCaseObj[params[idx]] = jsonChecker(param.value);

        });
        return testCaseObj;
    });

    const clean = JSON.parse(JSON.stringify(questionInfo.publicTestCase, (key, value) =>
        value === undefined ? null : value
    ));
    const runnerCode = createJsSnippet(
        sourceCode,
        params,
        allPublicCases,
        functionName,
        clean
    );

    const response = await sendToJudge0RapidAPI(runnerCode)

    if (!response) {
        throw new ApiErrors(500, "Unable to execute code")
    }
    res.status(200).json(new ApiResponse(200, "Execution Success", response))

});



// For code submission
const handleSubmitCode = asyncHandler(async (req, res) => {
    const { sourceCode, label, languageCode, questionId } = req.body;

    const questionInfo = await QuestionDetails.findById(questionId);

    if (!questionId) {
        throw new ApiErrors(404, "Invalid Question")
    }

    // Serialization function
    const params = questionInfo.params.map(item => item.name);

    const allPrivateCases = questionInfo.
        privateTestCase.map(testCase => {
            const testCaseObj = { output: jsonChecker(testCase.output) };
            testCase.params.forEach((param, idx) => {
                testCaseObj[params[idx]] = jsonChecker(param.value);
            });
            return testCaseObj;
        });

    const clean = JSON.parse(JSON.stringify(questionInfo.publicTestCase, (key, value) =>
        value === undefined ? null : value
    ));
    // Serialization function end

    const runnerCode = createJsSnippetSubmit(
        sourceCode,
        params,
        allPrivateCases,
        questionInfo.functionName,
        clean
    )

    const response = await sendToJudge0RapidAPI(runnerCode)

    if (!response) {
        throw new ApiErrors(500, "Unable to execute code")
    }

    // To record user first attempt
    await UserDetail.updateOne({ id: req.user._id }, { $addToSet: { questionAttempted: questionId } })



    // To record every submissions
    const submission = await Submissions.create({
        submittedBy: req.user._id,
        questionId: questionId,
        timeTaken: response.time || "N/A",
        memoryUsed: response.memory || "N/A",
        language: label,
        sourceCode: sourceCode,
        isPassed: response.output ? response.output[0].success : false,

    })

    const isSuccess = response.output ? response.output[0].success : false
    // runtime in ms
    const runTime = ((Number(response.time)) * 1000) || 0
    // memory in bytes
    const memory = ((Number(response.memory)) * 1024) || 0

    // Do this things if the submission has passed
    if (isSuccess) {
        // to fetch difficulty
        const questionHead = await Question.findById(questionInfo.QuestionId)

        const difficultyLevel = questionHead.difficulty;

        const fieldToIncrement = `solvedCounts.${difficultyLevel}`;

        const updateOperation = {
            $inc: {
                [fieldToIncrement]: 1 // Increment the dynamically determined field by 1
            }
        };
        await Performance.create({
            questionId: questionId,
            submittedBy: req.user._id,
            runTimeMs: runTime,
            memoryBytes: memory
        })

        await UserDetail.updateOne({ id: req.user._id }, {
            $addToSet: { questionSolved: questionId }
        })
        console.log("getting here")
        const result = await UserDetail.updateOne(
            { id: req.user._id },
            updateOperation
        );
        console.log("hreeee", result)
    }

    res.status(200).json(new ApiResponse(200, "Executed", response))
})

export { handleRunCode, handleSubmitCode };

