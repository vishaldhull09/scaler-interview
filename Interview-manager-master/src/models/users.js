const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    "email": {
        type: String,
        required: true,
        minlength: 5,
        lowercase: true
    },
});

const UserModel = mongoose.model("userDetails", UsersSchema, "userDetails");

module.exports.UserModel = UserModel;