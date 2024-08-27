const { Router } = require("express");
const { getEvents, getEvent } = require("../controllers/event.controller.js");

const router = Router();

router.get("/get-events", getEvents);
router.get("/get-event", getEvent);

module.exports = router;
