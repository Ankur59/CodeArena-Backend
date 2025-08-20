import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { handleRegister, handlerVerify, handleLogin } from "../controllers/user.controller.js"
import { ValidatorMiddleware } from "../middlewares/express.middleware.js"
import { userRegisterValidation } from "../validators/register.validation.js"

const router = express.Router()

router.route("/register").post(userRegisterValidation(), ValidatorMiddleware, handleRegister)

router.route("/verify-user/:id").post(handlerVerify)

router.route("/login").post(handleLogin)

export default router