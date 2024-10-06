const mongoose = require("mongoose");

const WrestlerSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    Name: { type: String, required: true },
    RingNames: [String],
    Gender: String,
    Pronouns: String,
    BirthPlace: String,
    BirthDate: String,
    Height: Number,
    Weight: Number,
    Debut: String,
    Retirement: String,
    DeathDate: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Wrestler", WrestlerSchema);
