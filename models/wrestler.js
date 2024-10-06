const mongoose = require("mongoose");

const WrestlerSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    name: { type: String, required: true },
    ringNames: [String],
    gender: String,
    pronouns: String,
    birthPlace: String,
    birthDate: String,
    height: Number,
    weight: Number,
    debut: String,
    retirement: String,
    deathDate: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Wrestler", WrestlerSchema);
