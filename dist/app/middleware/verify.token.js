"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const default_1 = __importDefault(require("../../config/default"));
const verifyLoginToken = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token || token == null)
        return res.status(401).json({ status: false, message: 'Login to continue' });
    jsonwebtoken_1.default.verify(token, default_1.default.jwt_secret(), (err, user) => {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError)
            return res.status(401).json({ status: false, message: 'Unauthorized! Access Token was expired!' });
        if (err instanceof jsonwebtoken_1.default.JsonWebTokenError)
            return res.status(401).json({ status: false, message: 'Unauthorized! Invalid Token!' });
        if (err)
            return res.status(401).json({ status: false, message: 'Not Authenticated' });
        req.user = user;
        next();
    });
};
exports.default = verifyLoginToken;
