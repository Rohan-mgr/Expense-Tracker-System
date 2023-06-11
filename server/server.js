const express = require("express");
require("dotenv").config();
const sequelize = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  console.log(message, error.statusCode, "message");
  res.status(status).send({ message: message, status: error.statusCode });
});

sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT, () =>
      console.log("Server is listening at port " + process.env.PORT)
    );
  })
  .catch((err) => console.log(err));
