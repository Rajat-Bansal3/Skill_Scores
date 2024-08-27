const { Router } = require("express");
const { auth } = require("../controllers/auth.controller");
const { AuthMiddleware } = require("../middlewares/auth.middleware.js");

const router = Router();

router.get("/auth", auth);

module.exports = router;
