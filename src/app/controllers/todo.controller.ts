import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';

import { TodoService } from './../service/todo.service';
import { UserService } from "../service/user.service";
import { MulterError } from "multer";
import upload from "../middleware/multer";
import { IGetUserAuthInfoRequest } from "../../types/request";

class TodoController {

    private todoInstance
    private userInstance

    constructor () {
        this.todoInstance = new TodoService()
        this.userInstance = new UserService()
    }

    createTodo = asyncHandler( async(req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body

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

        const user = await this.userInstance.getUser({username: req.user?.username});

        const storeTask = await this.todoInstance.saveTodo({
            userId: user?._id, name, due_date, priority, description, reminder, attachement
        })
        
        return res.status(201).json({status: true, message: "Task created successfully", data: storeTask});

    })

    getUserTask = asyncHandler( async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
        const user = await this.userInstance.getUser({username: req.user?.username});

        const taskes = await this.todoInstance.getTasks({userId: user?._id})

        if(taskes.length == 0) return res.status(403).json({status: false, message: "no taskes was found", data: []})

        return res.status(200).json({status: true, message: "User's task returned successfully", data: taskes})

    })

    getTask = asyncHandler( async (req: Request, res: Response): Promise<any> => {
        const params =  req.params.id

        const taskes = await this.todoInstance.getTodo({_id: params})

        if(!taskes) return res.status(403).json({status: false, message: "no task was found", data: {}})

        return res.status(200).json({status: true, message: "Task returned successfully", data: taskes})

    })

    updateTodo = asyncHandler( async(req: Request, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const params =  req.params.id

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

        const taskes = await this.todoInstance.updateTask(params, {name, due_date, priority, reminder, description, attachement})
        
        return res.status(200).json({status: true, message: "Task Updated successfully", data: taskes});

    })

    deleteTask = asyncHandler( async (req: Request, res: Response): Promise<any> => {
        const params =  req.params.id

        const taskes = await this.todoInstance.deleteTask(params)

        if(!taskes) return res.status(403).json({status: false, message: "no task was found", data: {}})

        return res.status(200).json({status: true, message: "Task returned successfully", data: taskes})

    })
}

export default new TodoController()