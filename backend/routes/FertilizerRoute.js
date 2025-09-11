const express = require('express');
const Fertilizer = require('../models/Fertilizer')

const router = express.Router();

// GET all fertilizers
router.get("/", async (req, res) => {
  try {
    const fertilizers = await Fertilizer.find();
    res.json(fertilizers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single fertilizer
router.get("/:id", async (req, res) => {
  try {
    const fertilizer = await Fertilizer.findById(req.params.id);
    if (!fertilizer) return res.status(404).json({ message: "Not found" });
    res.json(fertilizer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create fertilizer
router.post("/", async (req, res) => {
  try {
    const newFertilizer = new Fertilizer(req.body);
    const saved = await newFertilizer.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update fertilizer
router.put("/:id", async (req, res) => {
  try {
    const updated = await Fertilizer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE fertilizer
router.delete("/:id", async (req, res) => {
  try {
    await Fertilizer.findByIdAndDelete(req.params.id);
    res.json({ message: "Fertilizer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
