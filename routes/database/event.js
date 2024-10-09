const express = require("express");
const Event = require("../../models/event");
const { getNextSequenceValue } = require("../../utils/dbUtils");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const eventData = req.body;
    if (!eventData._id || (await Event.findById(eventData._id))) {
      eventData._id = await getNextSequenceValue(eventData._id, "eventid", Event);
    }
    const event = new Event(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 100, search = "" } = req.query;

    const query = search
      ? {
          $or: [{ Name: new RegExp(search, "i") }],
        }
      : {};

    const events = await Event.find(query)
      .sort({ _id: 1 })
      .limit(Number(limit))
      .skip((page - 1) * limit)
      .populate({
        path: "card.participants.members",
        model: "Wrestler",
      })
      .populate({ path: "promotion", model: "Promotion" });

    const totalCount = await Event.countDocuments(query);

    res.json({
      events,
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
    const event = await Event.findById(id)
      .populate({
        path: "card.participants.members",
        model: "Wrestler",
      })
      .populate({ path: "promotion", model: "Promotion" });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const event = await Event.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
