const mongoose = require('mongoose');
const taskModal = new mongoose.Schema({
    taskAddedBy: {
        type: String,
        required: true
    },
    taskAddedOn: {
        type: Date,
        default: new Date(),
    },
    taskCategory: {
        type: String,
        required: true
    },
    taskStatus: {
        type: String,
        required: true,
        default: "incomplete"
    },
    taskDescription: {
        type: String,
        required: true
    },
    taskTitle: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("taskModal", taskModal)