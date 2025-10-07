// questions.js
export const getQuestionsWithSolvedFlag = (solvedIds, lastId, filters) => {
    let query =
    {
        numericId: { $gt: Number(lastId) }
    };
    if (filters.length > 0) {
        query.tags = { $in: filters }
    }

    return ([
        {
            $addFields: { numericId: { $toInt: "$questionId" } }
        },
        {
            $match: query
        },
        {
            $addFields: {
                isSolved: {

                    $cond: {
                        if: { $in: ["$_id", solvedIds] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        { $sort: { numericId: 1 } },
        { $limit: 5 }

    ])

}


// }numericId: { $gt: Number(lastId) }