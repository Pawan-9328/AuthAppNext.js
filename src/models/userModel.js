import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

   username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true
   },
   email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true
   },
   password: {
      type: String,
      required: [true, "Please provide a password"],

   },
   isVerified: {
      type: Boolean,
      default: false,
      
   },
   isAdmin: {
      type: Boolean,
      default: false,
   },
   forgotPasswordToken: String,
   forgotPasswordTokenExpiry: Date,
   verifyToken: String,
   verifyTokenExpiry: Date

})

// is good but in next.js is not good
//const User = mongoose.model("user", userSchema);
// so update it 
const User = mongoose.model.users ||  mongoose.model("users", userSchema);

export default User;