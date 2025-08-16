import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js"

const router = express.Router()

router.get("/register", asyncHandler(async (req, res) => {
    res.status(200).json({
        success: "true  "
    })
}))

export default router