"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDataPresence = void 0;
const validateDataPresence = (req, res, next) => {
    const { data } = res.locals;
    if (!data || (Array.isArray(data) && data.length === 0)) {
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'No Data Found',
            data: [],
        });
    }
    next();
};
exports.validateDataPresence = validateDataPresence;
