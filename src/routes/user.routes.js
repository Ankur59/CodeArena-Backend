import express from "express"
import { handleRegister, handlerVerify, handleLogin, handleLogout } from "../controllers/user.controller.js"
import { ValidatorMiddleware } from "../middlewares/express.middleware.js"
import { userRegisterValidation } from "../validators/register.validation.js"
import { userLoginValidation } from "../validators/login.validation.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const router = express.Router()

router.route("/register").post(userRegisterValidation(), ValidatorMiddleware, handleRegister)

router.route("/verify-user/:id").post(handlerVerify)

router.route("/login").post(userLoginValidation(), ValidatorMiddleware, handleLogin)

router.route("/logout").post(authMiddleware,handleLogout)

export default router