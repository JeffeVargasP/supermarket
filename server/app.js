require("dotenv-safe").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const statusRoute = require("./routes/statusRoute");
const app = express();

app.use(morgan("dev"));

app.use(helmet());
app.use(express.json());

app.use((req, res, nxt) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  nxt();
});

app.use("/status", statusRoute);

app.use((req, res, nxt) => {
  const error = new Error("Not found");
  error.status = 404;
  nxt(error);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
