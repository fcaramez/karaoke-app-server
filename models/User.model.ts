import { model, Schema } from "mongoose";

interface User {
  username: object;
  password: string | object;
}

const userSchema: Schema = new Schema<User>({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username already taken"],
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<User>("User", userSchema);

module.exports = User;
