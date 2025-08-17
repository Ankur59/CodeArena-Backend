import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from "nodemailer"

const handleRegister = asyncHandler(
    (req, res) => {
        res.status(200).json({
            message: "Ok"
        })

    })


export { handleRegister }