const express = require("express");
const User = require("../models/user");
const { findAvailableId } = require("../utils/dbUtils");

const router = express.Router();

router.post("/:userId/reviews", async (req, res) => {
  try {
    const { userId } = req.params;
    const reviewData = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!reviewData._id || user.reviews.id(reviewData._id)) {
      reviewData._id = await findAvailableId(reviewData._id, "reviewid", User);
    }

    user.reviews.push(reviewData);
    await user.save();
    res.status(201).json(reviewData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:userId/reviews", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId/reviews/:reviewId", async (req, res) => {
  try {
    const { userId, reviewId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const review = user.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:userId/reviews/:reviewId", async (req, res) => {
  try {
    const { userId, reviewId } = req.params;
    const updatedData = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const review = user.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    review.set(updatedData);
    await user.save();

    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:userId/reviews/:reviewId", async (req, res) => {
  try {
    const { userId, reviewId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const review = user.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    review.remove();
    await user.save();

    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
