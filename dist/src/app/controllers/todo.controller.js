"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validatorjs_1 = __importDefault(require("validatorjs"));
const todo_service_1 = require("./../service/todo.service");
const user_service_1 = require("../service/user.service");
const multer_1 = require("multer");
const multer_2 = __importDefault(require("../middleware/multer"));
class TodoController {
    constructor() {
        this.createTodo = (0, express_async_handler_1.default)(async (req, res) => {
            const body = req.body;
            const validator = new validatorjs_1.default(body, {
                name: 'required|string|min:3',
                due_date: 'required|date',
                priority: 'required|string',
                description: 'required|string|min:3'
            });
            if (validator.fails())
                return res.status(400).json({ status: false, message: validator.errors.all() });
            let attachement = null;
            if (req.file) {
                attachement = multer_2.default.single('attachment')(req, res, (err) => {
                    if (err instanceof multer_1.MulterError) {
                        return res.status(400).json({ status: false, message: err.message });
                    }
                    else if (err) {
                        return res.status(400).json({ status: false, message: 'File upload failed' });
                    }
                });
            }
            const { name, due_date, priority, reminder, description } = body;
            const user = await this.userInstance.getUser({ username: req.user?.username });
            const storeTask = await this.todoInstance.saveTodo({
                userId: user?._id, name, due_date, priority, description, reminder, attachement
            });
            return res.status(201).json({ status: true, message: "Task created successfully", data: storeTask });
        });
        this.getUserTask = (0, express_async_handler_1.default)(async (req, res) => {
            const user = await this.userInstance.getUser({ username: req.user?.username });
            const taskes = await this.todoInstance.getTasks({ userId: user?._id });
            if (taskes.length == 0)
                return res.status(403).json({ status: false, message: "no taskes was found", data: [] });
            return res.status(200).json({ status: true, message: "User's task returned successfully", data: taskes });
        });
        this.getTask = (0, express_async_handler_1.default)(async (req, res) => {
            const params = req.params.id;
            const taskes = await this.todoInstance.getTodo({ _id: params });
            if (!taskes)
                return res.status(403).json({ status: false, message: "no task was found", data: {} });
            return res.status(200).json({ status: true, message: "Task returned successfully", data: taskes });
        });
        this.updateTodo = (0, express_async_handler_1.default)(async (req, res) => {
            const body = req.body;
            const params = req.params.id;
            const validator = new validatorjs_1.default(body, {
                name: 'required|string|min:3',
                due_date: 'required|date',
                priority: 'required|string',
                description: 'required|string|min:3'
            });
            if (validator.fails())
                return res.status(400).json({ status: false, message: validator.errors.all() });
            let attachement = null;
            if (req.file) {
                attachement = multer_2.default.single('attachment')(req, res, (err) => {
                    if (err instanceof multer_1.MulterError) {
                        return res.status(400).json({ status: false, message: err.message });
                    }
                    else if (err) {
                        return res.status(400).json({ status: false, message: 'File upload failed' });
                    }
                });
            }
            const { name, due_date, priority, reminder, description } = body;
            const taskes = await this.todoInstance.updateTask(params, { name, due_date, priority, reminder, description, attachement });
            return res.status(200).json({ status: true, message: "Task Updated successfully", data: taskes });
        });
        this.deleteTask = (0, express_async_handler_1.default)(async (req, res) => {
            const params = req.params.id;
            const taskes = await this.todoInstance.deleteTask(params);
            if (!taskes)
                return res.status(403).json({ status: false, message: "no task was found", data: {} });
            return res.status(200).json({ status: true, message: "Task returned successfully", data: taskes });
        });
        this.todoInstance = new todo_service_1.TodoService();
        this.userInstance = new user_service_1.UserService();
    }
}
exports.default = new TodoController();
//# sourceMappingURL=todo.controller.js.map