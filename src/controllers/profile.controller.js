import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { UserDetail } from "../models/userDetails.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";

const handleGetFullProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiErrors(400, "Invalid user ID format.");
    }

    const userInfo = await User.findById(userId).select("-password -__v");

    if (!userInfo) {
        throw new ApiErrors(404, "User not found. Token may be invalid or expired.");
    }

    const userExtraInfo = await UserDetail.findById(userId).select("-__v");

    if (!userExtraInfo) {
        throw new ApiErrors(404, "User profile details not found.");
    }

    const fullProfile = {
        ...userInfo.toObject(),
        details: userExtraInfo.toObject(),
    };

    return res.status(200).json(new ApiResponse(200,fullProfile));
});

export { handleGetFullProfile }