import { asyncHandler } from "../utils/asyncHandler.js";

const handleRunCode = asyncHandler((req, res) => {
    const { sourceCode, label, languageCode, questionId } = req.body
    console.log(sourceCode, label, languageCode)
})

export { handleRunCode }