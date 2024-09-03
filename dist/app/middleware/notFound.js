"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//this is gobal handler error crack system all error are catch here
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Not Found",
    });
};
exports.default = notFound;
// app.use();
