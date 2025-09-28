import { User } from "../models/user.model.js";
import ApiErrors from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const handleIsUnique = asyncHandler(async (req, res) => {
    console.log(req.query)
    const { userName } = req.query;

    if (!userName) {
        throw new ApiErrors(400, "UserName is required")
    }
    console.log("Got this", userName)
    const user = await User.findOne({ userName });

    res.json({ isUnique: !user });
});
export { handleIsUnique }