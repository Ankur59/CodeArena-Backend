import QuestionDetails from "../../models/questionDetails.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import fetch from 'node-fetch';
import jsonChecker from "./jsonchecker.js";
import createJsSnippet from "./snippetbuilder.js";
import sendToJudge0RapidAPI from "./sendToJudge.js";
import ApiErrors from "../../utils/ApiErrors.js";
import ApiResponse from "../../utils/ApiResponse.js";


const handleRunCode = asyncHandler(async (req, res) => {
    const { sourceCode, label, languageCode, questionId } = req.body;

    const questionInfo = await QuestionDetails.findById(questionId);
    if (!questionId) {
        throw new ApiErrors(404, "Invalid Question")
    }

    const functionName = questionInfo.functionName;

    const params = questionInfo.params.map(item => item.name);
    console.log("Input Parameters:", params);

    const allPublicCases = questionInfo.publicTestCase.map(testCase => {
        const testCaseObj = { output: jsonChecker(testCase.output) };
        testCase.params.forEach((param, idx) => {
            testCaseObj[params[idx]] = jsonChecker(param.value);
        });
        return testCaseObj;
    });

    console.log("Normalized Test Cases:", allPublicCases);

    const runnerCode = createJsSnippet(sourceCode, params, allPublicCases, functionName, questionInfo.publicTestCase);
    console.log(questionInfo.publicTestCase)
    const response = await sendToJudge0RapidAPI(runnerCode)

    if (!response) {
        throw new ApiErrors(500, "Unable to execute code")
    }
    console.log(response)
    res.status(200).json(new ApiResponse(200, "Execution Sucess", response))

});

export { handleRunCode };
