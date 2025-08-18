import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { handleRegister } from "../controllers/user.controller.js"
import { ValidatorMiddleware } from "../middlewares/express.middleware.js"
import { userRegisterValidation } from "../validators/index.js"

const router = express.Router()

router.route("/register").post(userRegisterValidation(), ValidatorMiddleware, handleRegister)

export default router