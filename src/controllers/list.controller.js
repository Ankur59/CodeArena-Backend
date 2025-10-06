import ProblemList from "../models/lists.model.js"
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"



// Merge this with handleAlllist callign 2 contoller for almost same thing is bad
const handleAllListNames = asyncHandler(async (req, res, next) => {
    if (!req.user || !req.user._id) {
        throw new ApiErrors(401, "Unauthorized access: User ID not found.");
    }

    const userId = req.user._id;
    let lists;


    lists = await ProblemList.find({ owner: userId }).select('listName createdAt').select("title")

    const finalResult = lists.map(list => list.title);
    return res.status(200).json(
        new ApiResponse(
            200,
            finalResult,
            "Successfully fetched all problem lists."
        )
    );
});


const handleCreateNewList = asyncHandler(async (req, res) => {
    console.log("hghghghhg")
    const { title, description } = req.body
    const userId = req.user._id
    if (!userId) {
        throw new ApiErrors(401, "Unauthorized")
    }
    const exists = await ProblemList.findOne({ owner: req.user._id, title: title })
    if (exists) {
        console.log("dup found")
        throw new ApiErrors(400, "List name already exists")
    }
    const list = await ProblemList.create({
        title: title,
        description: description,
        owner: userId,
    })
    res.status(201).json(new ApiResponse(201, "List created"))
})


const handleAddToList = asyncHandler(async (req, res) => {
    const { listName, questionId } = req.body

    const list = await ProblemList.findOne({ owner: req.user._id, title: listName })
    if (!list) {
        throw new ApiErrors(404, "No list found")
    }
    if (list.problems.includes(questionId)) {
        throw new ApiErrors(409, "Question already exists")
    }
    list.problems.push(questionId)
    await list.save({ validateBeforeSave: true })
    res.status(200).json(new ApiResponse(200, "Question Added"))
})

const handleAllList = asyncHandler(async (req, res) => {
    const userId = req.user._id

    const lists = await ProblemList.find({ owner: userId }).select("title visibility")
    console.log("vvv", lists)
    res.status(201).json(new ApiResponse(201, lists))
})


const handleListDetails = asyncHandler(async (req, res) => {
    const { listId } = req.query


    const userId = req.user._id
    console.log("this is id", listId)
    const list = await ProblemList.findOne({ _id: listId, owner: userId }).populate('problems').select("-_id title description problems")

    if (!list) {
        throw new ApiErrors(404, "No list found")
    }
    res.status(200).json(new ApiResponse(200, "Data fetched", { info: list }))
})
export { handleAllListNames, handleCreateNewList, handleAddToList, handleAllList, handleListDetails };