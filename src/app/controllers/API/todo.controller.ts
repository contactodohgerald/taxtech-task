import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';

import { TodoService } from './../../service/todo.service';
import { MulterError } from "multer";
import upload from "../../middleware/multer";

class TodoController {

    private todoInstance

    constructor () {
        this.todoInstance = new TodoService()
    }

    createTodo = asyncHandler( async(req: Request, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const userId = req.params.userId;

        const validator = new Validator(body, {
            name: 'required|string|min:3',
            due_date: 'required|date',
            priority: 'required|string',
            description: 'required|string|min:3'
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        let attachement = null
        if (req.file) {
            attachement = upload.single('attachment')(req, res, (err) => {
                if (err instanceof MulterError) {
                    return res.status(400).json({status: false, message: err.message})
                } else if (err) {
                    return res.status(400).json({status: false, message: 'File upload failed'})
                } 
            })
        }

        const { name, due_date, priority, reminder, description} = body;

        const storeTask = await this.todoInstance.saveTodo({
            userId, name, due_date, priority, description, reminder, attachement
        })
        
        return res.status(201).json({status: true, message: "Task created successfully", data: storeTask});

    })

    getTaskForUser = asyncHandler( async (req: Request, res: Response): Promise<any> => {
        const userId = req.params.userId;

        const taskes = await this.todoInstance.getTasks({userId})

        if(taskes.length == 0) return res.status(403).json({status: false, message: "no taskes was found", data: []})

        return res.status(200).json({status: true, message: "User's task returned successfully", data: taskes})

    })
}

export default new TodoController()