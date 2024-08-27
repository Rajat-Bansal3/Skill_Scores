const { Router } = require("express");
const {
  getUserInfo,
  getUserStats,
  getUsergames,
} = require("../controllers/chess.controller.js");
const AuthMiddleware = require("../middlewares/auth.middleware.js");

const router = Router();

router.get("/userinfo", getUserInfo);
router.get("/userstats", getUserStats);
router.get("/usergames", getUsergames);

module.exports = router;
