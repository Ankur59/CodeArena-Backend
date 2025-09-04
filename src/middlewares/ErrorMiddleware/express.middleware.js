import ApiErrors from "../../utils/ApiErrors.js";



const errorMiddleware = (err, req, res, next) => {

    console.log("this is error", err)
    if (err instanceof ApiErrors) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || [],
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined
        });
    }

    // For unexpected errors
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};

export default errorMiddleware;
