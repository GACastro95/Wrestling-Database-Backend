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
  match_type: String,
  participants: [ParticipantSchema],
});

const EventSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    original_id: { type: Number, required: true },
    Name: { type: String, required: true },
    Date: String,
    Promotion: [Number],
    Location: String,
    Venue: String,
    BroadcastDate: String,
    Card: [MatchSchema],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Event", EventSchema);
