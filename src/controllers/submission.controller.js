import { Submissions } from "../models/submission.model.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const handleAllSubmission = asyncHandler(async (req, res) => {
    const { questionsId } = req.query

    if (!questionsId) {
        throw new ApiErrors(400, "Invalid question")
    }
    const userId = req.user._id
    if (!userId) {
        throw new ApiErrors(401, "Unauthorized")
    }
    const submissions = await Submissions.find({ submittedBy: userId, questionId: questionsId }).select("-_id isPassed createdAt timeTaken memoryUsed language")

    res.status(200).json(new ApiResponse(200, { submissions: submissions }))
})


export { handleAllSubmission }