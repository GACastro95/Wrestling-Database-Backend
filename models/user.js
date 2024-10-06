const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  eventId: { type: Number, required: true },
  matchId: { type: Number, required: true },
  rating: { type: Number, required: true },
  review: { type: String },
});

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String },
    pronouns: { type: String },
    birthDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    reviews: [ReviewSchema],
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
