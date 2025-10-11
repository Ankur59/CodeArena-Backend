const getYearActivity = async (userId, Year, Day, Month) => {

    if (Day && Month && Year) {
        // Aggregation to fetch single day streak
        return (
            [{
                $match: {
                    submittedBy: ObjectId(
                        "68a80e9333a052c0d9215f15"
                    ),
                    $expr: {
                        $and: [
                            { $eq: [{ $year: "$createdAt" }, 2025] },
                            { $eq: [{ $month: "$createdAt" }, 9] }, // October
                            { $eq: [{ $dayOfMonth: "$createdAt" }, 23] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $addFields: {
                    date: {
                        $dateFromParts: {
                            year: "$_id.year",
                            day: "$_id.day",
                            month: "$_id.month"
                        }
                    }
                }
            },
            { $unset: "_id" },
            {
                $project: {
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$date"
                        }
                    },
                    count: "$count"
                }
            }
            ]
        )
    }
    else if (!Day && !Month && Year) {
        return (
            [
                {
                    $match: {
                        submittedBy: ObjectId(
                            "68a80e9333a052c0d9215f15"
                        ),
                        $expr: {
                            $eq: [{ $year: "$createdAt" }, 2025]
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" },
                            day: { $dayOfMonth: "$createdAt" }
                        },
                        count: { $sum: 1 }
                    }
                },
                {
                    $addFields: {
                        date: {
                            $dateFromParts: {
                                year: "$_id.year",
                                day: "$_id.day",
                                month: "$_id.month"
                            }
                        }
                    }
                },
                { $unset: "_id" },
                {
                    $project: {
                        date: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$date"
                            }
                        },
                        count: "$count"
                    }
                }
            ]
        )
    }
}