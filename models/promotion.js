const mongoose = require("mongoose");

const NameSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Dates: String,
});

const PromotionSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    original_id: { type: Number, required: true },
    Name: { type: String, required: true },
    Abbreviation: { type: String, required: true },
    ActiveTime: String,
    Location: String,
    Names: [NameSchema],
    Abbreviations: [String],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Promotion", PromotionSchema);
