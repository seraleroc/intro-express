import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLenght: 2,
      maxLenght: 20,
      lowercase: true,
    },
    age: {
      type: Number,
      min: 10,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    role: {
      type: String,
      enum: ["professora", "aluno", "ta"],
      default: "aluno",
    },
    active: {
      type: Boolean,
      default: true,
    },
    date: { type: Date },
    address: {
      city: { type: String },
      state: { type: String },
    },
    tasks: [{ type: String }],
  },
  {
    timestamps: true,
  }
);
const UserModel = model("user", userSchema);

export default UserModel;
