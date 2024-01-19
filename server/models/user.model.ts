import mongoose from "mongoose";
import IUser from "./types/user";

const UserSchema = new mongoose.Schema<IUser>({
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  hashPassword: {
    type: String,
    required: true
  },
  items: {
    type: [Number],
    default: []
  },
  token: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

export default mongoose.model<IUser>('User', UserSchema)
