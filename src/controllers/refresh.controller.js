import { User } from "../models/user.model.js"
import ApiErrors from "../utils/ApiErrors.js"
import ApiResponse from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"

const handleRefresh = asyncHandler(async (req, res) => {
    const token = req.cookies?.refreshToken
    if (!token) {
        throw new ApiErrors(401, "No Token Provided")
    }

    let decoded
    try {
        decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new ApiErrors(401, "Invalid or expired refresh token");
    }

    const user = await User.findById(decoded._id)
    if (!user) {
        throw new ApiErrors(401, "Invalid Token Data")
    }

    const AccessToken = user.generateAccessToken()

    res
        .status(200)
        .cookie("accessToken", AccessToken, { httpOnly: true, secure: true })
        .json(new ApiResponse(200, "Token Verified", { accessToken: AccessToken }))
})



const handleCheck = asyncHandler(async (req, res) => {
    // Get Authorization header
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiErrors(401, "No Bearer token provided");
    }

    const token = authHeader.split(" ")[1]; // Extract token part

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        throw new ApiErrors(401, "Invalid or expired access token");
    }

    // Dummy response
    const dummyData = {
        id: decoded._id || "123",
        name: "John Doe",
        role: "Trainer",
        message: "Token verified successfully!",
    };

    return res
        .status(200)
        .json(new ApiResponse(200, "Access token valid", dummyData));
});
export { handleRefresh, handleCheck }
