"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const mongoose_1 = __importDefault(require("mongoose"));
const DB = process.env.DB;
mongoose_1.default.connect(DB).then(() => {
    console.log('DB Connected');
});
const server = (0, app_1.createServer)();
const port = 5000;
server.listen(port, () => {
    console.log(`api running on ${port}`);
});
