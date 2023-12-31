const express = require("express");
const app = express();
const ExpressError = require("./expressError");

app.use(express.json());

const bookRoutes = require("./routes/books");

app.use("/books", bookRoutes);// name of our routes so "/" would be "/books"

app.use(function (req, res, next) {
  const err = new ExpressError("Not found!", 404);
  return next(err);
});

app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

module.exports = app;
