require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

//db connection
require("./models/database").connectDatabase();

//logger
const logger = require("morgan");
app.use(logger("tiny"));

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/", require("./routes/indexRoute"));

//error handler
const ErorrHandler = require("./utils/ErrorHandler");
const { genetatedErrors } = require("./middlewares/errors");
app.all("*", (req, res, next) => {
  next(new ErorrHandler(`Requested URL Not Found:${req.url}`, 404));
});
app.use(genetatedErrors);

//make server
app.listen(
  process.env.PORT,
  console.log(`server listening on${process.env.PORT}`)
);
