import Users from "../../database/schema/user.schema";

export class UserService {

    async saveUser (data: any) {
        return await Users.create(data)
    }

    async getUser (data: any) {
        return await Users.findOne(data)
    }
} 