const mongoose = require("mongoose");
const PromotionSchema = require("./models/promotion");
const WrestlerSchema = require("./models/wrestler");

const MatchSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  matchType: String,
  participants: [WrestlerSchema],
});

const EventSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    Name: { type: String, required: true },
    date: String,
    promotion: [PromotionSchema],
    location: String,
    venue: String,
    broadcastDate: String,
    card: [MatchSchema],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Event", EventSchema);
