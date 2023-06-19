const express = require("express");
require("dotenv").config();
require("./middleware/passport");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const userRoutes = require("./routes/user.routes");
const transactionRoutes = require("./routes/transaction.routes");
const googleAuthRoutes = require("./routes/googleAuth.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
// app.use(passport.session());

app.use("/auth", googleAuthRoutes);
app.use("/user", userRoutes);
app.use("/transaction", transactionRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  console.log(message, error.statusCode, "message");
  res.status(status).send({ message: message, status: error.statusCode });
});

app.listen(process.env.PORT, () =>
  console.log("Server is listening at port " + process.env.PORT)
);

// sequelize
//   .sync()
//   .then((result) => {
//     app.listen(process.env.PORT, () =>
//       console.log("Server is listening at port " + process.env.PORT)
//     );
//   })
//   .catch((err) => console.log(err));
