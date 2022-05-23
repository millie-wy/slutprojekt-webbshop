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

// combines user and a xxx?
// export type UserDocument = User & Document;

const userSchema = new mongoose.Schema<User>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // to not include password unless on request
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strict: "throw",
  }
  // whether the the virtual values will also be saved in db
);

userSchema.virtual("fullname").get(function (this: User) {
  return this.firstname + " " + this.lastname;
});

userSchema.pre("save", encryptPassword);

export async function encryptPassword(this: User, next: Function) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
}

export const UserModel = mongoose.model("user", userSchema);
