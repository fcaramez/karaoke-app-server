"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "Username already taken"],
    },
    type: {
        type: String,
        enum: ["Admin", "Regular"],
        default: "Regular",
    },
    password: {
        type: String,
        required: true,
    },
});
const User = (0, mongoose_1.model)("User", userSchema);
module.exports = User;
