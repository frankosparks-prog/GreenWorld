const express = require('express');
const Medicine = require('../models/Medicine')

const router = express.Router();

// GET all medicines
router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single medicine
router.get("/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Not found" });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new medicine
router.post("/", async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    const saved = await newMedicine.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update medicine
router.put("/:id", async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE medicine
router.delete("/:id", async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Medicine deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
