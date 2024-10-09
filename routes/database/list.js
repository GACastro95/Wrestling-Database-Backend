const express = require("express");
const User = require("../../models/user");
const { getNextSequenceValue } = require("../../utils/dbUtils");

const router = express.Router();

router.post("/:userId/lists", async (req, res) => {
  try {
    const { userId } = req.params;
    const listData = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!listData._id || user.lists.id(listData._id)) {
      listData._id = await getNextSequenceValue("listid");
    }

    user.lists.push(listData);
    await user.save();
    res.status(201).json(listData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:userId/lists", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId/lists/:listId", async (req, res) => {
  try {
    const { userId, listId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const list = user.lists.id(listId);
    if (!list) {
      return res.status(404).json({ error: "List entry not found" });
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:userId/lists/:listId", async (req, res) => {
  try {
    const { userId, listId } = req.params;
    const updatedData = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const list = user.lists.id(listId);
    if (!list) {
      return res.status(404).json({ error: "List entry not found" });
    }

    list.set(updatedData);
    await user.save();

    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:userId/lists/:listId", async (req, res) => {
  try {
    const { userId, listId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const list = user.lists.id(listId);
    if (!list) {
      return res.status(404).json({ error: "List entry not found" });
    }

    list.remove();
    await user.save();

    res.status(200).json({ message: "List entry deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
