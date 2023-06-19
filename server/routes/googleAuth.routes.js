const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/google", (req, res) => console.log("google auth login"));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const { id, emails } = req.user;
    const email = emails[0]?.value;
    const token = jwt.sign(
      {
        email: email,
        userId: id.toString(),
      },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      message: "Login Successfull",
      status: 200,
      token: token,
      loggedUser: req.user,
    });
  }
);

module.exports = router;
