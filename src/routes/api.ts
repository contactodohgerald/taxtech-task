import {Router} from "express";

const router = Router();

import controller from "../app/controllers/controller";
import register from "../app/controllers/register.controller";
import login from "../app/controllers/login.controller";

import todo from "../app/controllers/todo.controller";
import verifyLoginToken from "../app/middleware/verify.token";
import todoController from "../app/controllers/API/todo.controller";


router.get('/health', controller.healthCheck)
router.post('/register', register.createUser)
router.post('/login', login.loginUser)

router.post('/add-taskes', verifyLoginToken, todo.createTodo)
router.get('/all-taskes', verifyLoginToken, todo.getUserTask)
router.get('/taskes/:id', verifyLoginToken, todo.getTask)
router.put('/update-taskes/:id', verifyLoginToken, todo.updateTodo)
router.delete('/delete-taskes/:id', verifyLoginToken, todo.deleteTask)

//for the MVC requests
router.post('/task-create/:userId', verifyLoginToken, todoController.createTodo)
router.get('/task-get/:userId', verifyLoginToken, todoController.getTaskForUser)
// router.get('/task/:id', verifyLoginToken, todoController.getTask)
// router.put('/task-update/:id', verifyLoginToken, todoController.updateTodo)
// router.delete('/task-delete/:id', verifyLoginToken, todoController.deleteTask)

const combineRouter = (app: any) => app.use('/api/v1/', router);

export default combineRouter;