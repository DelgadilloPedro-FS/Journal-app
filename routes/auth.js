const express = require("express");
const authCltr = require("../controllers/authentication_controller");
const router = express.Router();

// GET ALL
router.post("/",authCltr.signup)


module.exports = router;
