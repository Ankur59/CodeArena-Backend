import mongoose from 'mongoose';

const ProblemListSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,

    },
    description: {
        type: String,
        trim: true,
        default: 'A custom list of coding problems.',
        maxlength: 500,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Assumes a 'User' model exists
        required: true,
        index: true,
    },
    problems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question',
    }],
    visibility: {
        type: String,
        enum: ['public', 'private', 'unlisted'],
        default: 'private',
        required: true,
    },
    savesCount: {
        type: Number,
        default: 0,
    },
    tags: [String],
}, {
    timestamps: true,
});

ProblemListSchema.index({ owner: 1, title: 1 }, { unique: true });

const ProblemList = mongoose.model('ProblemList', ProblemListSchema);

export default ProblemList;