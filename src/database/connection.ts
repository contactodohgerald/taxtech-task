import mongoose from "mongoose";
import dotevn from 'dotenv';

dotevn.config();

mongoose.set("strictQuery", false);

export const connection = () => {
  try {
    mongoose.connect(
      process.env.MONGO_URI??''
    );
    return true;
  } catch (error) {
    return false;
  }
};