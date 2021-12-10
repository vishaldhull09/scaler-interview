const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
    "title": {
        type: String,
        required: true
    },
    "participants": [String],
    "startTime": {
        type: Date,
        required: true
    },
    "endTime": {
        type: Date,
        required: false
    }
});

const InterviewModel = mongoose.model("interviewDetails", InterviewSchema, "interviewDetails");

module.exports.InterviewModel = InterviewModel;