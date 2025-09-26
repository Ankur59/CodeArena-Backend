import mongoose, { model, Schema } from "mongoose";



const submissionSchema = new Schema({
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
        required: true
    },
    timeTaken: {
        type: String,
        required: true,
    },
    memoryUsed: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    sourceCode: {
        type: String,
        required: true
    },
    isPassed: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })


export const Submissions = model("submission", submissionSchema)