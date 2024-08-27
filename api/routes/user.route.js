const { Router } = require("express");
const { getUserInfo, joinEvent } = require("../controllers/user.controller.js");
const { AuthMiddleware } = require("../middlewares/auth.middleware.js");

const router = Router();

router.get("/get-user-info", AuthMiddleware, getUserInfo);
router.get("/join-event", AuthMiddleware, joinEvent);

module.exports = router;
