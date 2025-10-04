import { asyncHandler } from "../utils/asyncHandler.js";
import Performance from "../models/performance.model.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";

async function runDynamicAggregation(userId, year, month) {
    const pipeline = [
        {
            $match: {
                submittedBy: userId,
                $expr: {
                    $and: [
                        { $eq: [{ $year: "$createdAt" }, year] },
                        { $eq: [{ $month: "$createdAt" }, month] }
                    ]
                }
            }
        },
        {
            $group: {
                _id: {
                    submittedBy: "$submittedBy",
                    year: { $year: "$createdAt" },
                    day: { $dayOfMonth: "$createdAt" }
                },
                dailyEntry: { $first: "$$ROOT" }
            }
        },

        {
            $replaceRoot: {
                newRoot: "$dailyEntry"
            }
        },
        {

            $project: {

                // FIX: When using an expression to create a field (like dayOfMonth),

                // the projection must be in 'inclusion' mode. We only explicitly

                // exclude '_id' and include 'dayOfMonth'. All other fields

                // (questionId, runTimeMs, createdAt, etc.) are automatically excluded.


                // Exclude the default MongoDB ID

                _id: 0,



                // Create the desired field containing only the day of the month

                dayOfMonth: { $dayOfMonth: "$createdAt" }

            }

        },
        {
            $sort: { createdAt: 1 }
        }
    ];

    return await Performance.aggregate(pipeline);
}
const handleCalenderStreak = asyncHandler(async (req, res) => {
    const { year, month } = req.body;

    // Validate required parameters
    if (!year || !month) {
        throw new ApiErrors(400, "Year and Month is required")
    }

    // Validate year and month ranges
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);

    if (yearNum < 2000 || yearNum > 2100) {
        throw new ApiErrors(400, "Year should be between 2000 and 2100")
    }

    if (monthNum < 1 || monthNum > 12) {
        throw new ApiErrors(400, "Months should be between 1-12")
    }
    // console.log("year", yearNum, "month", monthNum)
    const userId = req.user._id
    // Run aggregation with dynamic parameters
    const data = await runDynamicAggregation(userId, yearNum, monthNum);
    console.log(data)
    res.status(200).json(new ApiResponse(200, "Found", { streak: data }))
})

export { handleCalenderStreak }