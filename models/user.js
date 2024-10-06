const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  eventId: { type: Number, required: true },
  matchId: { type: Number },
  rating: { type: Number },
  review: { type: String },
  liked: { type: Boolean },
  watched: { type: Boolean },
});

const ListItemSchema = new mongoose.Schema({
  eventId: { type: Number, required: true },
  matchId: { type: Number },
  order: { type: Number },
});

const ListSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  items: [ListItemSchema],
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
    lists: [ListSchema],
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
