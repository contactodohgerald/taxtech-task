"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DefaultExports {
    constructor() {
        this.port = () => process.env.SERVER_PORT;
        this.jwt_secret = () => process.env.JWT_SECRET;
        this.jwt_expires = () => process.env.JWT_EXPIRES;
    }
}
exports.default = new DefaultExports();
