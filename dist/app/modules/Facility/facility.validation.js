"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityValidationSchema = void 0;
const zod_1 = require("zod");
exports.facilityValidationSchema = (0, zod_1.object)({
    name: (0, zod_1.string)().min(6, 'Name must be at least 6 characters long'),
    description: (0, zod_1.string)(),
    pricePerHour: (0, zod_1.number)(),
    location: (0, zod_1.string)(),
});
