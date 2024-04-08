import { verify } from "crypto";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";


const userSchema = new mongoose.Schema({

   username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true
   },
   email: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true
   },
   password: {
      type: String,
      required: [true, "Please provide a username"],

   },
   isVerified: {
      type: Boolean,
      default: false,
      unique: true
   },
   isAdmin: {
      type: Boolean,
      default: false,
   },
   forgotPasswordToken: String,
   forgotPasswordTokenExpiry: Data,
   verifyToken: String,
   verifyTokenExpiry: Date

})

// is good but in next.js is not good
//const User = mongoose.model("user", userSchema);
// so update it 
const User = mongoose.model.users ||  mongoose.model("users", userSchema);

export default User;