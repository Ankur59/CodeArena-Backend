import { asyncHandler } from "../utils/asyncHandler.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import { sendEmail, verificatioMailContent } from "../utils/mailgen.js";



const generateAccessandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const AccessToken = user.generateAccessToken()
        const RefreshToken = user.generateRefreshToken()
        user.refreshToken = RefreshToken
        await user.save({ validateBeforeSave: false })
        return { AccessToken, RefreshToken }
    }
    catch (error) {
        throw new ApiErrors(500, "Something went wrong while generating Access Token")
    }
}


const handleRegister = asyncHandler(async (req, res) => {

    const { firstName, lastName, email, password } = req.body

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiErrors(409, "User already exist", []
        )
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        isEmailVerified: false
    })

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()

    console.log("unhashed", unHashedToken)
    console.log("hashed", hashedToken)

    user.emailVerificationToken = hashedToken,
        user.emailVerificationExpiry = tokenExpiry

    await user.save({ validateBeforeSave: false })

    await sendEmail({
        email: user?.email,
        subject: "Please verify your email",
        mailgenContent: verificatioMailContent(user?.firstName, `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`)
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")

    if (!createdUser) {
        throw new ApiErrors(500, "Unable to fetch user details",)
    }

    return res.status(201).json(
        new ApiResponse(200, "User created successfully and verification mail has been sent on your email")
    )
})


export { handleRegister }