import todoSchema from "../../database/schema/todo.schema";

export class TodoService {

    async saveTodo (data: any) {
        return await todoSchema.create(data)
    }

    async getTodo (id: any) {
        return await todoSchema.findOne(id)
    }

    async getTasks (condition: any) {
        return await todoSchema.where(condition).find()
    }    
    
    async updateTask (id: any, data: any) {
        return await todoSchema.findByIdAndUpdate(id, data, { new: true })
    }   
    
    async deleteTask (id: any) {
        return await todoSchema.findByIdAndDelete(id)
    }
} 