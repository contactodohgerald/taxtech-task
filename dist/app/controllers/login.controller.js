"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validatorjs_1 = __importDefault(require("validatorjs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("../service/user.service");
const default_1 = __importDefault(require("../../config/default"));
class LoginController {
    constructor() {
        this.loginUser = (0, express_async_handler_1.default)(async (req, res) => {
            const body = req.body;
            const validator = new validatorjs_1.default(body, {
                credential: 'required|string',
                password: 'required|string|min:3',
            });
            if (validator.fails())
                return res.status(400).json({ status: false, message: validator.errors.all() });
            const { credential, password } = body;
            let userExists = await this.userInstance.getUser({ email: credential });
            if (!userExists) {
                userExists = await this.userInstance.getUser({ username: credential });
            }
            if (!userExists)
                return res.status(400).json({ status: false, message: "Either email or username does not exist" });
            const checkPassword = await bcrypt_1.default.compare(password, userExists.password);
            if (!checkPassword)
                return res.status(400).json({ status: false, message: "Incorrect password" });
            const payload = { uuid: userExists._id, username: userExists.username, email: userExists.email };
            const token = jsonwebtoken_1.default.sign(payload, default_1.default.jwt_secret(), { expiresIn: default_1.default.jwt_expires() });
            return res.status(200).json({ status: true, message: "login successfull", data: {
                    ...payload, token,
                } });
        });
        this.userInstance = new user_service_1.UserService();
    }
}
exports.default = new LoginController();
