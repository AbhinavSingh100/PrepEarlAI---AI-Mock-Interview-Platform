const mongoose = require("mongoose");

const interviewSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: String,
    experience: String,
    stack: [String],
    questions: [String],
    answers: [String],
    feedback: String,
    startedAt: Date,
    endedAt: Date,
}, {timestamps: true});

module.exports = mongoose.model("InterviewSession", interviewSessionSchema);