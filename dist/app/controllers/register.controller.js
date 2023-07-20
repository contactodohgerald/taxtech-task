"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validatorjs_1 = __importDefault(require("validatorjs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("../service/user.service");
class RegisterController {
    constructor() {
        this.createUser = (0, express_async_handler_1.default)(async (req, res) => {
            const body = req.body;
            const validator = new validatorjs_1.default(body, {
                name: 'required|string|min:3',
                username: 'required|string',
                email: 'required|email|string',
                password: 'required|string|min:3',
                c_password: 'required|string|min:3'
            });
            if (validator.fails())
                return res.status(400).json({ status: false, message: validator.errors.all() });
            const { name, username, email, password, c_password } = body;
            if (password != c_password)
                return res.status(400).json({ status: false, message: "Password does not match" });
            const emailExists = await this.userInstance.getUser({ email });
            if (emailExists)
                return res.status(400).json({ status: false, message: "Email already exists" });
            const usernameExists = await this.userInstance.getUser({ username });
            if (usernameExists)
                return res.status(400).json({ status: false, message: "Username is not available" });
            const hashPassword = await bcrypt_1.default.hash(password, 10);
            const storeUser = await this.userInstance.saveUser({
                name, email, username, password: hashPassword
            });
            if (!storeUser)
                return res.status(500).json({ status: false, message: 'An error occured' });
            return res.status(201).json({ status: true, message: "User created successfully", data: storeUser });
        });
        this.userInstance = new user_service_1.UserService();
    }
}
exports.default = new RegisterController();
