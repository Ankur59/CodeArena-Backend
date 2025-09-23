const mongoose = require('mongoose');

// Define the schema for the Performance collection
const performanceSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions', // Assuming a 'Question' model exists
        required: true,
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Assuming a 'User' model exists
        required: true,
    },
    runTimeMs: {
        type: Number,
        required: true,
    },
    memoryBytes: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create a compound index for efficient lookups by question and user
performanceSchema.index({ questionId: 1, submittedBy: 1 });

// Create and export the Mongoose model
const Performance = mongoose.model('Performance', performanceSchema);

module.exports = Performance;