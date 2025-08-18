import { validationResult } from "express-validator";
import ApiErrors from "../utils/ApiErrors.js";

export const ValidatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next(); // no errors, continue
    }

    const extractedError = errors.array().map((err) => ({
        [err.param]: err.msg
    }));

    // Use the first error message as the main message
    const mainMessage = Object.values(extractedError[0])[0];

    throw new ApiErrors(422, mainMessage, extractedError);
};
