const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

// Config
const app = express();
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

// built-in middleware for json
app.use(express.json());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/employees", require("./routes/api/employees"));

app.use("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 404;
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
