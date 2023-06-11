const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/signup", userController.handleSignUp);
router.post("/signin", userController.handleSignIn);

module.exports = router;
