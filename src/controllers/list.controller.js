import ProblemList from "../models/lists.model.js"
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const handleAllListNames = asyncHandler(async (req, res, next) => {
    if (!req.user || !req.user._id) {
        throw new ApiErrors(401, "Unauthorized access: User ID not found.");
    }

    const userId = req.user._id;
    let lists;


    lists = await ProblemList.find({ owner: userId }).select('listName createdAt').select("title")

    const finalResult = lists.map(list => list.title);
    return res.status(200).json(
        new ApiResponse(
            200,
            finalResult,
            "Successfully fetched all problem lists."
        )
    );
});

export { handleAllListNames };