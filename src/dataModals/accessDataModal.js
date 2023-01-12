const mongoose = require('mongoose');
const accessModal = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userProfilePic: {
        type: String,
    },
    userRegisteredOn: {
        type: Date,
        default: new Date()
    },
    userStatus: {
        type: String,
        required: true,
        default: "active"

    },
    userPassword: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model("accessModal", accessModal)