const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const validateEmail = (email) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  };
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

userSchema.pre("save", async function(next) { 
    const user = this; 
  
    if (user.isNew || user.isModified("password")) {
      try {
        const salt =  bcrypt.genSalt(10);
        const hash =  bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
      } catch (error) {
        return next(error);
      }
    } else {
      next();
    }
  });

userSchema.methods.comparePassword = function(candidatePassword,callback){
    bcrypt.compare(candidatePassword,this.password, function(error,isMatch){
        if(error){return callback}
        callback(null, isMatch)
    })
}

module.exports = mongoose.model("User", userSchema);
