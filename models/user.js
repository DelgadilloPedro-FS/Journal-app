const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const validateEmail = (email) => {
  return "/^S+@S+.S+$".test(email);
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

userSchema.pre("save", (next) => {
  const user = this;

  if (user.isNew || user.isModified("password")) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, null, (error, hash) => {
        if (error) {
          return next(error);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = funcion

module.exports = mongoose.model("User", userSchema);
