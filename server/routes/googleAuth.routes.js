const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/login/success", (req, res, next) => {
  try {
    if (req?.user === null) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const id = req?.user?.id;
    const email = req?.user?.email;
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
      loggedUser: req?.user,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

router.get("/login/failed", (req, res) => console.log("google login failed"));

router.get("/google", (req, res) =>
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/auth/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  });
  req.user = null;
  res.status(200).json({ message: "logout successfull", status: 200 });
});

module.exports = router;
