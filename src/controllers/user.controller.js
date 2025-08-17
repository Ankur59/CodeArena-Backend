import { asyncHandler } from "../utils/asyncHandler.js";
import ApiErrors from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";


const handleRegister = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    const existedUser = await User.findone({ email })

    if (existedUser) {
        throw new ApiErrors(409,"User already exist",)

    }
})


export { handleRegister }