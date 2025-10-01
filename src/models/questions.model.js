import mongoose from "mongoose"



const questionSchema = new mongoose.Schema({
    questionId: {
        type: String,
        unique: true,
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
    },
    tags: {
        type: [String],
        required: true
    }

})
questionSchema.pre("validate", async function () {
    if (this.isNew && !this.questionId) {
        const length = await mongoose.model("question").countDocuments();
        this.questionId = String(length + 1);
    }
});
const Question = mongoose.model('question', questionSchema)




export default Question