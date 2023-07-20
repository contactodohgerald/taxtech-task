"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const todo_schema_1 = __importDefault(require("../../database/schema/todo.schema"));
class TodoService {
    async saveTodo(data) {
        return await todo_schema_1.default.create(data);
    }
    async getTodo(id) {
        return await todo_schema_1.default.findOne(id);
    }
    async getTasks(condition) {
        return await todo_schema_1.default.where(condition).find();
    }
    async updateTask(id, data) {
        return await todo_schema_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteTask(id) {
        return await todo_schema_1.default.findByIdAndDelete(id);
    }
}
exports.TodoService = TodoService;
