import mongoose from "mongoose"
// import { number } from "zod"
// import { required } from "zod/mini"
// import { string } from "zod/mini"


const questionSchema = new mongoose.Schema({
    questionId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    titleSlug: {
        type: String,
        required: true,
        unique: true
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true,
    },
    acRate: {
        type: Number,
        min: 0,
        max: 100,
    }

})

const Question = mongoose.model('question', questionSchema)

questionSchema.pre("save", async function () {
    if (this.isNew) {
        const length = await mongoose.model("question").countDocuments()
        this.questionId = length + 1
    }
})


export default Question