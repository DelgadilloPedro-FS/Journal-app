const mongoose = require("mongoose");

const validateEmail = (email)=>{
    return ('/^\S+@\S+\.\S+$').test(email)
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: "Email address is required",
    validate: [validateEmail, "Email Invalid"],
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});


module.exports = mongoose.model('User',userSchema)