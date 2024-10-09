const express = require("express");
const Wrestler = require("../../models/wrestler");
const { getNextSequenceValue } = require("../../utils/dbUtils");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const wrestlerData = req.body;
    if (!wrestlerData._id || (await Wrestler.findById(wrestlerData._id))) {
      wrestlerData._id = await getNextSequenceValue("wrestlerid");
    }
    const wrestler = new Wrestler(wrestlerData);
    await wrestler.save();
    res.status(201).json(wrestler);
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
            { Name: new RegExp(search, "i") },
            { RingNames: new RegExp(search, "i") },
          ],
        }
      : {};

    const wrestlers = await Wrestler.find(query)
      .sort({ _id: 1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const totalCount = await Wrestler.countDocuments(query);

    res.json({
      wrestlers,
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
    const wrestler = await Wrestler.findById(id);
    if (!wrestler) {
      return res.status(404).json({ error: "Wrestler not found" });
    }
    res.status(200).json(wrestler);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const wrestler = await Wrestler.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!wrestler) {
      return res.status(404).json({ error: "Wrestler not found" });
    }
    res.status(200).json(wrestler);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const wrestler = await Wrestler.findByIdAndDelete(id);
    if (!wrestler) {
      return res.status(404).json({ error: "Wrestler not found" });
    }
    res.status(200).json({ message: "Wrestler deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
