import Performance from "../models/performance.model.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const handleAllActivity = asyncHandler(async (req, res) => {
    const { year, month, day } = req.query
    if (!year && !date && !month) {
        throw new ApiErrors(400, "Arguments missing")
    }

    if (day && month && year) {
        const pipeline =  getYearActivity(req.user._id, year, day, month)
        const data = await Performance.aggregate(pipeline)
        res.status(200).json(new ApiResponse(200, "Success", data))
    }
})

export { handleAllActivity }