const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/login/success", (req, res) => {
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
  console.log("into /auth/google/success");
  res.status(200).json({
    message: "Login Successfull",
    status: 200,
    token: token,
    loggedUser: req?.user,
  });
});

router.get("/login/failed", (req, res) => console.log("google login failed"));

router.get("/google", (req, res) =>
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
