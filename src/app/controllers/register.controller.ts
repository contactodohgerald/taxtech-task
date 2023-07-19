import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';
import bcrypt from "bcrypt";

import { UserService } from "../service/user.service";

class RegisterController {

    private userInstance

    constructor () {
        this.userInstance = new UserService()
    }

    createUser = asyncHandler( async(req: Request, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const validator = new Validator(body, {
            name: 'required|string|min:3',
            username: 'required|string',
            email: 'required|email|string',
            password: 'required|string|min:3',
            c_password: 'required|string|min:3'
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const { name, username, email, password, c_password} = body;

        if(password != c_password) return res.status(400).json({status: false, message: "Password does not match"});

        const emailExists = await this.userInstance.getUser({email})
        if (emailExists) return res.status(400).json({status: false, message: "Email already exists"}) 

        const usernameExists = await this.userInstance.getUser({username})
        if (usernameExists) return res.status(400).json({status: false, message: "Username is not available"})

        const hashPassword = await bcrypt.hash(password, 10);

        const storeUser = await this.userInstance.saveUser({
            name, email, username, password: hashPassword
        });

        if (!storeUser) return res.status(500).json({status: false, message: 'An error occured'});
        
        return res.status(201).json({status: true, message: "User created successfully", data: storeUser});

    })

}

export default new RegisterController()