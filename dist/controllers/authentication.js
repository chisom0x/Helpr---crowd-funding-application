"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_helper_1 = __importDefault(require("../utils/jwt-helper"));
const app_error_1 = __importDefault(require("../utils/app-error"));
const user_1 = __importDefault(require("../services/user"));
const response_1 = require("../utils/response");
class Authentication {
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountType, name, email, password } = req.body;
            if (!accountType)
                return next(new app_error_1.default('please specify an account type', 400));
            if (!name)
                return next(new app_error_1.default('please enter a name', 400));
            if (!email)
                return next(new app_error_1.default('please enter your email address', 400));
            if (!password)
                return next(new app_error_1.default('please enter a password', 400));
            try {
                if (yield user_1.default.userByEmail(email))
                    return next(new app_error_1.default('email already exists!', 400));
                const user = yield user_1.default.createUser(accountType, name, email, password);
                return (0, jwt_helper_1.default)(user, 200, res);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email)
                return next(new app_error_1.default('please enter your email address', 400));
            if (!password)
                return next(new app_error_1.default('please enter a password', 400));
            try {
                const user = yield user_1.default.userByEmail(email);
                let userPass = !user ? 'no_user' : user.password;
                const pass = yield bcrypt_1.default.compare(password, userPass);
                if (user && pass)
                    return (0, jwt_helper_1.default)(user, 200, res);
                return next(new app_error_1.default('incorrect email or password!', 400));
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie('jwt', 'logged out', {
                    expires: new Date(Date.now() + 10 * 1000),
                    httpOnly: true,
                });
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = Authentication;
