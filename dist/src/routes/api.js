"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const controller_1 = __importDefault(require("../app/controllers/controller"));
const register_controller_1 = __importDefault(require("../app/controllers/register.controller"));
const login_controller_1 = __importDefault(require("../app/controllers/login.controller"));
const todo_controller_1 = __importDefault(require("../app/controllers/todo.controller"));
const verify_token_1 = __importDefault(require("../app/middleware/verify.token"));
const todo_controller_2 = __importDefault(require("../app/controllers/API/todo.controller"));
router.get('/health', controller_1.default.healthCheck);
router.post('/register', register_controller_1.default.createUser);
router.post('/login', login_controller_1.default.loginUser);
router.post('/add-taskes', verify_token_1.default, todo_controller_1.default.createTodo);
router.get('/all-taskes', verify_token_1.default, todo_controller_1.default.getUserTask);
router.get('/taskes/:id', verify_token_1.default, todo_controller_1.default.getTask);
router.put('/update-taskes/:id', verify_token_1.default, todo_controller_1.default.updateTodo);
router.delete('/delete-taskes/:id', verify_token_1.default, todo_controller_1.default.deleteTask);
//for the MVC requests
router.post('/task-create/:userId', verify_token_1.default, todo_controller_2.default.createTodo);
router.get('/task-get/:userId', verify_token_1.default, todo_controller_2.default.getTaskForUser);
// router.get('/task/:id', verifyLoginToken, todoController.getTask)
// router.put('/task-update/:id', verifyLoginToken, todoController.updateTodo)
// router.delete('/task-delete/:id', verifyLoginToken, todoController.deleteTask)
const combineRouter = (app) => app.use('/api/v1/', router);
exports.default = combineRouter;
//# sourceMappingURL=api.js.map