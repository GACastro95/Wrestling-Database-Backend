const mongoose = require("mongoose");

const NameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dates: String,
});

const PromotionSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    activeTime: String,
    location: String,
    names: [NameSchema],
    abbreviations: [String],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Promotion", PromotionSchema);
