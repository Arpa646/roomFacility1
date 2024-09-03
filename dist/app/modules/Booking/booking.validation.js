"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidationSchema = void 0;
const zod_1 = require("zod");
exports.bookingValidationSchema = (0, zod_1.object)({
    facility: (0, zod_1.string)().regex(/^[a-f\d]{24}$/i, 'Invalid facility ID format'), // Assuming MongoDB ObjectId format
    date: (0, zod_1.string)().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
    startTime: (0, zod_1.string)().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid startTime format (HH:MM)'),
    endTime: (0, zod_1.string)().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid endTime format (HH:MM)'),
});
