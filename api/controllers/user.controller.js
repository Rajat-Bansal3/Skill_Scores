const User = require("../modals/user.model");
const Event = require("../modals/event.model");
const { errorHandler, responseHandler } = require("../utility/err");
const { default: mongoose } = require("mongoose");

exports.getUserInfo = async (req, res, next) => {
  const userId = req.user;
  if (!userId)
    return next(
      errorHandler(
        404,
        "UserId is required , signin user first to start session"
      )
    );
  try {
    const user = await User.findById(userId);
    if (!user) return next(errorHandler(404, "user not found"));
    return responseHandler(res, 200, user, "user fetched successfully");
  } catch (error) {
    next(error);
  }
};
exports.joinEvent = async (req, res, next) => {
  const userId = req.user;
  const { eventId } = req.query;

  if (!userId) {
    return next(errorHandler(400, "UserId is required. Please sign in first."));
  }

  if (!eventId) {
    return next(
      errorHandler(400, "eventId is required. Pass it as a query parameter.")
    );
  }

  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(eventId)) {
    return next(errorHandler(400, "Invalid userId or eventId format."));
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [user, event] = await Promise.all([
      User.findById(userId).session(session),
      Event.findById(eventId).session(session),
    ]);

    if (!user) {
      await session.abortTransaction();
      return next(errorHandler(404, "User not found"));
    }
    if (!event) {
      await session.abortTransaction();
      return next(errorHandler(404, "Event not found"));
    }

    if (event.status === "ended" || event.status === "live") {
      await session.abortTransaction();
      return next(
        errorHandler(400, "The event has already ended or already began")
      );
    }

    const currentTime = new Date();
    const participationEndTime = new Date(
      event.startTime.getTime() + event.participationDuration * 60000
    );

    if (currentTime > participationEndTime) {
      await session.abortTransaction();
      return next(
        errorHandler(
          400,
          "Participation time has expired. You cannot join the event now."
        )
      );
    }

    if (event.participants.includes(userId)) {
      await session.abortTransaction();
      return next(
        errorHandler(400, "User is already a participant in the event.")
      );
    }

    event.participants.push(userId);
    await event.save({ session });

    user.tournament = event._id;
    user.tournamentsPlayed += 1;
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    return responseHandler(res, 201, event, "Successfully joined the event.");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
