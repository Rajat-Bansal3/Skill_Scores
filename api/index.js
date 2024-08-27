const express = require("express");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const csrf = require("csurf");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

const authRouter = require("./routes/auth.route.js");
const chessRouter = require("./routes/chess.route.js");
const userRouter = require("./routes/user.route.js");
const eventRouter = require("./routes/event.route.js");
const { limiter } = require("./controllers/cache/limiter.js");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const csrfProtection = csrf({ cookie: true });
const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chess", limiter);
app.use("/api/v1/chess", chessRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/event", eventRouter);

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = err.message;
  res.status(statusCode).json({ success: false, message, statusCode });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(3000, () => {
  console.log("listning");
});
