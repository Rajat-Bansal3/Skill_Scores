const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["rapid", "blitz", "bullet"],
      default: "blitz",
      required: true,
    },
    difficult: {
      type: String,
      enum: ["easy", "medium", "hard"],
      defualt: "easy",
      required: true,
    },
    maxMembers: {
      type: Number,
      default: 0,
    },
    minMembers: {
      type: Number,
      default: 0,
    },
    maxBounty: {
      type: Number,
      default: 0,
    },
    firstPrize: {
      type: Number,
      default: 0,
    },
    entryFee: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
      required: true,
    },
    participationDuration: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ["live", "upcoming", "ended"],
    },
    participants: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
eventSchema.index({ state: 1, startTime: 1 });
eventSchema.index({ startTime: 1, duration: 1 });
eventSchema.index({ maxBounty: 1, duration: 1 });

eventSchema.index({ startTime: 1 });
eventSchema.index({ duration: 1 });
eventSchema.index({ state: 1 });
eventSchema.index({ entryFee: 1 });
eventSchema.index({ maxMembers: 1 });
eventSchema.index({ maxBounty: 1 });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
