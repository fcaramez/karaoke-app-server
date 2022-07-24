import { model, Schema } from "mongoose";

interface User {
  username: object;
  password: object;
}

const userSchema: Schema = new Schema<User>({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username already taken"],
  },
  password: {
    type: String,
    required: [true, "Please input a password"],
  },
});

const User = model<User>("User", userSchema);

export default User;
