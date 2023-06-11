const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.handleSignIn = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      const error = new Error("Email does not exists");
      error.statusCode = 404;
      throw error;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      const error = new Error("Incorrect Password! Try Again!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: email,
        userId: user.id.toString(),
      },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({
      message: "Login Successfull",
      status: 200,
      token: token,
      loggedUser: user,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.handleSignUp = async (req, res, next) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;
  const password = req.body.password;
  console.log(fName, lName, email, password);
  let dupUser;
  try {
    dupUser = await User.findOne({ where: { email: email } });
    if (dupUser) {
      const error = new Error("Email Address already exists!");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName: fName,
      lastName: lName,
      email: email,
      password: hashedPassword,
    });

    if (!user) {
      const error = new Error("Fail to create user");
      error.statusCode = 500;
      throw error;
    }
    res
      .status(200)
      .json({ message: "User created successfully", newUser: user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
