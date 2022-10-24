import { Schema,model } from "mongoose";
import { IUser } from "../types";

const UserSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  completedLessons :[{type : Schema.Types.ObjectId, ref : 'lesson'}]
});

export const User = model<IUser>('user', UserSchema);