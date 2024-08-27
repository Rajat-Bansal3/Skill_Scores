const Event = require("../modals/event.model");
const { responseHandler, errorHandler } = require("../utility/err");
const { Types } = require("mongoose");

exports.getEvents = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const events = await Event.find({
      $expr: { $lt: [{ $size: "$participants" }, "$maxMembers"] },
    })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const totalEvents = await Event.countDocuments({
      $expr: { $lt: [{ $size: "$participants" }, "$maxMembers"] },
    });

    const totalPages = Math.ceil(totalEvents / limit);

    return responseHandler(
      res,
      200,
      {
        events,
        currentPage: parseInt(page),
        totalPages,
        totalEvents,
      },
      "Events fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

exports.getEvent = async (req, res, next) => {
  const { eventId } = req.query;

  if (!eventId || !Types.ObjectId.isValid(eventId)) {
    return next(errorHandler(400, "Invalid event ID format"));
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return next(errorHandler(404, "Event not found"));
    }

    return responseHandler(res, 200, event, "Event fetched successfully");
  } catch (error) {
    next(error);
  }
};
