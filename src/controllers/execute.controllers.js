import QuestionDetails from "../models/questionDetails.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function jsonChecker(str) {
    if (typeof str !== "string") return str; // already proper type
    try {
        return JSON.parse(str);
    } catch (e) {
        console.warn("⚠️ Invalid JSON format, returning raw:", str);
        return str;
    }
}

function createJsSnippet(solution, params, testCases, functionName) {
    return `
    
${solution}

const testCases = ${JSON.stringify(testCases)};

for (const tc of testCases) {
  const args = [${params.map(p => `tc.${p}`).join(", ")}];
  const result = ${functionName}(...args);
  console.log(JSON.stringify(result));
}
`;
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

    console.log("Normalized Test Cases:", allPublicCases);

    const functionName = questionInfo.functionName;


    const runnerCode = createJsSnippet(sourceCode, params, allPublicCases, functionName);

    console.log("Final Code to Send to Judge0:\n", runnerCode);

    // // 🔹 Step 4 will be: send `runnerCode` to Judge0
    // res.json({ runnerCode });
});

export { handleRunCode };
