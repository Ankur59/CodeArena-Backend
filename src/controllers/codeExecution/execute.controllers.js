import QuestionDetails from "../../models/questionDetails.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import fetch from 'node-fetch';
import jsonChecker from "./jsonchecker.js";
import createJsSnippet from "./snippetbuilder.js";
import sendToJudge0RapidAPI from "./sendToJudge.js";

const handleRunCode = asyncHandler(async (req, res) => {
    const { sourceCode, label, languageCode, questionId } = req.body;

    const questionInfo = await QuestionDetails.findById(questionId);

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

    const runnerCode = createJsSnippet(sourceCode, params, allPublicCases, functionName);

    const response = await sendToJudge0RapidAPI(runnerCode)

    console.log("This is reponse fix this", response)

});

export { handleRunCode };
