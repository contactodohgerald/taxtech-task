"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.set("strictQuery", false);
const connection = () => {
    try {
        mongoose_1.default.connect(process.env.MONGO_URI ?? '');
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.connection = connection;
//# sourceMappingURL=connection.js.map