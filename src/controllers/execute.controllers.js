import QuestionDetails from "../models/questionDetails.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function jsonChecker(str) {
    try {
        // Attempt to parse the string as JSON
        return JSON.parse(str);
    } catch (e) {
        // If parsing fails, return the original string
        return str;
    }
}

function serializeTestCases(testCases, inputParams) {
    // Start the output string with the number of test cases.
    let serializedString = testCases.length.toString() + "\n";

    testCases.forEach(testCase => {
        // Handle each input parameter
        inputParams.forEach(paramName => {
            const value = testCase[paramName];
            if (Array.isArray(value)) {
                serializedString += value.join(" ") + "\n";
            } else {
                // Handle numbers, strings, etc.
                serializedString += value.toString() + "\n";
            }
        });

        // Handle the output
        const output = testCase.output;
        if (Array.isArray(output)) {
            serializedString += output.join(" ") + "\n";
        } else {
            serializedString += output.toString() + "\n";
        }

        // Add a separator for the next test case.
        serializedString += "-\n";
    });

    return serializedString;
}

const handleRunCode = asyncHandler(async (req, res) => {
    const { sourceCode, label, languageCode, questionId } = req.body;
    const questionInfo = await QuestionDetails.findById(questionId);

    const params = questionInfo.params.map(item => item.name);
    console.log("Input Parameters:", params);

    const allPublicCases = questionInfo.publicTestCase.map(testCase => {
        const testCaseObj = { output: jsonChecker(testCase.output) };
        testCase.params.forEach((param, idx) => {
            testCaseObj[params[idx]] = jsonChecker(param.value);
        });
        return testCaseObj;
    });

    const serialized = serializeTestCases(allPublicCases, params);

    // Now you can pass this 'serialized' string to the Judge0 API.
    console.log("Serialized Test Cases:", serialized);
});

export { handleRunCode, serializeTestCases };