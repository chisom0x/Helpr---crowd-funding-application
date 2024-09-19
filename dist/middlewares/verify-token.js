"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_error_1 = __importDefault(require("../utils/app-error"));
const verifyToken = (req, res, next) => {
    var _a;
    try {
        let token;
        const authHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }
        else if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            return next(new app_error_1.default('Not logged in!', 400));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'object' && decoded !== null) {
            req.user = decoded;
        }
        else {
            req.user = decoded;
        }
        return next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = verifyToken;
