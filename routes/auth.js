const express = require("express");
const authCltr = require("../controllers/authentication_controller");
const passport = require('passport')
const passportService = require("../services/passport");

const requireLogin = passport.authenticate("local", { session: false });
const router = express.Router();

// GET ALL
router.post("/",authCltr.signup)
router.post('/signup',requireLogin, authCltr.signin)


module.exports = router;
