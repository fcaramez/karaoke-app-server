import { model, Schema } from "mongoose";

interface User {
  username: object;
  type: any;
  password: string | object;
}

const userSchema: Schema = new Schema<User>({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username already taken"],
  },
  type: {
    type: String,
    enum: ["Admin", "Regular"],
    default: "Regular",
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<User>("User", userSchema);

module.exports = User;
