import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string
    username: string
    email: string
    password: string
}

const UserSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            type: String,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default mongoose.model<IUser>('Users', UserSchema)