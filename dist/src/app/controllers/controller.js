"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
class Controller {
    constructor() {
        this.healthCheck = (0, express_async_handler_1.default)((req, res) => {
            res.status(200).json({ status: true, message: "this is a health check !!!" });
        });
    }
}
exports.default = new Controller();
//# sourceMappingURL=controller.js.map