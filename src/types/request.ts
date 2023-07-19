import { Request } from "express"
import { IUser } from "../database/schema/user.schema"

export interface IGetUserAuthInfoRequest extends Request {
  user?: IUser 
} 