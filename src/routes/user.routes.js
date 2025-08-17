import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { handleRegister } from "../controllers/user.controller.js"

const router = express.Router()

router.route("/register").post(handleRegister)

export default router