import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';
import bcrypt from "bcrypt";

import { UserService } from "../service/user.service";
import defaults from "../../config/default";


class LoginController {

    private userInstance

    constructor () {
        this.userInstance = new UserService()
    }

    loginUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body

        const validator = new Validator(body, {
            credential: 'required|string',
            password: 'required|string|min:3',
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const {credential, password} = body

        let userExists = await this.userInstance.getUser({email: credential})
        if (!userExists){
            userExists = await this.userInstance.getUser({username: credential})
        }
        if(!userExists) return res.status(400).json({status: false, message: "Either email or username does not exist"})

        const checkPassword = await bcrypt.compare(password, userExists.password);
        if(!checkPassword) return res.status(400).json({status: false, message: "Incorrect password"});

        const payload = {uuid: userExists._id, username: userExists.username, email: userExists.email}
        const token = jwt.sign(
            payload, defaults.jwt_secret(), {expiresIn: defaults.jwt_expires()}
        );

        return res.status(200).json({status: true, message: "login successfull", data: {
            ...payload, token, 
        }})
    })


}

export default new LoginController()