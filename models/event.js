const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  members: [
    {
      _id: { type: Number, required: true },
      name: { type: String, required: true },
    },
  ],
});

const MatchSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  matchType: String,
  participants: [ParticipantSchema],
});

const EventSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    Name: { type: String, required: true },
    date: String,
    promotion: [Number],
    location: String,
    venue: String,
    broadcastDate: String,
    card: [MatchSchema],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Event", EventSchema);
