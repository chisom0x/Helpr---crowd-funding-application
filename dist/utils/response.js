"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = successResponse;
exports.errorResponse = errorResponse;
function successResponse(res, data) {
    return res.status(200).json({
        status: true,
        message: 'Successful',
        data: data,
    });
}
function errorResponse(res, statusCode, message) {
    return res.status(statusCode).json({
        status: false,
        message: message,
        data: null
    });
}
