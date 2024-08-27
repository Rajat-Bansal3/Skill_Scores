const jwt = require("jsonwebtoken");
const User = require("../modals/user.model");
const { errorHandler } = require("../utility/err");
const SECRET_KEY = process.env.SECRET_KEY;

function AuthMiddleware(req, res, next) {
  const authorization = req.cookies.access_token;
  if (!authorization) {
    return res.status(401).json({
      message: "No Authorization Token Found",
    });
  }
  try {
    const decode = jwt.verify(authorization, SECRET_KEY);
    console.log(decode);
    req.user = decode.email;
    next();
  } catch (error) {
    res.status(401).json({ message: "invalid token" });
  }
}

function ChessMiddleware(req, res, next) {}

module.exports = { AuthMiddleware };
