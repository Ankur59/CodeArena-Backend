import { asyncHandler } from "../utils/asyncHandler.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import { sendEmail, verificatioMailContent } from "../utils/mailgen.js";
import crypto from "crypto"



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

    user.emailVerificationToken = hashedToken,
        user.emailVerificationExpiry = tokenExpiry

    await user.save({ validateBeforeSave: false })

    await sendEmail({
        email: user?.email,
        subject: "Please verify your email",
        mailgenContent: verificatioMailContent(user?.firstName, `http://localhost:5173/verify-email/${unHashedToken}`)
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")

    if (!createdUser) {
        throw new ApiErrors(500, "Unable to fetch user details")
    }

    return res.status(201).json(
        new ApiResponse(200, "User created successfully and verification mail has been sent on your email")
    )
})



const handlerVerify = asyncHandler(async (req, res) => {
    const time = Date.now()
    const token = req.params.id
    if (!token) {
        throw new ApiErrors(400, "No Token provided")
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
    const userData = await User.findOne({ emailVerificationToken: hashedToken })

    if (!userData) {
        throw new ApiErrors(401, "Invalid Token Provided")
    }
    res.status(200).json(new ApiResponse(200, "Email Verification Complete"))
})


const handleLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiErrors(400, "Email and Password is required");
    }

    const userDetails = await User.findOne({ email });

    if (!userDetails) {
        throw new ApiErrors(404, "User not found");
    }

    const matchPassword = await userDetails.isPasswordCorrect(password);

    if (!matchPassword) {
        throw new ApiErrors(401, "Incorrect Password");
    }

    const { AccessToken, RefreshToken } = await generateAccessandRefreshToken(userDetails._id);

    const UserData = await User.findById(userDetails._id)
        .select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");

    res.status(200)
        .cookie("accessToken", AccessToken, { httpOnly: true, secure: true })
        .cookie("refreshToken", RefreshToken, { httpOnly: true, secure: true })
        .json(new ApiResponse(200, "User Logged in", { data: UserData }));
});



export { handleRegister, handlerVerify, handleLogin }














// const handleLogin = asyncHandler(async (req, res) => {

//     const { email, password } = req.body

//     if (!email || !password) {
//         throw new ApiErrors(400, "Email and Password is required")
//     }

//     const userDetails = await User.findOne({ email: email })

//     if (!userDetails) {
//         throw new ApiErrors(404, "User not found")
//     }

//     const matchPassword = await userDetails.isPasswordCorrect(password)

//     if (!matchPassword) {
//         throw new ApiErrors(401, "Incorrect Password")
//     }
//     const { AccessToken, RefreshToken } = await generateAccessandRefreshToken(userDetails._id)

//     const UserData = User.findById(userDetails._id).select("- password -refreshToken -emailVerificationToken -emailVerificationExpiry")
//     const options = {
//         httpOnly: true,
//         secure: true
//     }

//     res.status(200)
//         .cookie("accessToken", AccessToken)
//         .cookie("refreshToken", RefreshToken)
//         .json(
//             new ApiResponse(200, "User Logged in", {
//                 data: UserData
//             })
//         )
// })