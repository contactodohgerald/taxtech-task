import mongoose, { Document, Schema } from "mongoose";

interface ITodo extends Document {
    name: string
    due_date: Date
    priority: string
    remindesr: string
    description: string
    attachements: string
}

const TodoSchema = new Schema (
    {
        userId: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        due_date: {
            type: Date,
            required: true,
            trim: true,
        },
        priority: {
            type: String,
            required: true,
            trim: true
        },
        reminder: {
            type: String,
            trim: true,
            default: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        attachements: {
            type: String,
            trim: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default mongoose.model<ITodo>('Todos', TodoSchema)