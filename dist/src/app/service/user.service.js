"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_schema_1 = __importDefault(require("../../database/schema/user.schema"));
class UserService {
    async saveUser(data) {
        return await user_schema_1.default.create(data);
    }
    async getUser(data) {
        return await user_schema_1.default.findOne(data);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map