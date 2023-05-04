"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    longitud: {
        type: String,
        required: true
    },
    latitud: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    collection: "Locations"
});
module.exports = (0, mongoose_1.model)('Locations', locationSchema);
