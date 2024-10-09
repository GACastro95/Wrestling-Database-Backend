const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  matchType: String,
  participants: [{ type: Number, ref: "Wrestler" }],
});

const EventSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    name: { type: String, required: true },
    date: String,
    promotion: [{ type: Number, ref: "Promotion" }],
    location: String,
    venue: String,
    broadcastDate: String,
    card: [MatchSchema],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Event", EventSchema);
