"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../controllers/authentication"));
const router = (0, express_1.Router)();
router.post('/signup', authentication_1.default.signUp);
router.post('/login', authentication_1.default.login);
router.post('/logout', authentication_1.default.logout);
exports.default = router;
