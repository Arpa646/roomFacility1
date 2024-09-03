"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose"); // Added import for `model`
const facilitySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false, // Default value is false indicating the record is not deleted
    },
});
// Create the model
const FacilityModel = (0, mongoose_1.model)("Facility", facilitySchema);
exports.default = FacilityModel;
