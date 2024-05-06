const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

const user = require("../models/user");
const congif = require("../config");

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
};

const JwtStrategy = new JwtStrategy(jwtOptions, function (payload, done) {
  user.findById(payload.sub, function (error, user) {
    if (error) {
      return done(error, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(JwtStrategy);