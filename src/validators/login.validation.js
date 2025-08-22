import { body } from "express-validator";

export const userLoginValidation = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is Invalid"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password cannot be empty")
            .isLength({ min: 8 })
            .withMessage("Password must be atleast 8 characters long")
    ]
}