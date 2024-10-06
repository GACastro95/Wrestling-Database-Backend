const express = require("express");
const User = require("../../models/user");
const { findAvailableId } = require("../../utils/dbUtils");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    if (!userData._id || (await User.findById(userData._id))) {
      userData._id = await findAvailableId(userData._id, "userid", User);
    }
    const user = new User(userData);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 100, search = "" } = req.query;

    const query = search
      ? {
          $or: [
            { username: new RegExp(search, "i") },
            { email: new RegExp(search, "i") },
          ],
        }
      : {};

    const users = await User.find(query)
      .sort({ _id: 1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const totalCount = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
