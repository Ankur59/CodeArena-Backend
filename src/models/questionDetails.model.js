import mongoose from "mongoose";

const questionDetailsSchema = new mongoose.Schema(
    {
        QuestionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question",
            required: true,
        },
        // template
        starterCode: {
            type: [
                {
                    id: {
                        type: String,
                        required: true
                    },
                    label: {
                        type: String,
                        required: true
                    },
                    judge0Id: {
                        type: Number,
                        required: true
                    },
                    boilerPlate: {
                        type: String,
                        required: true
                    },
                }
            ],
            required: true
        },

        // company tags
        companyTags: {
            type: Array,
            default: []
        },
        // description
        description: {
            type: String,
            required: true,
        },

        // Time Limit
        timeLimit: {
            type: Number, // in ms or seconds
            required: true,
        },
        functionName: {
            type: String,
            required: true
        },
        params: {
            type: Array,
            required: true
        },
        publicTestCase: {
            type: [
                {
                    id: {
                        type: Number,
                        required: true
                    },
                    input: {
                        type: String,
                        required: true
                    },
                    output: {
                        type: String,
                        required: true
                    }
                }
            ],
            required: true
        },
        privateTestCase: {
            type: [
                {
                    id: {
                        type: Number,
                        required: true
                    },
                    input: {
                        type: String,
                        required: true
                    },
                    output: {
                        type: String,
                        required: true
                    }
                }
            ]
        },
        solution: {
            type: new mongoose.Schema(
                {
                    javascript: { type: String, default: "" },
                    python: { type: String, default: "" },
                    java: { type: String, default: "" },
                },
                { _id: false } // prevents mongoose from adding an extra _id for the subdocument
            ),
            required: true,
        },

        topicsCovered: {
            type: [String], // array of strings
            default: [],
            required: true
        },
        // stoop 
        // Extra
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        // memoryLimit: {
        //     type: Number, // in MB
        //     required: true,
        // },


    },
    { timestamps: true }
);

const QuestionDetails = mongoose.model(
    "questionDetails",
    questionDetailsSchema
);

export default QuestionDetails;
