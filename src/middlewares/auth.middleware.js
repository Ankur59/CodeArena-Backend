import { User } from "../models/user.model.js";
import ApiErrors from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const authMiddleware = asyncHandler((async (req, res, next) => {
    console.log(req.headers)
    const token = req.headers['authorization']?.split(' ')[1]
    console.log(token)
    if (!token) {
        throw new ApiErrors(401, "No Token Provided")
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decoded._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");

        if (!user) {
            throw new ApiErrors(401, "Invalid Token")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiErrors(401, "Invalid Token")
    }
}))

export default authMiddleware