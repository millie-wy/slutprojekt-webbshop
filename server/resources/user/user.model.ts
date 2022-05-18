import bcrypt from "bcrypt";
import mongoose from "mongoose";

export interface User {
  firstname: string;
  lastname: string;
  /* Virtual */ fullname: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false }, // to not include password unless on request
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
  // whether the the virtual values will also be saved in db
);

userSchema.virtual("fullname").get(function (this: User) {
  return this.firstname + " " + this.lastname;
});

userSchema.pre("save", encryptPassword);
userSchema.pre("updateOne", encryptPassword);

async function encryptPassword(this: User, next: Function) {
  this.password = await bcrypt.hash(this.password, 10); // not tested
  next();
}

export const UserModel = mongoose.model<User>("user", userSchema);
