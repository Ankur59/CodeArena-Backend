import QuestionDetails from "../models/questionDetails.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const handleRunCode = asyncHandler(async (req, res) => {
    const { sourceCode, label, languageCode, questionId } = req.body

    const questionInfo = await QuestionDetails.findById(questionId)

    const params = questionInfo.params.map((item) => (
        item.name
    ))

    const allPublicCases = questionInfo.publicTestCase.map((testCase, idx) => {
        let obj = { output: JSON.parse(testCase.output) };
        testCase.params.forEach((item, idx) => {
            obj[params[idx]] = JSON.parse(item.value);
        });
        return obj;
    });
    console.log(allPublicCases)
})


export { handleRunCode }