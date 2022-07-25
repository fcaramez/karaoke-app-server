"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const requestSchema = new mongoose_1.Schema({
    song: {
        type: String,
        required: [true, "Please submit a song!"],
    },
    singers: {
        type: String,
        required: [true, "Please select a singer"],
    },
});
const Request = (0, mongoose_1.model)("Request", requestSchema);
module.exports = Request;
