import { body } from 'express-validator';


export const userRegisterValidation = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is Invalid"),
        body("firstName")
            .trim()
            .notEmpty()
            .withMessage("First Name is required")
            .isLength({ min: 3 })
            .withMessage("Minimum 3 character required"),
        body("lastName")
            .trim()
            .notEmpty()
            .withMessage("First Name is required")
            .isLength({ min: 3 })
            .withMessage("Minimum 3 character required"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password cannot be empty")
            .isLength({ min: 8 })
            .withMessage("Password must be atleast 8 characters long")
    ]
}