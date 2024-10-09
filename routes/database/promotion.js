const express = require("express");
const Promotion = require("../../models/promotion");
const { getNextSequenceValue } = require("../../utils/dbUtils");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const promotionData = req.body;
    if (!promotionData._id || (await Promotion.findById(promotionData._id))) {
      promotionData._id = await getNextSequenceValue("promotionid");
    }
    const promotion = new Promotion(promotionData);
    await promotion.save();
    res.status(201).json(promotion);
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
            { Names: { $elemMatch: { Name: new RegExp(search, "i") } } },
            { Abbreviation: new RegExp(search, "i") },
            { Abbreviations: new RegExp(search, "i") },
          ],
        }
      : {};

    const promotions = await Promotion.find(query)
      .sort({ _id: 1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const totalCount = await Promotion.countDocuments(query);

    res.json({
      promotions,
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
    const promotion = await Promotion.findById(id);
    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const promotion = await Promotion.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const promotion = await Promotion.findByIdAndDelete(id);
    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }
    res.status(200).json({ message: "Promotion deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
