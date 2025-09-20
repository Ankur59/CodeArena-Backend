import mongoose, { Schema, model } from "mongoose";

const userDetailSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    questionSolved: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "questions"
    },
    questionAttempted: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "questions"
    },
    matchPlayed: {
        type: Number,
        default: 0
    },
    matchWon: {
        type: Number,
        default: 0
    },
    matchLost: {
        type: Number,
        default: 0
    },
    highestStreak: {
        type: Number,
        default: 0
    },
    timeSpentSolving: {
        type: Number,
        default: 0 // in seconds or minutes, as per your design
    }
}, { timestamps: true });

export const UserDetail = model("userDetails", userDetailSchema);
